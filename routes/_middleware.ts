import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
// import { redis } from "lib/redis.ts";

import sql from "../db/db.js";

import { decode  } from "djwt/mod.ts";


interface User {
  id : number,
  name : string,
  perfil : number,
  estado: number
}


// function sessionHandler(req: Request, ctx: MiddlewareHandlerContext<State>) {
//   return session(req, ctx);
// }

// export type ServerState = {
//   user: User | null;
//   error: { code: number; msg: string } | null;
// };

export async function seguridad(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {



  const url = new URL(req.url);
  const cookies = getCookies(req.headers);

  let user = null;

  //es el user logado
  if(cookies.auth){
    const [header, payload, signature] = decode(cookies.auth);  
    user= payload;

  }
  



  

  const protected_route = url.pathname == "/secret";

  const headers = new Headers();
  headers.set("location", "/");



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
