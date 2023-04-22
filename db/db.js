import postgres from 'postgresjs/mod.js'

const sql = postgres({     
  hostname: Deno.env.get('POSTGRES_HOSTNAME') ,     
  database: Deno.env.get('POSTGRES_DATABASE') ,
  user: Deno.env.get('POSTGRES_USER') ,
  password: Deno.env.get('POSTGRES_PASSWORD') ,
  port: Deno.env.get('POSTGRES_PORT') 

 }) // will use psql environment variables

export default sql 