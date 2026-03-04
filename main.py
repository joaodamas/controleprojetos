import os
import time
import re
from collections import defaultdict
from typing import Optional

import stripe
import resend
import firebase_admin
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel, field_validator
from datetime import datetime, timezone

from firebase_admin import credentials, auth, db

load_dotenv()

# ─── Pydantic models with validation ───

VALID_CYCLES = {"monthly", "quarterly", "semiannual", "yearly"}

class CheckoutRequest(BaseModel):
    priceId: str
    email: str
    cycle: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", v):
            raise ValueError("Email inválido.")
        if len(v) > 254:
            raise ValueError("Email excede tamanho máximo.")
        return v

    @field_validator("priceId")
    @classmethod
    def validate_price_id(cls, v: str) -> str:
        v = v.strip()
        if not v.startswith("price_"):
            raise ValueError("priceId deve começar com 'price_'.")
        if len(v) > 100:
            raise ValueError("priceId excede tamanho máximo.")
        return v

    @field_validator("cycle")
    @classmethod
    def validate_cycle(cls, v: str) -> str:
        v = v.strip().lower()
        if v not in VALID_CYCLES:
            raise ValueError(f"cycle deve ser um de: {', '.join(sorted(VALID_CYCLES))}")
        return v


# ─── Rate Limiter ───

class RateLimiter:
    """In-memory sliding window rate limiter."""
    def __init__(self, max_requests: int = 10, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._requests: dict[str, list[float]] = defaultdict(list)

    def is_allowed(self, key: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        self._requests[key] = [t for t in self._requests[key] if t > window_start]
        if len(self._requests[key]) >= self.max_requests:
            return False
        self._requests[key].append(now)
        return True

    def remaining(self, key: str) -> int:
        now = time.time()
        window_start = now - self.window_seconds
        self._requests[key] = [t for t in self._requests[key] if t > window_start]
        return max(0, self.max_requests - len(self._requests[key]))


checkout_limiter = RateLimiter(max_requests=5, window_seconds=60)
webhook_limiter = RateLimiter(max_requests=30, window_seconds=60)
general_limiter = RateLimiter(max_requests=60, window_seconds=60)


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ─── App setup ───

app = FastAPI(
    title="AXON Projects API",
    docs_url=None if os.getenv("ENVIRONMENT") == "production" else "/docs",
    redoc_url=None,
)

_cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost,http://localhost:3000,http://localhost:5173"
)
origins = [o.strip() for o in _cors_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization", "stripe-signature"],
)

# ─── Secrets from env ───

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
resend.api_key = os.getenv("RESEND_API_KEY")

if not stripe.api_key:
    raise RuntimeError("STRIPE_SECRET_KEY not found in .env file")
if not STRIPE_WEBHOOK_SECRET:
    raise RuntimeError("STRIPE_WEBHOOK_SECRET not found in .env file")
if not resend.api_key:
    raise RuntimeError("RESEND_API_KEY not found in .env file")

# ─── Firebase Admin SDK ───

try:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {
        "databaseURL": os.getenv("FIREBASE_DATABASE_URL")
    })
except Exception as e:
    raise RuntimeError(f"Falha ao inicializar o Firebase Admin SDK: {e}")

# ─── Audit Log ───

def register_audit_log(
    user_id: str,
    project_id: str,
    action_description: str,
    tenant_id: str,
):
    """Persist audit log to Firebase Realtime Database."""
    log_entry = {
        "user_id": user_id,
        "project_id": project_id,
        "action": action_description,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "tenant_id": tenant_id,
    }
    try:
        ref = db.reference(f"audit_logs/{tenant_id}")
        ref.push(log_entry)
    except Exception as e:
        print(f"AUDIT LOG WRITE ERROR: {e} | entry: {log_entry}")


# ─── Email ───

DASHBOARD_URL = os.getenv("DASHBOARD_URL", "http://localhost:3000/dashboard")

