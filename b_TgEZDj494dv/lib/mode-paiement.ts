export const MODE_PAIEMENTS = [
  { code: "V", label: "Virement Assurer" },
  { code: "W", label: "Vierement Affilier" },
  { code: "B", label: "Mise à disposition" },
  { code: "G", label: "Virement à l'étranger" },
] as const

export type ModePaiementCode = (typeof MODE_PAIEMENTS)[number]["code"]

