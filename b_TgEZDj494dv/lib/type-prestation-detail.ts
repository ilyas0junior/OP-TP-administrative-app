import type { NaturePrestationCode } from "@/lib/nature-prestation"

export type TypePrestationDetailOption = { value: string; label: string }

/** Sous-types affichés selon la nature (filtre TPR côté API = `value`). */
export const TYPE_PRESTATION_OPTIONS: Record<
  NaturePrestationCode,
  TypePrestationDetailOption[] | null
> = {
  AM: [
    { value: "MO", label: "MO (AMO)" },
    { value: "SS", label: "SS (Soin Santé)" },
  ],
  PN: [
    { value: "PSINC", label: "PS — Pension d'incapacité" },
    { value: "PSNORM", label: "PS — Pension normale" },
  ],
  AF: null,
  IJ: null,
}

export function needsTypePrestationDetail(
  nature: NaturePrestationCode,
): boolean {
  return TYPE_PRESTATION_OPTIONS[nature] != null
}

export function resolveTypePrestationForApi(
  nature: NaturePrestationCode,
  typeDetailCode: string,
): string {
  if (needsTypePrestationDetail(nature) && typeDetailCode.trim()) {
    return typeDetailCode.trim()
  }
  return nature
}

export function defaultTypeDetailForNature(
  nature: NaturePrestationCode,
): string {
  const opts = TYPE_PRESTATION_OPTIONS[nature]
  return opts?.[0]?.value ?? ""
}
