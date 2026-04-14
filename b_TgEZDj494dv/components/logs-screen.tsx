"use client"

import { useSession } from "@/components/session-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function LogsScreen() {
  const { logs, clearLogs } = useSession()

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Journaux</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Historique des actions enregistré localement sur cet appareil.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={clearLogs} className="shrink-0">
          Effacer les journaux
        </Button>
      </div>

      <Card className="rounded-[20px] shadow-lg border-border overflow-hidden">
        <CardHeader>
          <CardTitle>Activité</CardTitle>
          <CardDescription>{logs.length} entrée(s)</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold">Date / heure</th>
                  <th className="text-left px-4 py-3 font-semibold">Action</th>
                  <th className="text-left px-4 py-3 font-semibold">Détail</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                      Aucun journal pour le moment.
                    </td>
                  </tr>
                ) : (
                  logs.map((row) => (
                    <tr key={row.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">
                        {format(new Date(row.at), "dd/MM/yyyy HH:mm:ss", { locale: fr })}
                      </td>
                      <td className="px-4 py-3 font-medium">{row.action}</td>
                      <td className="px-4 py-3 text-muted-foreground max-w-md truncate" title={row.detail}>
                        {row.detail ?? "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
