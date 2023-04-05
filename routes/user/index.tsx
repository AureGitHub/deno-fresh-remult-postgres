import { Handlers, PageProps } from "$fresh/server.ts";
import Todos from "../../islands/userTodos.tsx";
import { User } from "../../model/user.ts";
import { remultServer } from "../_middleware.ts";

export const handler: Handlers<Task[]> = {
  async GET(req, ctx) {
   
    const remult = await remultServer.getRemult(req);

    const datos =await remult.repo(User).find();
    
    return ctx.render(datos);
  },
};

export default function Home({ data }: PageProps<User[]>) {
  return (
    <div>
      <Todos data={data} />
    </div>
  );
}

