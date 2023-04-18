import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

import sql from "../../db/db.js"

export const handler: Handlers = {
  async POST(req, ctx) {
    const url = new URL(req.url);
    const form = await req.formData();

		const headers = new Headers();
		headers.set("location", "/");
		
    const email = String(form.get("email"));
    const password = String(form.get("password"));


    const data = await sql`select * from users where email=${email} and password=${password}`;

    console.log(data);

    
		if (data.length == 0 ) {
      // TODO: Add some actual error handling. Differentiate between 500 & 403.

      ctx.state = { error: 'usuario/password incorrecto' };

      return new Response(null, { status: 303,
        headers : {
          "location": "/sign-in?errLogin=true",
          "content-type": "application/json", 
        }  });

      
		}


    console.log(data[0].id + data[0].perfil);


    setCookie(headers, {
      name: "auth",
      value:`${data[0].id}`,
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
