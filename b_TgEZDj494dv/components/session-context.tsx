"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  appendActivityLog,
  loadActivityLogs,
  type ActivityLogEntry,
} from "@/lib/activity-log"

export type SessionUser = {
  identifiant: string
  connectedAt: string
}

type SessionContextValue = {
  user: SessionUser | null
  setUser: (user: SessionUser | null) => void
  logs: ActivityLogEntry[]
  log: (action: string, detail?: string) => void
  clearLogs: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<SessionUser | null>(null)
  const [logs, setLogs] = useState<ActivityLogEntry[]>([])

  useEffect(() => {
    setLogs(loadActivityLogs())
  }, [])

  const setUser = useCallback((next: SessionUser | null) => {
    setUserState(next)
  }, [])

  const log = useCallback((action: string, detail?: string) => {
    const next = appendActivityLog(action, detail)
    setLogs(next)
  }, [])

  const clearLogs = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("cnss_app_activity_logs")
    }
    setLogs([])
  }, [])

  const value = useMemo(
    () => ({ user, setUser, logs, log, clearLogs }),
    [user, setUser, logs, log, clearLogs],
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used within SessionProvider")
  return ctx
}
