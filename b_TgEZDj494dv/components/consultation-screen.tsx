"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Combobox } from "@/components/ui/combobox"
import {
  NATURE_PRESTATIONS,
  defaultNaturePrestationCode,
  type NaturePrestationCode,
} from "@/lib/nature-prestation"
import { MODE_PAIEMENTS, type ModePaiementCode } from "@/lib/mode-paiement"
import { useSession } from "@/components/session-context"
import { useConsultationPrefs } from "@/components/consultation-prefs"
import {
  needsTypePrestationDetail,
  resolveTypePrestationForApi,
  TYPE_PRESTATION_OPTIONS,
} from "@/lib/type-prestation-detail"

interface ConsultationScreenProps {
  onAfficher: (criteria: {
    immatricule: string
    paymentKind: "ordre" | "titre"
    typePrestation: string
    natureCode: NaturePrestationCode
    naturePrestationLabel?: string
    typePrestationDetailLabel?: string
    modePaiement?: string
    dateEmission?: string
  }) => void
  onQuitter: () => void
}

const natureOptions = NATURE_PRESTATIONS.map((n) => ({
  value: n.code,
  label: n.label,
}))

const modePaiementOptions = MODE_PAIEMENTS.map((m) => ({
  value: m.code,
  label: m.label,
}))

function isoDateToDDMMYYYY(iso: string): string | undefined {
  const s = iso.trim()
  if (!s) return undefined
  const [yyyy, mm, dd] = s.split("-")
  if (!yyyy || !mm || !dd) return undefined
  return `${dd}${mm}${yyyy}`
}

