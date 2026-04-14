"use client"

import { Button } from "@/components/ui/button"
import type { PaymentOrder } from "@/lib/mock-data"

interface DetailsScreenProps {
  order: PaymentOrder
  onRetour: () => void
}

export function DetailsScreen({ order, onRetour }: DetailsScreenProps) {
  const detailFields = [
    { label: "Numéro immatricule", value: `${order.numeroAffilie} (${order.beneficiaire})` },
    { label: "Numéro affilié", value: order.numeroAffilie },
    { label: "Type evenement", value: "Ordres de paiement - AMO" },
    { label: "Type Prestation", value: "Assurance Maladie Obligatoire" },
    { label: "Mode paiement", value: "Virement assuré" },
    { label: "Ref. Structure", value: order.refStructure },
    { label: "Date emission", value: order.dateEmission },
    { label: "Periode emis", value: order.periodeEmission },
    { label: "Beneficiaire", value: order.beneficiaire },
    { label: "Etat", value: order.etat },
    { label: "Montant", value: `${order.montant.toFixed(2)} MAD` },
    { label: "Code pays", value: "MA" },
    { label: "Compte bancaire", value: "---" },
    { label: "Date Situation", value: order.dateEmission },
  ]

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-card rounded-[20px] shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
            Détails Assuré
          </h1>

          {/* Details Grid */}
          <div className="space-y-4">
            {detailFields.map((field, index) => (
              <div
                key={index}
                className={`
                  flex flex-col md:flex-row md:items-center gap-2 p-4 rounded-xl
                  ${index % 2 === 0 ? "bg-muted/30" : "bg-background"}
                `}
              >
                <span className="font-medium text-muted-foreground md:w-48 shrink-0">
                  {field.label} :
                </span>
                <span className="font-semibold text-foreground">
                  {field.value}
                </span>
              </div>
            ))}
          </div>

          {/* Status Badge */}
          <div className="mt-6 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="font-medium text-muted-foreground">Statut actuel :</span>
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${order.etat === "Genere" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-amber-100 text-amber-800"
                }
              `}>
                {order.etat}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={onRetour}
              variant="secondary"
              className="h-12 px-8 rounded-[40px] bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium"
            >
              Retour
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
