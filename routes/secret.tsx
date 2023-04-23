import { Handlers, PageProps } from "$fresh/server.ts";

import { Layout } from "components/index.ts";
import Nav from "../islands/Nav.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  }
}

export default function Secret(props: PageProps) {
	return (
    <Layout state={props.data}>
      <Nav />
      <div class="flex flex-col items-center">
        <h2>Congrats, You've reached the secret page! {props.data.user?.email}</h2>
        <p>Here's a little treat:</p>
  			<p class="text-[72px] text-align-center">🍋</p>
      </div>
    </Layout>
	)
}
