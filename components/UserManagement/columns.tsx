"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ShieldCheck, User, Mail, Trash2, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export type UserAccount = {
  id: string
  name: string
  email: string
  role: "Administrador" | "Usuario"
  status: "ativo" | "pendente"
}

export const columns: ColumnDef<UserAccount>[] = [
  {
    accessorKey: "name",
    header: "Usuário",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700">
          <User className="h-4 w-4 text-slate-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-slate-200">{row.original.name}</span>
          <span className="text-xs text-slate-500">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Perfil",
    cell: ({ row }) => {
      const isAdmin = row.getValue("role") === "Administrador"
      return (
        <Badge variant={isAdmin ? "default" : "secondary"} className="gap-1 font-normal">
          {isAdmin && <ShieldCheck className="h-3 w-3" />}
          {row.getValue("role")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${row.getValue("status") === "ativo" ? "bg-emerald-500" : "bg-amber-500"}`} />
        <span className="text-sm capitalize text-slate-400">{row.getValue("status")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-800">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-slate-950 border-slate-800 text-slate-200">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer focus:bg-slate-800">
              <User className="mr-2 h-4 w-4" /> Editar Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-slate-800">
              <Key className="mr-2 h-4 w-4" /> Resetar Senha
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-950/30 focus:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" /> Excluir Usuário
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
