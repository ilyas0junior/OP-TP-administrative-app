"use client"

export type ActivityLogEntry = {
  id: string
  at: string
  action: string
  detail?: string
}

const STORAGE_KEY = "cnss_app_activity_logs"
const MAX_ENTRIES = 200

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function loadActivityLogs(): ActivityLogEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ActivityLogEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveActivityLogs(entries: ActivityLogEntry[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)))
  } catch {
    // ignore quota
  }
}

export function appendActivityLog(action: string, detail?: string): ActivityLogEntry[] {
  const entry: ActivityLogEntry = {
    id: generateId(),
    at: new Date().toISOString(),
    action,
    detail,
  }
  const next = [entry, ...loadActivityLogs()].slice(0, MAX_ENTRIES)
  saveActivityLogs(next)
  return next
}
