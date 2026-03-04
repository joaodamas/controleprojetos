import { columns, type UserAccount } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Users, ShieldAlert, Settings2 } from "lucide-react"

export default function UserManagementPage() {
  // Dados mockados
  const data: UserAccount[] = [
    { id: "1", name: "Dague Martin", email: "daguemartin@gmail.com", role: "Usuario", status: "ativo" },
    { id: "2", name: "Hanna Kodama", email: "hanna.bb@gmail.com", role: "Usuario", status: "ativo" },
    { id: "3", name: "João Damas", email: "joaodamasit@gmail.com", role: "Administrador", status: "ativo" },
  ]

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <p className="text-slate-500 text-sm">Gerencie usuários, permissões e preferências do sistema.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <Plus className="h-4 w-4" /> Novo Usuário
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="profile" className="gap-2"><Settings2 className="h-4 w-4" /> Meu Perfil</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Users className="h-4 w-4" /> Usuários</TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2"><ShieldAlert className="h-4 w-4" /> Grupos de Acesso</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle>Usuários da Plataforma</CardTitle>
              <CardDescription className="text-slate-500">
                Visualize e gerencie todos os acessos internos da sua organização.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Outros conteúdos das abas aqui */}
      </Tabs>
    </div>
  )
}
