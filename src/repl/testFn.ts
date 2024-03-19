import { DataSource } from "typeorm";
import { Config } from "../config/config";
import Imports from "../helpers/imports";

export class TestFn {
  constructor(
    readonly config: Config,
    readonly importsHelper: Imports,
    readonly dataSource: DataSource
  ) {}

  call = (...args) => {
    if ((this.config.customScripts || []).length === 0) return;
    if (this.config.customScripts.length === 1) {
      return this.config.customScripts[0](
        this.dataSource,
        this.importsHelper.importEntity,
        this.importsHelper.importService,
        this.importsHelper.importWorker,
        ...args
      );
    }

    return (...args2) =>
      this.config.customScripts[args[0]](
        this.dataSource,
        this.importsHelper.importEntity,
        this.importsHelper.importService,
        this.importsHelper.importWorker,
        ...args2
      );
  };
}
