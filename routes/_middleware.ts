import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
// import { redis } from "lib/redis.ts";

import sql from "../db/db.js";


interface User {
  id : number,
  name : string,
  perfil : string
}


// function sessionHandler(req: Request, ctx: MiddlewareHandlerContext<State>) {
//   return session(req, ctx);
// }

export type ServerState = {
  user: User | null;
  error: { code: number; msg: string } | null;
};

export async function seguridad(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {

  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const idUser = cookies.auth;

  const protected_route = url.pathname == "/secret";

  const headers = new Headers();
  headers.set("location", "/");

  let user = null;


  if (idUser) {    

    const data = await sql`select * from users where id=${idUser}`;
    user =data.length == 0 ? null : {id :data[0].id, name :data[0].name, perfil :data[0].perfil};
    
  }

  if (protected_route && !user) {
    // Can't use 403 if we want to redirect to home page.
    return new Response(null, { headers, status: 303 });
  }

 
  ctx.state.user = user;


  return await ctx.next();
}

export const handler = [
 // sessionHandler,
  seguridad
  ];
