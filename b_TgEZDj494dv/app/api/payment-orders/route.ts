import { NextResponse } from "next/server";
import { oracleQuery } from "@/lib/oracle";
import type { PaymentOrdersResponse } from "@/lib/api-types";

function toNullableString(v: string | null): string | null {
  const s = v?.trim();
  return s ? s : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const imm = toNullableString(searchParams.get("imm"));
  const typePrestation = toNullableString(searchParams.get("typePrestation"));
  const modePaiement = toNullableString(searchParams.get("modePaiement"));
  const dateEmission = toNullableString(searchParams.get("dateEmission")); // expected DDMMYYYY

  if (!imm) {
    return NextResponse.json(
      { error: "Missing required query param: imm" },
      { status: 400 },
    );
  }

  const sql = `
    SELECT
      a.ASO_C_NUMERO AS "id",
      'OP' AS "type",
      TO_CHAR(a.ASO_D_EMISS, 'DD/MM/YYYY') AS "dateEmission",
      'CNSS' AS "sourceOP",
      NVL(im.IMM_C_MODE_PAIEMENT, a.MPA_C_MPAI) AS "modePaie",
      a.ASO_M_MVT AS "montant",
      TO_CHAR(a.ASO_C_ETAT) AS "etat",
      TO_CHAR(a.ASO_P_EMISS) AS "periodeEmission",
      TRIM(NVL(i.IND_L_NOM, '') || ' ' || NVL(i.IND_L_PRENOM, '')) AS "beneficiaire",
      NVL(a.ASO_C_OPBQ, '') AS "refStructure",
      a.IMM_V_NUM_IMM AS "numeroAffilie"
    FROM CNSS.D_ASS_OPERATION a
    LEFT JOIN CNSS.D_IMMATRICULE im
      ON im.IMM_V_NUM_IMM = a.IMM_V_NUM_IMM
    LEFT JOIN CNSS.D_INDIVIDU i
      ON i.IND_V_NUM_INDIVIDU = im.IND_IND_V_NUM_INDIVIDU
    WHERE a.IMM_V_NUM_IMM = :imm
      AND (:typePrestation IS NULL OR a.TPR_C_PREST = :typePrestation)
      AND (:modePaiement IS NULL OR im.IMM_C_MODE_PAIEMENT = :modePaiement)
      AND (
        :dateEmission IS NULL
        OR TO_CHAR(a.ASO_D_EMISS, 'DDMMYYYY') = :dateEmission
      )
    ORDER BY a.ASO_D_EMISS DESC, a.ASO_C_NUMERO DESC
  `;

  const orders = await oracleQuery<PaymentOrdersResponse["orders"][number]>(sql, {
    imm,
    typePrestation,
    modePaiement,
    dateEmission,
  });

  return NextResponse.json<PaymentOrdersResponse>({ orders });
}

