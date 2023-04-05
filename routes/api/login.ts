import { Handlers } from "$fresh/server.ts";


export const handler: Handlers = { 
  async POST(req: Request) {
    try {


      const body = await req.json();

     console.log('==>>>', body);
        return Response.json({
        error: 'llega hasta aquí',
      });
      /*
      const authUser: any = await faunaClient.query(
        q.Login(
          q.Match(q.FaunaIndex("users_by_email"), body.email),
          { password: body.password  },
        )
      );

      return Response.json({
        data: {
          token: authUser.secret,
        }
      });
      */
    } catch (error) {
      console.log('==>>>', error);
      return Response.json({
        error: error.message,
      });
    }
  }
};