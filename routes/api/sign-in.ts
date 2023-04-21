import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

import sql from "../../db/db.js"
// import * as openpgp from "../../node_modules/openpgp/dist/openpgp.mjs";
import { create } from "djwt/mod.ts";


export const handler: Handlers = {
  async POST(req, ctx) {
    const url = new URL(req.url);
    const form = await req.formData();

		const headers = new Headers();
		headers.set("location", "/");
		
    const email = String(form.get("email"));
    const password = String(form.get("password"));


    const data = await sql`select id,name,email,fk_perfil  perfil, fk_estado estado   
                            from T_Users where email=${email} and password=${password}`;

    
		if (data.length == 0 ) {
      ctx.state = { error: 'usuario/password incorrecto' };
      return new Response(null, { status: 303,
        headers : {
          "location": "/sign-in?errLogin=true",
          "content-type": "application/json", 
        }  });

      
		}

  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  const jwt = await create({ alg: "HS512", typ: "JWT" },  data[0] , key );

    setCookie(headers, {
      name: "auth",
      value:jwt,
      maxAge: 30000,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

		return new Response(null, {
			status: 303,
			headers,
		});
  },
};
