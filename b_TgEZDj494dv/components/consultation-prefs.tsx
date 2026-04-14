"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  defaultNaturePrestationCode,
  type NaturePrestationCode,
} from "@/lib/nature-prestation"
import {
  defaultTypeDetailForNature,
  TYPE_PRESTATION_OPTIONS,
} from "@/lib/type-prestation-detail"

type ConsultationPrefsContextValue = {
  natureCode: NaturePrestationCode
  setNatureCode: (c: NaturePrestationCode) => void
  typeDetailCode: string
  setTypeDetailCode: (v: string) => void
}

const ConsultationPrefsContext =
  createContext<ConsultationPrefsContextValue | null>(null)

export function ConsultationPrefsProvider({ children }: { children: ReactNode }) {
  const [natureCode, setNatureCodeState] = useState<NaturePrestationCode>(
    defaultNaturePrestationCode(),
  )
  const [typeDetailCode, setTypeDetailCodeState] = useState<string>(() =>
    defaultTypeDetailForNature(defaultNaturePrestationCode()),
  )

  const setNatureCode = useCallback((c: NaturePrestationCode) => {
    setNatureCodeState(c)
    const opts = TYPE_PRESTATION_OPTIONS[c]
    setTypeDetailCodeState(opts?.[0]?.value ?? "")
  }, [])

  const setTypeDetailCode = useCallback((v: string) => {
    setTypeDetailCodeState(v)
  }, [])

  const value = useMemo(
    () => ({
      natureCode,
      setNatureCode,
      typeDetailCode,
      setTypeDetailCode,
    }),
    [natureCode, setNatureCode, typeDetailCode, setTypeDetailCode],
  )

  return (
    <ConsultationPrefsContext.Provider value={value}>
      {children}
    </ConsultationPrefsContext.Provider>
  )
}

export function useConsultationPrefs() {
  const ctx = useContext(ConsultationPrefsContext)
  if (!ctx) {
    throw new Error("useConsultationPrefs must be used within ConsultationPrefsProvider")
  }
  return ctx
}
