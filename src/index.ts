const Repl = require("repl");
import loadConfigFile from "./config/loadUserConfigFile";
import { initializeAppDataSource } from "./helpers/initializeAppDataSource";
import Imports from "./helpers/imports";
import { Config } from "./config/config";
import { loadDependencies } from "./helpers/loadDependencies";
import { REPLInitializer } from "./repl";

async function main() {
  const config: Config = await loadConfigFile();
  const importsHelper: Imports = new Imports(config.env);

  require("dotenv").config({ path: config?.env?.ENV_PATH });

  const [dataSource, dependencies] = await Promise.all([
    initializeAppDataSource(config?.datasource),
    loadDependencies(),
  ]);

  new REPLInitializer(
    config,
    importsHelper,
    Repl,
    dataSource,
    dependencies
  ).initREPL();
}

main();
