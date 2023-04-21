import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

import { NavButton, NavLink } from "components/index.ts";

import {enumUserPrefil} from "../constantes/enums.ts"

type Props = {
  children: ComponentChildren;
  state: any;
};

export function Layout(props: Props) {
  const isAllowed = !!props.state.user;
  const isSuper = props.state.user?.perfil == enumUserPrefil.super;
  const isAdmin = props.state.user?.perfil == enumUserPrefil.admin || isSuper;

  const buttProps = isAllowed
    ? { href: "/api/sign-out", text: "Sign Out" }
    : { href: "/sign-in", text: "Sign In" };

  return (
    <>
      <Head>
        <title>Titulo</title>
      </Head>
      

      <div class="bg-primary">
        <nav class="flex items-center justify-between flex-wrap min-h-[80px] max-w-screen-md mx-auto p-4">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <img
                src="/logo.svg"
                class="w-8 h-8"
                alt="the fresh logo: a sliced lemon dripping with juice"
              />
              <h1 class="ml-2 text-white">ENCABEZADO { props.state.user?.perfil}</h1>
            </div>
          </a>

          <div class="flex flex-grow border-gray pt-1">
            <div class="flex flex-grow">
              {isAllowed && <NavLink href="/secret">Secret</NavLink>}
              {isAdmin && <NavLink href="/admin">admin</NavLink> }
              {isSuper && <NavLink href="/admin">super</NavLink> }



            </div>
            <div class="flex sm:flex-shrink-0">
              <NavLink href="/sign-up">Create account</NavLink>
              <NavButton href={buttProps.href}>{buttProps.text}</NavButton>
            </div>
          </div>
        </nav>
      </div>

      <div class="mx-auto max-w-screen-md p-4">
        {props.children}
      </div>
    </>
  );
}
