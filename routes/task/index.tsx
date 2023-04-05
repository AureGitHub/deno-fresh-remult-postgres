import { Handlers, PageProps } from "$fresh/server.ts";
import Todos from "../../islands/taskTodos.tsx";
import { Task } from "../../model/task.ts";
import { remultServer } from "../_middleware.ts";

export const handler: Handlers<Task[]> = {
  async GET(req, ctx) {
   
    const remult = await remultServer.getRemult(req);

    let datos =await remult.repo(Task).find();
    
     console.log(datos);
    return ctx.render(datos);
  },
};

export default function Home({ data }: PageProps<Task[]>) {
  return (
    <div>
      <Todos data={data} />
    </div>
  );
}

