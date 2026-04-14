"use client"

import { useMemo } from "react"
import { useSession } from "@/components/session-context"
import { useConsultationPrefs } from "@/components/consultation-prefs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Combobox } from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"
import {
  NATURE_PRESTATIONS,
  type NaturePrestationCode,
} from "@/lib/nature-prestation"
import {
  needsTypePrestationDetail,
  TYPE_PRESTATION_OPTIONS,
} from "@/lib/type-prestation-detail"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { SearchIcon } from "lucide-react"

type HomeDashboardProps = {
  onGoConsultation: () => void
}

const natureOptions = NATURE_PRESTATIONS.map((n) => ({
  value: n.code,
  label: n.label,
}))

export function HomeDashboard({ onGoConsultation }: HomeDashboardProps) {
  const { user } = useSession()
  const { natureCode, setNatureCode, typeDetailCode, setTypeDetailCode } =
    useConsultationPrefs()

  const typeDetailOptions = useMemo(() => {
    const opts = TYPE_PRESTATION_OPTIONS[natureCode]
    if (!opts) return []
    return opts.map((o) => ({ value: o.value, label: o.label }))
  }, [natureCode])

  if (!user) return null

  const connected = (() => {
    try {
      return format(new Date(user.connectedAt), "dd/MM/yyyy HH:mm", { locale: fr })
    } catch {
      return user.connectedAt
    }
  })()

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Accueil</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Informations de session et accès rapide.
        </p>
      </div>

      <Card className="rounded-[20px] shadow-lg border-border">
        <CardHeader>
          <CardTitle>Utilisateur connecté</CardTitle>
          <CardDescription>Données issues de la connexion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-border pb-3">
            <span className="text-muted-foreground">Identifiant</span>
            <span className="font-semibold text-foreground">{user.identifiant}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-muted-foreground">Connexion</span>
            <span className="font-medium text-foreground">{connected}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[20px] shadow-lg border-border">
        <CardHeader>
          <CardTitle>Préférences de prestation</CardTitle>
          <CardDescription>
            Ces choix sont repris sur l&apos;écran de consultation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="home-nature" className="font-medium text-foreground">
              Nature de prestation
            </Label>
            <Combobox
              id="home-nature"
              options={natureOptions}
              value={natureCode}
              onValueChange={(v) => setNatureCode(v as NaturePrestationCode)}
              placeholder="Choisir la nature"
              searchPlaceholder="Rechercher…"
            />
          </div>
          {needsTypePrestationDetail(natureCode) && (
            <div className="space-y-2">
              <Label htmlFor="home-type-prestation" className="font-medium text-foreground">
                Type de prestation
              </Label>
              <Combobox
                id="home-type-prestation"
                options={typeDetailOptions}
                value={typeDetailCode}
                onValueChange={setTypeDetailCode}
                placeholder="Choisir le type de prestation"
                searchPlaceholder="Rechercher…"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        type="button"
        onClick={onGoConsultation}
        className="h-12 rounded-[40px] gap-2"
      >
        <SearchIcon className="size-4" />
        Aller à la consultation décaissement
      </Button>
    </div>
  )
}
