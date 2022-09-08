interface ConfigOptions {
  dir?: string;
  extension?: "js" | "jsx" | "ts" | "tsx";
  test?: boolean; // Jest
  story?: boolean; // Storybook
}

export const getConfig = async () => {
  const home = Deno.env.get("HOME");
  const currentPath = Deno.cwd();

  const defaults: ConfigOptions = {
    dir: "components",
    extension: "tsx",
    test: false,
    story: false,
  };

  let localOverrides: ConfigOptions = {};
  let globalOverrides: ConfigOptions = {};

  try {
    localOverrides = JSON.parse(
      await Deno.readTextFile(`/${currentPath}/.new-component-config.json`)
    );
  } catch (_e) {
    console.info("No local overrides file found.");
  }

  try {
    globalOverrides = JSON.parse(
      await Deno.readTextFile(`${home}/.new-component-config.json`)
    );
  } catch (_e) {
    console.info("No global overrides file found.");
  }

  return Object.assign({}, defaults, globalOverrides, localOverrides);
};
