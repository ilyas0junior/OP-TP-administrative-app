"use client"

import { useCallback, useMemo, useState } from "react"
import type { AppNavId } from "@/components/app-shell"
import { AppShell } from "@/components/app-shell"
import { ConsultationPrefsProvider } from "@/components/consultation-prefs"
import { ConsultationScreen } from "@/components/consultation-screen"
import { DetailsScreen } from "@/components/details-screen"
import { HistoriqueScreen } from "@/components/historique-screen"
import { HomeDashboard } from "@/components/home-dashboard"
import { LoginScreen } from "@/components/login-screen"
import { LogsScreen } from "@/components/logs-screen"
import { OpAssureScreen } from "@/components/op-assure-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { SessionProvider, useSession } from "@/components/session-context"
import type { PaymentOrder } from "@/lib/api-types"
import type { NaturePrestationCode } from "@/lib/nature-prestation"

type Screen =
  | "login"
  | "home"
  | "consultation"
  | "opAssure"
  | "tpAssure"
  | "historique"
  | "details"
  | "logs"
  | "profile"

type PaymentCriteria = {
  immatricule: string
  paymentKind: "ordre" | "titre"
  typePrestation: string
  natureCode: NaturePrestationCode
  naturePrestationLabel?: string
  typePrestationDetailLabel?: string
  modePaiement?: string
  dateEmission?: string
}

function navFromScreen(screen: Screen, criteria: PaymentCriteria | null): AppNavId {
  switch (screen) {
    case "home":
      return "home"
    case "consultation":
      return "consultation"
    case "opAssure":
    case "details":
      if (criteria?.paymentKind === "titre") return "tpAssure"
      return "opAssure"
    case "tpAssure":
      return "tpAssure"
    case "historique":
      return "historique"
    case "logs":
      return "logs"
    case "profile":
      return "profile"
    case "login":
    default:
      return "home"
  }
}

function HomeContent() {
  const { setUser, log } = useSession()
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [selectedOrder, setSelectedOrder] = useState<PaymentOrder | null>(null)
  const [criteria, setCriteria] = useState<PaymentCriteria | null>(null)

  const canOpAssure = Boolean(criteria?.immatricule && criteria.paymentKind === "ordre")
  const canTpAssure = Boolean(criteria?.immatricule && criteria.paymentKind === "titre")
  const canHistorique = Boolean(criteria?.immatricule)

  const handleLogin = useCallback(
    (identifiant: string) => {
      setUser({
        identifiant,
        connectedAt: new Date().toISOString(),
      })
      log("Connexion", identifiant)
      setCurrentScreen("home")
    },
    [log, setUser],
  )

  const handleLogout = useCallback(() => {
    log("Déconnexion")
    setUser(null)
    setCriteria(null)
    setSelectedOrder(null)
    setCurrentScreen("login")
  }, [log, setUser])

  const handleAfficher = useCallback(
    (nextCriteria: PaymentCriteria) => {
      setCriteria(nextCriteria)
      setCurrentScreen(
        nextCriteria.paymentKind === "titre" ? "tpAssure" : "opAssure",
      )
    },
    [],
  )

  const handleQuitter = useCallback(() => {
    log("Fermeture session (Quitter)")
    setUser(null)
    setCriteria(null)
    setSelectedOrder(null)
    setCurrentScreen("login")
  }, [log, setUser])

  const handleRetourToConsultation = useCallback(() => {
    setCurrentScreen("consultation")
  }, [])

  const handleHistorique = useCallback(() => {
    log("Ouverture Historique situation")
    setCurrentScreen("historique")
  }, [log])

  const handleDetail = useCallback(
    (order: PaymentOrder) => {
      log("Détail ordre de paiement", `N° ${order.id}`)
      setSelectedOrder(order)
      setCurrentScreen("details")
    },
    [log],
  )

  const handleRetourToList = useCallback(() => {
    if (criteria?.paymentKind === "titre") {
      setCurrentScreen("tpAssure")
    } else {
      setCurrentScreen("opAssure")
    }
  }, [criteria?.paymentKind])

  const handleNavigate = useCallback(
    (id: AppNavId) => {
      if (id === "home") {
        setCurrentScreen("home")
        return
      }
      if (id === "consultation") {
        setCurrentScreen("consultation")
        return
      }
      if (id === "opAssure") {
        if (canOpAssure) setCurrentScreen("opAssure")
        return
      }
      if (id === "tpAssure") {
        if (canTpAssure) setCurrentScreen("tpAssure")
        return
      }
      if (id === "historique") {
        if (canHistorique) {
          log("Navigation — Historique")
          setCurrentScreen("historique")
        }
        return
      }
      if (id === "logs") {
        setCurrentScreen("logs")
        return
      }
      if (id === "profile") {
        setCurrentScreen("profile")
        return
      }
    },
    [canOpAssure, canTpAssure, canHistorique, log],
  )

  const activeNav = useMemo(
    () => navFromScreen(currentScreen, criteria),
    [currentScreen, criteria],
  )

  const listProps = useMemo(
    () => ({
      immatricule: criteria?.immatricule ?? "",
      typePrestation: criteria?.typePrestation,
      naturePrestationLabel: criteria?.naturePrestationLabel,
      typePrestationDetailLabel: criteria?.typePrestationDetailLabel,
      modePaiement: criteria?.modePaiement,
      dateEmission: criteria?.dateEmission,
    }),
    [criteria],
  )

  if (currentScreen === "login") {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <AppShell
      active={activeNav}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      canOpAssure={canOpAssure}
      canTpAssure={canTpAssure}
      canHistorique={canHistorique}
    >
      {currentScreen === "home" && (
        <HomeDashboard onGoConsultation={() => setCurrentScreen("consultation")} />
      )}

      {currentScreen === "consultation" && (
        <ConsultationScreen
          onAfficher={handleAfficher}
          onQuitter={handleQuitter}
        />
      )}

      {currentScreen === "opAssure" && (
        <OpAssureScreen
          variant="op"
          onRetour={handleRetourToConsultation}
          onHistorique={handleHistorique}
          onDetail={handleDetail}
          {...listProps}
        />
      )}

      {currentScreen === "tpAssure" && (
        <OpAssureScreen
          variant="tp"
          onRetour={handleRetourToConsultation}
          onHistorique={handleHistorique}
          onDetail={handleDetail}
          {...listProps}
        />
      )}

      {currentScreen === "historique" && (
        <HistoriqueScreen onRetour={handleRetourToList} />
      )}

      {currentScreen === "details" && selectedOrder && (
        <DetailsScreen
          order={selectedOrder}
          onRetour={handleRetourToList}
        />
      )}

      {currentScreen === "logs" && <LogsScreen />}

      {currentScreen === "profile" && <ProfileScreen />}
    </AppShell>
  )
}

export default function Home() {
  return (
    <SessionProvider>
      <ConsultationPrefsProvider>
        <HomeContent />
      </ConsultationPrefsProvider>
    </SessionProvider>
  )
}
