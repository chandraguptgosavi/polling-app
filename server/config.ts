import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;

export const AIVEN_PG_USER = process.env.AIVEN_PG_USER;
export const AIVEN_PG_SSL_CA = Buffer.from(
  process.env.AIVEN_PG_SSL_CA ?? "",
  "base64"
).toString("ascii");
export const AIVEN_PG_PASSWORD = process.env.AIVEN_PG_PASSWORD;
export const AIVEN_PG_HOST = process.env.AIVEN_PG_HOST;
export const AIVEN_PG_DATABASE = process.env.AIVEN_PG_DATABASE;
export const AIVEN_PG_PORT = process.env.AIVEN_PG_PORT;

export const CLIENT_URL = process.env.CLIENT_URL;