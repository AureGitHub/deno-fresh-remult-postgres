import LoginForm from "../islands/LoginForm.tsx";

import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {

    // aquí puedo ir al server cuando se llama al router login

    console.log('Inside login');
    //Esto baja al cliente
    return ctx.render({
      titulo: "Login 📝",
    });
  },
};

export default function UserLogin(props: PageProps) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="my-6 text-3xl">
        {props.data.titulo}
      </h1>
      <LoginForm />
    </div>
  );
}