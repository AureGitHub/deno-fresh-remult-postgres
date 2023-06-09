/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import "https://deno.land/std@0.145.0/dotenv/load.ts";

setTimeout(() => console.log("Hello, World!......................................."), 10000);

console.log('ARRANCANDO........');

await start(manifest, { plugins: [twindPlugin(twindConfig)] });



//await start(manifest);