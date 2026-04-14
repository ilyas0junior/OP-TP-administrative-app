"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import type { PaymentOrder } from "@/lib/api-types"

interface OpAssureScreenProps {
  variant?: "op" | "tp"
  onRetour: () => void
  onHistorique: () => void
  onDetail: (order: PaymentOrder) => void
  immatricule: string
  typePrestation?: string
  naturePrestationLabel?: string
  typePrestationDetailLabel?: string
  modePaiement?: string
  dateEmission?: string
}

export function OpAssureScreen({
  variant = "op",
  onRetour,
  onHistorique,
  onDetail,
  immatricule,
  typePrestation,
  naturePrestationLabel,
  typePrestationDetailLabel,
  modePaiement,
  dateEmission,
}: OpAssureScreenProps) {
  const listTitle = variant === "tp" ? "TP Assuré" : "OP Assuré"
  const rowTypeLabel = variant === "tp" ? "TP" : "OP"
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [orders, setOrders] = useState<PaymentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        setSelectedRow(null)

        const params = new URLSearchParams({ imm: immatricule })
        if (typePrestation) params.set("typePrestation", typePrestation)
        if (modePaiement) params.set("modePaiement", modePaiement)
        if (dateEmission) params.set("dateEmission", dateEmission)

        const res = await fetch(`/api/payment-orders?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `HTTP ${res.status}`)
        }
        const data: { orders: PaymentOrder[] } = await res.json()
        setOrders(data.orders)
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return
        setError(e instanceof Error ? e.message : "Erreur inconnue")
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => controller.abort()
  }, [immatricule, typePrestation, modePaiement, dateEmission])

  const totalMontant = useMemo(
    () => orders.reduce((sum, order) => sum + order.montant, 0),
    [orders],
  )

  const handleDetailClick = () => {
    if (selectedRow !== null) {
      const selectedOrder = orders.find((order) => order.id === selectedRow)
      if (selectedOrder) {
        onDetail(selectedOrder)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Info */}
        <div className="bg-card rounded-[20px] shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <span className="text-muted-foreground">Numero immatricule : </span>
              <span className="font-semibold text-foreground">{immatricule}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Nature prestation : </span>
              <span className="font-semibold text-foreground">
                {typePrestation
                  ? `${typePrestation} — ${naturePrestationLabel ?? ""}${
                      typePrestationDetailLabel ? ` — ${typePrestationDetailLabel}` : ""
                    }`
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-card rounded-[20px] shadow-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">{listTitle}</h2>
          
          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading && (
              <div className="py-6 text-sm text-muted-foreground">Chargement...</div>
            )}
            {!loading && error && (
              <div className="py-6 text-sm text-destructive">
                Erreur: {error}
              </div>
            )}
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-3 py-3 text-left font-semibold rounded-tl-lg">Type</th>
                  <th className="px-3 py-3 text-left font-semibold">{"Date d'émission"}</th>
                  <th className="px-3 py-3 text-left font-semibold">Source OP</th>
                  <th className="px-3 py-3 text-left font-semibold">Mode paie</th>
                  <th className="px-3 py-3 text-right font-semibold">Montant</th>
                  <th className="px-3 py-3 text-left font-semibold">Etat</th>
                  <th className="px-3 py-3 text-left font-semibold">{"Periode d'émission"}</th>
                  <th className="px-3 py-3 text-left font-semibold">Beneficiaire</th>
                  <th className="px-3 py-3 text-left font-semibold">Ref. Structure</th>
                  <th className="px-3 py-3 text-left font-semibold rounded-tr-lg">Numéro Affilie</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  !error &&
                  orders.map((order, index) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedRow(order.id)}
                    className={`
                      cursor-pointer border-b border-border transition-colors
                      ${selectedRow === order.id 
                        ? "bg-primary/10" 
                        : index % 2 === 0 
                          ? "bg-background" 
                          : "bg-muted/30"
                      }
                      hover:bg-primary/5
                    `}
                  >
                    <td className="px-3 py-3 text-foreground">{rowTypeLabel}</td>
                    <td className="px-3 py-3 text-foreground">{order.dateEmission}</td>
                    <td className="px-3 py-3 text-foreground">{order.sourceOP}</td>
                    <td className="px-3 py-3 text-foreground">{order.modePaie}</td>
                    <td className="px-3 py-3 text-right text-foreground">{order.montant.toFixed(2)}</td>
                    <td className="px-3 py-3 text-foreground">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${order.etat === "Genere" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"
                        }
                      `}>
                        {order.etat}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-foreground">{order.periodeEmission}</td>
                    <td className="px-3 py-3 text-foreground">{order.beneficiaire}</td>
                    <td className="px-3 py-3 text-foreground">{order.refStructure}</td>
                    <td className="px-3 py-3 text-foreground">{order.numeroAffilie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-border">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div>
                <span className="text-muted-foreground">Montant Total : </span>
                <span className="font-bold text-foreground">{totalMontant.toFixed(2)} MAD</span>
              </div>
              <div>
                <span className="text-muted-foreground">Nombre Total de ligne : </span>
                <span className="font-bold text-foreground">{orders.length}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button
              onClick={onHistorique}
              className="h-12 px-8 rounded-[40px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Historique
            </Button>
            <Button
              onClick={handleDetailClick}
              disabled={selectedRow === null}
              className="h-12 px-8 rounded-[40px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium disabled:opacity-50"
            >
              Detail
            </Button>
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
