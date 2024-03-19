import { extendWith, defineCommands, clearRequireCache } from "./utils";

import { newLineMessage } from "./print/messages";
import Imports from "../helpers/imports";
import { Config } from "../config/config";
import { TestFn } from "./testFn";
import { Print } from "./print";

export class REPLInitializer {
  constructor(
    readonly config: Config,
    readonly importsHelper: Imports,
    readonly Repl,
    readonly dataSource,
    readonly dependencies
  ) {}

  initREPL = () => {
    Print.welcome();

    const repl = this.Repl.start({ newLineMessage });
    this.defineCommands(repl);
    this.initializeContext(repl.context);

    repl.on("reset", this.initializeContext);
    repl.on("exit", Print.goodbye);
  };

  defineCommands = (repl) => {
    let replInitializer = this;
    defineCommands({
      t: {
        help: "Runs the first function from 'customScripts'",
        action() {
          replInitializer.config.customScripts[0](
            replInitializer.dataSource,
            replInitializer.importsHelper.importEntity,
            replInitializer.importsHelper.importService,
            replInitializer.importsHelper.importWorker
          );
        },
      },
      printTestFnHelp: {
        help: "Print help for custom Scripts",
        action() {
          Print.testFnHelp();
        },
      },
    })(repl);
  };

  // Define a context initializer
  initializeContext = (context: any) => {
    clearRequireCache();

    extendWith({
      t: new TestFn(this.config, this.importsHelper, this.dataSource).call,
      help: Print.help,
      ds: this.dataSource,
      d: this.dependencies,
      e: this.importsHelper.importEntity,
      s: this.importsHelper.importService,
      w: this.importsHelper.importWorker,
    })(context);
  };
}
