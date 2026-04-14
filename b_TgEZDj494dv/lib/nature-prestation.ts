export const NATURE_PRESTATIONS = [
  { code: "AM", label: "Assurance Maladie Obligatoire" },
  { code: "PN", label: "PENSION" },
  { code: "AF", label: "Allocation Familiale" },
  { code: "IJ", label: "indemnités journalières" },
] as const

export type NaturePrestationCode = (typeof NATURE_PRESTATIONS)[number]["code"]

export function defaultNaturePrestationCode(): NaturePrestationCode {
  return "AM"
}
