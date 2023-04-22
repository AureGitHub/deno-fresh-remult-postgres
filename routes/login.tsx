import { Handlers, PageProps } from "$fresh/server.ts";

import { Layout } from "components/index.ts";
import AuthForm from "islands/AuthForm.tsx";

import sql from "../db/db.js";
import { create } from "djwt/mod.ts";
import { setCookie } from "std/http/cookie.ts";


export const handler: Handlers = {
  async POST(req, ctx){


    const url = new URL(req.url);
    const form = await req.formData();

		const headers = new Headers();
		headers.set("location", "/");
		
    const email = String(form.get("email"));
    const password = String(form.get("password"));


    const data = await sql`select id,name,email,fk_perfil  perfil, fk_estado estado   
                            from T_Users where email=${email} and password=${password}`;

    
		if (data.length == 0 ) {
      ctx.state.error = { code: -1, msg: 'email o password incorrecto' };
      ctx.state.user = { email, password };
      return ctx.render(ctx.state);
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
  GET(req, ctx) {
    return ctx.render({user: {email: 'aure.desande@gmail.com', password: 'jas11jas11'}});
  }
}

export default function Page(props: PageProps) {
  const errLogin = props.data.error?.msg ? props.data.error?.msg : null;
  return (
    <Layout state={props.data}>
      <div class="flex justify-center">
        <div class="flex flex-col items-stretch w-[500px] md:w-2/3">
          <div class="flex justify-center">
            <img
              src="/logo.svg"
              class="w-16 h-16 mt-8 mb-4"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
          </div>          
          <AuthForm mode="In" errLogin={errLogin} user={props.data?.user} />
          
        </div>
        
      </div>
    </Layout>
  );
}
