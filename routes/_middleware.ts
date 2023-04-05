import { remultFresh } from "remult/remult-fresh";
import { Task } from "../model/task.ts";
import { User } from "../model/user.ts";
import { createPostgresConnection } from "https://deno.land/x/remult/postgres.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";


async function logging(
  req: Request,
  ctx: MiddlewareHandlerContext,
): Promise<Response> {

  //const body = await req.json();
  console.debug(req);
  const res = await ctx.next();
  return res;
}


export const remultServer = remultFresh({
  entities: [Task, User], 
  dataProvider: async () => {

    console.log('entra en middleware');
    
    const dbUrl = `postgres://aure:jas11jas11@postgresql-118326-0.cloudclusters.net:18718/ttec-euromillones`;
    if (dbUrl) {
      return createPostgresConnection({ configuration: {
         hostname: "postgresql-118326-0.cloudclusters.net",
        database: "ttec-euromillones",
        user: "aure",
      password: "jas11jas11",
      port: 18718
      } });
    }
    return await undefined;
  },
  
}, Response);


export const handler = [
//  logging,
  remultServer.handle
];

