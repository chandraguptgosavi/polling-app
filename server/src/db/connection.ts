import { Pool, Client } from "pg";
import {
  AIVEN_PG_SSL_CA,
  AIVEN_PG_USER,
  AIVEN_PG_PASSWORD,
  AIVEN_PG_HOST,
  AIVEN_PG_PORT,
  AIVEN_PG_DATABASE,
} from "./../../config";

const config = {
  user: AIVEN_PG_USER ?? "",
  password: AIVEN_PG_PASSWORD ?? "",
  host: AIVEN_PG_HOST ?? "",
  port: AIVEN_PG_PORT ? parseInt(AIVEN_PG_PORT) : undefined,
  database: AIVEN_PG_DATABASE ?? "",
  ssl: {
    rejectUnauthorized: true,
    ca: AIVEN_PG_SSL_CA ?? "",
  },
};

const client = new Client(config);

client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) {
      throw err;
    }

    console.log(`Connected to ${result.rows[0].version}`);
    client.end(function (err) {
      if (err) {
        throw err;
      }
    });
  });
});

const pool = new Pool(config);

export default pool;
