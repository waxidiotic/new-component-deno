import { Command } from "./deps.ts";
import { getConfig } from "./utils.ts";

await new Command()
  .name("new-component-deno")
  .version("0.0.1")
  .description("Deno CLI to create new React components")
  .parse(Deno.args);

const _config = await getConfig();
