import { NextResponse } from "next/server";
import { oracleQuery } from "@/lib/oracle";

type ResolveResponse =
  | { immatricule: string; fullName: string; cin: string | null }
  | { error: string };

function normalizeQuery(q: string | null): string | null {
  const s = q?.trim();
  return s ? s : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = normalizeQuery(searchParams.get("q"));

  if (!query) {
    return NextResponse.json<ResolveResponse>(
      { error: "Missing required query param: q" },
      { status: 400 },
    );
  }

  const sql = `
    SELECT
      im.IMM_V_NUM_IMM AS "immatricule",
      TRIM(NVL(i.IND_L_NOM, '') || ' ' || NVL(i.IND_L_PRENOM, '')) AS "fullName",
      i.IND_V_CIN AS "cin"
    FROM CNSS.D_IMMATRICULE im
    JOIN CNSS.D_INDIVIDU i
      ON i.IND_V_NUM_INDIVIDU = im.IND_IND_V_NUM_INDIVIDU
    WHERE
      im.IMM_V_NUM_IMM = :qExact
      OR UPPER(i.IND_V_CIN) = UPPER(:qExact)
      OR UPPER(i.IND_L_NOM) LIKE UPPER('%' || :qLike || '%')
      OR UPPER(i.IND_L_PRENOM) LIKE UPPER('%' || :qLike || '%')
    ORDER BY im.IMM_V_NUM_IMM
    FETCH FIRST 10 ROWS ONLY
  `;

  const rows = await oracleQuery<{
    immatricule: string;
    fullName: string;
    cin: string | null;
  }>(sql, { qExact: query, qLike: query });

  if (rows.length === 0) {
    return NextResponse.json<ResolveResponse>(
      { error: "Aucun assuré trouvé pour cette recherche." },
      { status: 404 },
    );
  }

  if (rows.length > 1) {
    return NextResponse.json<ResolveResponse>(
      { error: "Plusieurs assurés correspondent. Affinez la recherche (IMM ou CIN)." },
      { status: 409 },
    );
  }

  return NextResponse.json<ResolveResponse>(rows[0]);
}

