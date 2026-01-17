import os
import stripe
import resend
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime, timezone

# Load environment variables from .env file
load_dotenv()

# Define a model for the incoming request body for checkout creation
class CheckoutRequest(BaseModel):
    priceId: str
    email: str
    cycle: str

app = FastAPI()

# --- CORS Middleware ---
# This allows the frontend (running on a different port) to communicate with this backend.
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173", # Common port for Vite React apps
    # Add the URL of your deployed frontend here if applicable
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- API Key Configuration ---
# It's crucial to load keys from environment variables for security
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
resend.api_key = os.getenv("RESEND_API_KEY")

# Check if keys are loaded
if not stripe.api_key:
    raise RuntimeError("STRIPE_SECRET_KEY not found in .env file")
if not STRIPE_WEBHOOK_SECRET:
    raise RuntimeError("STRIPE_WEBHOOK_SECRET not found in .env file")
if not resend.api_key:
    raise RuntimeError("RESEND_API_KEY not found in .env file")

# --- Placeholder Audit Log Function ---
def register_audit_log(user_id: str, project_id: str, action_description: str, tenant_id: str):
    """
    Placeholder function to register an audit log.
    In a real application, this would save the log to a database.
    It must include the tenant_id for multi-tenancy.
    """
    log_entry = {
      "user_id": user_id,
      "project_id": project_id,
      "action": action_description,
      "timestamp": datetime.now(timezone.utc).isoformat(),
      "tenant_id": tenant_id,
    }
    print(f"AUDIT LOG: {log_entry}")
    # In a real app: db.add(AuditLog(**log_entry))
    pass

# --- Email Sending Function ---
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
                <a href="http://localhost:3000/dashboard" 
                   style="display: inline-block; margin-top: 30px; background: #10b981; color: #0b0f1a; padding: 15px 25px; border-radius: 10px; font-weight: 900; text-decoration: none; text-transform: uppercase; font-size: 12px;">
                   ACESSAR DASHBOARD
                </a>
            </div>
            """
        })
        print(f"📧 E-mail de boas-vindas enviado para {email_usuario}")
    except Exception as e:
        print(f"❌ Erro ao enviar e-mail: {e}")
        # In a real app, you might want to log this to a monitoring service

# --- Stripe Webhook Endpoint ---
@app.post("/webhook")
async def handle_stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_email = session.get('customer_details', {}).get('email')
        
        if customer_email:
            # Here you would also get the tenant_id associated with the user/customer
            tenant_id = "kpmg_tenant_id_example" # Placeholder
            register_audit_log(
                user_id=customer_email, 
                project_id="N/A", 
                action_description=f"Assinatura do plano {session.get('display_items', [{}])[0].get('plan', {}).get('nickname', 'N/A')} iniciada.",
                tenant_id=tenant_id
            )
            print(f"💰 SUCESSO: Pagamento completo para {customer_email}. Liberando acesso.")
            send_welcome_email(customer_email)
        else:
            print("🚨 Alerta: checkout.session.completed recebido sem e-mail do cliente.")

    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        customer_id = subscription.get('customer')
        tenant_id = "kpmg_tenant_id_example" # Placeholder
        register_audit_log(
            user_id=customer_id, 
            project_id="N/A", 
            action_description="Assinatura cancelada.",
            tenant_id=tenant_id
        )
        print(f"🚫 Assinatura cancelada para o cliente {customer_id}.")

    else:
        print(f"🔔 Evento Stripe não tratado: {event['type']}")

    return {"status": "success"}

# --- Checkout Session Creation Endpoint ---
@app.post("/create-checkout-session")
async def create_checkout(checkout_request: CheckoutRequest):
    coupons = { "quarterly": "TRIMESTRAL10", "semiannual": "SEMESTRAL20", "yearly": "ANUAL30" }
    discounts = [{"coupon": coupons[checkout_request.cycle]}] if checkout_request.cycle in coupons else []
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card', 'pix'],
            line_items=[{'price': checkout_request.priceId, 'quantity': 1}],
            mode='subscription',
            discounts=discounts,
            success_url="http://localhost:3000/dashboard?success=true",
            cancel_url="http://localhost:3000/pricing",
            customer_email=checkout_request.email,
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stripe Error: {str(e)}")

# --- Audit Trail API Endpoint ---
@app.get("/api/audit-logs/{project_id}")
async def get_audit_logs(project_id: str, request: Request):
    # In a real app, you would get the tenant_id from the user's token
    # For now, we'll use a hardcoded value for demonstration
    tenant_id = "kpmg_tenant_id_example" 
    
    # This is where you would query your database:
    # logs = db.query(AuditLog).filter(
    #     AuditLog.tenant_id == tenant_id,
    #     AuditLog.project_id == project_id
    # ).all()
    
    # For now, return mock data
    mock_audit_logs = [
        { 'id': '1', 'user': { 'name': 'João Damas', 'avatarUrl': '/avatars/joao.png' }, 'action': f'Atualizou o GAP para +10pp no projeto {project_id}.', 'timestamp': '2026-07-12T14:30:00Z' },
        { 'id': '2', 'user': { 'name': 'Lucas Bonanza', 'avatarUrl': '/avatars/lucas.png' }, 'action': 'Moveu a atividade "Criar Endpoint" para a fase Testes.', 'timestamp': '2026-07-12T10:15:00Z' },
        { 'id': '3', 'user': { 'name': 'Pedro Henrique', 'avatarUrl': '/avatars/pedro.png' }, 'action': f'Adicionou o responsável Lucas Bonanza ao projeto {project_id}.', 'timestamp': '2026-07-11T18:00:00Z' },
        { 'id': '4', 'user': { 'name': 'João Damas', 'avatarUrl': '/avatars/joao.png' }, 'action': f'Criou o projeto "{project_id}".', 'timestamp': '2026-07-11T09:00:00Z' },
    ]
    
    # Simulate a check to ensure the user belongs to the correct tenant
    # This logic would be in a middleware in a real app
    print(f"Fetching logs for project {project_id} for tenant {tenant_id}")
    
    return mock_audit_logs

@app.get("/")
def read_root():
    return {"message": "Servidor AXON Projects API está online."}

# To run this app:
# 1. Install dependencies: pip install -r requirements.txt
# 2. Create a .env file with your Stripe and Resend keys
# 3. Run: uvicorn main:app --reload --port 8000
