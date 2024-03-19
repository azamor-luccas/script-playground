import path from "path";

export default async function loadConfigFile() {
  let configFilePath = path.join(process.cwd(), "script-playground.config.ts");
  let data = await import(configFilePath);
  let configs = data.default;
  return configs;
}
