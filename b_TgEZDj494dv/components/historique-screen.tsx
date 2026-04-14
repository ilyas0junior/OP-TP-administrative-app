"use client"

import { Button } from "@/components/ui/button"
import { historiqueData } from "@/lib/mock-data"

interface HistoriqueScreenProps {
  onRetour: () => void
}

export function HistoriqueScreen({ onRetour }: HistoriqueScreenProps) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="bg-card rounded-[20px] shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
            Historique Situation
          </h1>
          
          <p className="text-center text-muted-foreground mb-6">
            <span>Numéro immatricule : </span>
            <span className="font-semibold text-foreground">118059982</span>
            <span className="mx-2">|</span>
            <span>Nature prestation : </span>
            <span className="font-semibold text-foreground">AMO</span>
          </p>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">Numéro</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Motif</th>
                  <th className="px-4 py-3 text-left font-semibold">Libelle Motif</th>
                  <th className="px-4 py-3 text-left font-semibold">Situation</th>
                  <th className="px-4 py-3 text-left font-semibold">Libelle Situation</th>
                  <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">Utilisateur Agence</th>
                </tr>
              </thead>
              <tbody>
                {historiqueData.map((item, index) => (
                  <tr
                    key={item.numero}
                    className={`
                      border-b border-border
                      ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                    `}
                  >
                    <td className="px-4 py-3 text-foreground font-medium">{item.numero}</td>
                    <td className="px-4 py-3 text-foreground">{item.date}</td>
                    <td className="px-4 py-3 text-foreground">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-xs">
                        {item.motif}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">{item.libelleMotif}</td>
                    <td className="px-4 py-3 text-foreground">
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
                        {item.situation}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">{item.libelleSituation}</td>
                    <td className="px-4 py-3 text-foreground font-mono text-xs">{item.utilisateurAgence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
