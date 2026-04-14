"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession } from "@/components/session-context"
import {
  ClipboardListIcon,
  FileTextIcon,
  HomeIcon,
  LayoutListIcon,
  LogOutIcon,
  SearchIcon,
  UserIcon,
  Wallet,
} from "lucide-react"

export type AppNavId =
  | "home"
  | "consultation"
  | "opAssure"
  | "tpAssure"
  | "historique"
  | "logs"
  | "profile"

type AppShellProps = {
  active: AppNavId
  onNavigate: (id: AppNavId) => void
  onLogout: () => void
  canOpAssure: boolean
  canTpAssure: boolean
  canHistorique: boolean
  children: ReactNode
}

type NavFlags = {
  canOpAssure: boolean
  canTpAssure: boolean
  canHistorique: boolean
}

const navItems: {
  id: AppNavId
  label: string
  icon: typeof HomeIcon
  disabled?: (p: NavFlags) => boolean
}[] = [
  { id: "home", label: "Accueil", icon: HomeIcon },
  { id: "consultation", label: "Consultation décaissement", icon: SearchIcon },
  { id: "opAssure", label: "OP Assuré", icon: LayoutListIcon, disabled: (p) => !p.canOpAssure },
  { id: "tpAssure", label: "TP Assuré", icon: Wallet, disabled: (p) => !p.canTpAssure },
  { id: "historique", label: "Historique", icon: ClipboardListIcon, disabled: (p) => !p.canHistorique },
  { id: "logs", label: "Journaux", icon: FileTextIcon },
  { id: "profile", label: "Profil", icon: UserIcon },
]

export function AppShell({
  active,
  onNavigate,
  onLogout,
  canOpAssure,
  canTpAssure,
  canHistorique,
  children,
}: AppShellProps) {
  const { user } = useSession()
  const flags: NavFlags = { canOpAssure, canTpAssure, canHistorique }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-[oklch(0.22_0.04_250)] text-primary-foreground">
        <div className="p-4 border-b border-white/10">
          <p className="text-xs uppercase tracking-wide text-white/70">CNSS</p>
          <p className="font-semibold text-sm leading-tight">Consultation du décaissement</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(({ id, label, icon: Icon, disabled }) => {
            const isDisabled = disabled?.(flags) ?? false
            const isActive = active === id
            return (
              <button
                key={id}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onNavigate(id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:bg-white/10",
                  isDisabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          {user && (
            <p className="text-xs text-white/70 truncate mb-2" title={user.identifiant}>
              Connecté : <span className="text-white font-medium">{user.identifiant}</span>
            </p>
          )}
          <Button
            type="button"
            variant="secondary"
            className="w-full justify-start gap-2 bg-white/10 text-white border-0 hover:bg-white/20"
            onClick={onLogout}
          >
            <LogOutIcon className="size-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between border-b border-border px-4 py-3 bg-card">
          <span className="font-semibold text-primary">CNSS</span>
          {user && (
            <span className="text-xs text-muted-foreground truncate max-w-[50%]">{user.identifiant}</span>
          )}
        </header>
        <nav className="md:hidden flex gap-1 overflow-x-auto border-b border-border bg-muted/30 px-2 py-2">
          {navItems.map(({ id, label, disabled }) => {
            const isDisabled = disabled?.(flags) ?? false
            const isActive = active === id
            return (
              <button
                key={id}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onNavigate(id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                  isActive ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
                  isDisabled && "opacity-40",
                )}
              >
                {label.split(" ")[0]}
              </button>
            )
          })}
        </nav>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
