"use client"

import { useSession } from "@/components/session-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function ProfileScreen() {
  const { user, logs } = useSession()

  if (!user) return null

  const connected = (() => {
    try {
      return format(new Date(user.connectedAt), "dd/MM/yyyy HH:mm:ss", { locale: fr })
    } catch {
      return user.connectedAt
    }
  })()

  const lastConnexionLog = logs.find((l) => l.action === "Connexion")

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profil</h1>
        <p className="text-muted-foreground text-sm mt-1">Compte et traçabilité locale.</p>
      </div>

      <Card className="rounded-[20px] shadow-lg border-border">
        <CardHeader>
          <CardTitle>Profil utilisateur</CardTitle>
          <CardDescription>Informations de session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-border pb-3">
            <span className="text-muted-foreground">Identifiant</span>
            <span className="font-semibold text-foreground">{user.identifiant}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-border pb-3">
            <span className="text-muted-foreground">Début de session</span>
            <span className="font-medium text-foreground">{connected}</span>
          </div>
          {lastConnexionLog && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Dernière trace « Connexion »</span>
              <span className="font-mono text-xs text-foreground">
                {format(new Date(lastConnexionLog.at), "dd/MM/yyyy HH:mm:ss", { locale: fr })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