export function ConsultationScreen({ onAfficher, onQuitter }: ConsultationScreenProps) {
  const { log } = useSession()
  const {
    natureCode,
    setNatureCode,
    typeDetailCode,
    setTypeDetailCode,
  } = useConsultationPrefs()
  const [typeSelection, setTypeSelection] = useState("ordre")
  const [assureField, setAssureField] = useState("")
  const [modePaiementCode, setModePaiementCode] = useState<ModePaiementCode>("V")
  const [dateEmissionIso, setDateEmissionIso] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const typeDetailOptions = useMemo(() => {
    const opts = TYPE_PRESTATION_OPTIONS[natureCode]
    if (!opts) return []
    return opts.map((o) => ({ value: o.value, label: o.label }))
  }, [natureCode])

  const handleAfficher = async () => {
    const nature = NATURE_PRESTATIONS.find((n) => n.code === natureCode)
    const mode = MODE_PAIEMENTS.find((m) => m.code === modePaiementCode)
    try {
      setSubmitting(true)
      setError(null)

      if (needsTypePrestationDetail(natureCode) && !typeDetailCode.trim()) {
        setError("Veuillez choisir le type de prestation (MO/SS ou PS).")
        return
      }

      const q = assureField.trim()
      if (!q) {
        setError("Veuillez saisir l’assuré (IMM, CIN, ou nom).")
        return
      }

      const res = await fetch(`/api/assure/resolve?q=${encodeURIComponent(q)}`)
      const data = (await res.json()) as
        | { immatricule: string; fullName: string; cin: string | null }
        | { error: string }

      if (!res.ok) {
        setError("error" in data ? data.error : "Recherche impossible.")
        return
      }

      if ("error" in data) {
        setError(data.error)
        return
      }

      const tpr = resolveTypePrestationForApi(natureCode, typeDetailCode)
      const detailLabel = TYPE_PRESTATION_OPTIONS[natureCode]?.find(
        (o) => o.value === typeDetailCode,
      )?.label

      log(
        "Recherche décaissement",
        `IMM ${data.immatricule} — ${typeSelection === "titre" ? "TP" : "OP"} — TPR ${tpr}${mode?.code ? ` — mode ${mode.code}` : ""}`,
      )
      onAfficher({
        immatricule: data.immatricule,
        paymentKind: typeSelection === "titre" ? "titre" : "ordre",
        typePrestation: tpr,
        natureCode,
        naturePrestationLabel: nature?.label,
        typePrestationDetailLabel: detailLabel,
        modePaiement: mode?.code,
        dateEmission: isoDateToDDMMYYYY(dateEmissionIso),
      })
    } catch {
      setError("Erreur réseau.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleAnnuler = () => {
    setAssureField("")
    setNatureCode(defaultNaturePrestationCode())
    setModePaiementCode("V")
    setDateEmissionIso("")
    setTypeSelection("ordre")
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-2xl font-bold text-primary">61</div>
          <div className="text-right">
            <div className="font-medium text-foreground">RABAT HASSAN</div>
            <div className="text-muted-foreground text-sm">04/02/2026</div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-[20px] shadow-lg p-6 md:p-8">
          <h1 className="text-xl font-bold text-foreground mb-6 text-center">
            Ecran de Consultation du décaissement{" "}
            <span className="text-muted-foreground text-sm font-normal">
              (Version : 06/2024)
            </span>
          </h1>

          {/* Critère de selection */}
          <div className="border border-border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Critère de selection
            </h2>

            <div className="space-y-6">
              {/* Type */}
              <div className="space-y-3">
                <Label className="font-medium text-foreground">Type</Label>
                <RadioGroup
                  value={typeSelection}
                  onValueChange={setTypeSelection}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="ordre" id="ordre" />
                    <Label htmlFor="ordre" className="cursor-pointer text-foreground">
                      Ordre de Paiement
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="titre" id="titre" />
                    <Label htmlFor="titre" className="cursor-pointer text-foreground">
                      Titre de Paiement
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Intéressé — Assuré uniquement */}
              <div className="space-y-3">
                <Label className="font-medium text-foreground">Intéressé</Label>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-foreground font-medium">Assuré</span>
                  <Input
                    value={assureField}
                    onChange={(e) => setAssureField(e.target.value)}
                    className="w-full max-w-sm h-10 rounded-lg border-border"
                    placeholder=""
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              {/* Nature Prestation */}
              <div className="space-y-2">
                <Label htmlFor="nature-prestation" className="font-medium text-foreground">
                  Nature Prestation
                </Label>
                <Combobox
                  id="nature-prestation"
                  options={natureOptions}
                  value={natureCode}
                  onValueChange={(v) => setNatureCode(v as NaturePrestationCode)}
                  placeholder="Choisir la nature de prestation"
                  searchPlaceholder="Rechercher (code ou libellé)…"
                />
              </div>

              {needsTypePrestationDetail(natureCode) && (
                <div className="space-y-2">
                  <Label htmlFor="type-prestation-detail" className="font-medium text-foreground">
                    Type de prestation
                  </Label>
                  <Combobox
                    id="type-prestation-detail"
                    options={typeDetailOptions}
                    value={typeDetailCode}
                    onValueChange={setTypeDetailCode}
                    placeholder="Choisir le type de prestation"
                    searchPlaceholder="Rechercher…"
                  />
                </div>
              )}

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium text-foreground">
                    Mode paiement :
                  </Label>
                  <Combobox
                    id="mode-paiement"
                    options={modePaiementOptions}
                    value={modePaiementCode}
                    onValueChange={(v) => setModePaiementCode(v as ModePaiementCode)}
                    placeholder="Choisir le mode de paiement"
                    searchPlaceholder="Rechercher (code ou libellé)…"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium text-foreground">
                    {"Date d'émission :"}
                  </Label>
                  <Input
                    type="date"
                    value={dateEmissionIso}
                    onChange={(e) => setDateEmissionIso(e.target.value)}
                    className="h-10 rounded-lg border-border"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleAfficher}
              disabled={submitting}
              className="h-12 px-8 rounded-[40px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              {submitting ? "Recherche..." : "Afficher"}
            </Button>
            <Button
              onClick={handleAnnuler}
              variant="secondary"
              className="h-12 px-8 rounded-[40px] bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium"
            >
              Annuler
            </Button>
            <Button
              onClick={onQuitter}
              variant="secondary"
              className="h-12 px-8 rounded-[40px] bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium"
            >
              Quitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
