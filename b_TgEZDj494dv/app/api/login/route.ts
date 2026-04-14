import { NextResponse } from "next/server";

type LoginResponse = { ok: true } | { ok: false; error: string };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { identifiant?: string; motDePasse?: string }
    | null;

  const username = (body?.identifiant ?? "").trim();
  const password = (body?.motDePasse ?? "").trim();

  if (!username) {
    return NextResponse.json<LoginResponse>(
      { ok: false, error: "Identifiant requis." },
      { status: 400 },
    );
  }

  if (!password) {
    return NextResponse.json<LoginResponse>(
      { ok: false, error: "Mot de passe requis." },
      { status: 400 },
    );
  }

  // Fast path: env-configured password (works even without Oracle client/libs).
  const expected = (process.env.LOGIN_PASSWORD ?? "").trim();
  if (expected && password === expected) {
    return NextResponse.json<LoginResponse>({ ok: true });
  }

  // Optional: Oracle-backed users table (only if Oracle env is configured).
  const hasOracleEnv =
    !!process.env.ORACLE_USER &&
    !!process.env.ORACLE_PASSWORD &&
    !!process.env.ORACLE_CONNECT_STRING;

  if (hasOracleEnv) {
    try {
      const { oracleQuery } = await import("@/lib/oracle");
      const rows = await oracleQuery<{ PASSWORD: string }>(
        `SELECT PASSWORD FROM CNSS.APP_USERS WHERE USERNAME = :u`,
        { u: username },
      );
      if (rows.length === 1 && rows[0]?.PASSWORD === password) {
        return NextResponse.json<LoginResponse>({ ok: true });
      }
    } catch {
      // ignore and fall through to generic error
    }
  }

  if (!expected && !hasOracleEnv) {
    return NextResponse.json<LoginResponse>(
      {
        ok: false,
        error:
          "Login non configuré. Ajoutez LOGIN_PASSWORD dans .env.local (ou configurez ORACLE_*).",
      },
      { status: 500 },
    );
  }

  return NextResponse.json<LoginResponse>(
    { ok: false, error: "Identifiant ou mot de passe incorrect." },
    { status: 401 },
  );
}

