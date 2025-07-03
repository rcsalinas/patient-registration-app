import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', 
  host: 'postgres-db', 
  database: 'postgres', 
  password: 'admin', 
  port: 5432,
});

export default pool;