import "server-only";

import oracledb from "oracledb";

declare global {
  // eslint-disable-next-line no-var
  var __oraclePool: oracledb.Pool | undefined;
}

function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

export async function getOraclePool(): Promise<oracledb.Pool> {
  if (global.__oraclePool) return global.__oraclePool;

  const user = getRequiredEnv("ORACLE_USER");
  const password = getRequiredEnv("ORACLE_PASSWORD");
  const connectString = getRequiredEnv("ORACLE_CONNECT_STRING");

  global.__oraclePool = await oracledb.createPool({
    user,
    password,
    connectString,
    poolMin: 0,
    poolMax: 4,
    poolIncrement: 1,
  });

  return global.__oraclePool;
}

export async function oracleQuery<T extends Record<string, unknown>>(
  sql: string,
  binds: oracledb.BindParameters = {},
): Promise<T[]> {
  const pool = await getOraclePool();
  const conn = await pool.getConnection();
  try {
    const result = await conn.execute<T>(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return (result.rows ?? []) as unknown as T[];
  } finally {
    await conn.close();
  }
}

