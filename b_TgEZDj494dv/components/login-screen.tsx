"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginScreenProps {
  onLogin: (identifiant: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ identifiant, motDePasse }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !data || ("ok" in data && data.ok === false)) {
        setError((data as { error?: string } | null)?.error ?? "Connexion impossible.");
        return;
      }
      onLogin(identifiant.trim());
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="login-bg-blur pointer-events-none absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[#0f1f35]/60 backdrop-blur-xl"
        aria-hidden
      />
      <div className="relative w-full max-w-md z-10">
        <div className="bg-card/95 backdrop-blur-md rounded-[20px] shadow-xl border border-white/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Connexion
            </h1>
            <p className="text-muted-foreground text-sm">
              Système de Gestion Administrative — CNSS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="identifiant"
                className="text-foreground font-medium"
              >
                Identifiant
              </Label>
              <Input
                id="identifiant"
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                placeholder="Entrez votre identifiant"
                className="h-12 rounded-xl border-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="motDePasse"
                className="text-foreground font-medium"
              >
                Mot de passe
              </Label>
              <Input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="h-12 rounded-xl border-border bg-background"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-[40px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base"
            >
              {submitting ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