def send_welcome_email(email_usuario: str, nome_usuario: str = "Gestor"):
    try:
        resend.Emails.send({
            "from": "AXON Projects <onboarding@resend.dev>",
            "to": email_usuario,
            "subject": "SISTEMAS ATIVOS | AXON Projects",
            "html": f"""
            <div style="background-color: #0b0f1a; padding: 40px; font-family: sans-serif; color: white; border-radius: 24px;">
                <h1 style="color: #10b981; font-style: italic; font-weight: 900; font-size: 28px; letter-spacing: -1px;">
                    ACESSO LIBERADO.
                </h1>
                <p style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                    Olá, {nome_usuario}. Sua assinatura Business foi confirmada.
                </p>
                <hr style="border: 0; border-top: 1px solid #1e293b; margin: 30px 0;" />
                <div style="background: #0f172a; padding: 20px; border-radius: 16px;">
                    <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase;">Próximo passo:</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold;">Inicie seu primeiro projeto e visualize a Curva S agora.</p>
                </div>
                <a href="{DASHBOARD_URL}"
                   style="display: inline-block; margin-top: 30px; background: #10b981; color: #0b0f1a; padding: 15px 25px; border-radius: 10px; font-weight: 900; text-decoration: none; text-transform: uppercase; font-size: 12px;">
                   ACESSAR DASHBOARD
                </a>
            </div>
            """
        })
        print(f"E-mail de boas-vindas enviado para {email_usuario}")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {e}")


# ─── Stripe Webhook ───

@app.post("/webhook")
async def handle_stripe_webhook(request: Request):
    client_ip = get_client_ip(request)
    if not webhook_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests.")

    payload = await request.body()

    if len(payload) > 1_000_000:
        raise HTTPException(status_code=413, detail="Payload too large.")

    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        customer_email = session.get("customer_details", {}).get("email")

        if not customer_email:
            print("Alerta: checkout.session.completed sem e-mail do cliente.")
            return {"status": "success", "detail": "No email found"}

        try:
            try:
                user = auth.get_user_by_email(customer_email)
            except auth.UserNotFoundError:
                user = auth.create_user(email=customer_email, email_verified=True)

            tenant_id = user.uid

            tenant_ref = db.reference(f"tenants/{tenant_id}")
            tenant_ref.set({
                "info": {
                    "email": customer_email,
                    "createdAt": datetime.now(timezone.utc).isoformat(),
                    "plan": session.get("display_items", [{}])[0]
                        .get("plan", {}).get("nickname", "N/A")
                },
                "clients": {}
            })

            register_audit_log(
                user_id=customer_email,
                project_id="N/A",
                action_description=(
                    f"Assinatura do plano "
                    f"{session.get('display_items', [{}])[0].get('plan', {}).get('nickname', 'N/A')} iniciada."
                ),
                tenant_id=tenant_id,
            )
            send_welcome_email(customer_email)
        except Exception as e:
            print(f"Erro processando checkout: {e}")
            raise HTTPException(status_code=500, detail="Internal processing error.")

    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        customer_id = subscription.get("customer")
        tenant_id = "unknown_tenant"

        register_audit_log(
            user_id=customer_id,
            project_id="N/A",
            action_description="Assinatura cancelada.",
            tenant_id=tenant_id,
        )

    return {"status": "success"}


# ─── Checkout Session ───

@app.post("/create-checkout-session")
async def create_checkout(checkout_request: CheckoutRequest, request: Request):
    client_ip = get_client_ip(request)
    if not checkout_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Muitas requisições. Tente novamente em 1 minuto.")

    coupons = {
        "quarterly": "TRIMESTRAL10",
        "semiannual": "SEMESTRAL20",
        "yearly": "ANUAL30",
    }
    discounts = (
        [{"coupon": coupons[checkout_request.cycle]}]
        if checkout_request.cycle in coupons
        else []
    )

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card", "pix"],
            line_items=[{"price": checkout_request.priceId, "quantity": 1}],
            mode="subscription",
            discounts=discounts,
            success_url=os.getenv(
                "STRIPE_SUCCESS_URL",
                "http://localhost:3000/dashboard?session_id={CHECKOUT_SESSION_ID}"
            ),
            cancel_url=os.getenv(
                "STRIPE_CANCEL_URL",
                "http://localhost:3000/pricing"
            ),
            customer_email=checkout_request.email,
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stripe Error: {str(e)}")


# ─── Audit Trail (deprecated) ───

@app.get("/api/audit-logs/{project_id}")
async def get_audit_logs(project_id: str, request: Request):
    raise HTTPException(
        status_code=410,
        detail="Este endpoint foi desativado. Os logs de auditoria agora são lidos diretamente do banco de dados."
    )


# ─── Health check ───

@app.get("/")
def read_root():
    return {"message": "Servidor AXON Projects API está online."}
