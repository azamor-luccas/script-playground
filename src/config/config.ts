import { DataSource } from "typeorm";
import { ImportEntity, ImportService, ImportWorker } from "../helpers/imports";

export type CustomScript = (
  dataSource: DataSource,
  importEntity: ImportEntity,
  importService: ImportService,
  importWorker: ImportWorker,
  ...otherElements: any[]
) => any;

export type Config = {
  datasource?: DataSource;
  env?: {
    ENV_PATH: string;
    EAGER_LOAD_ENTITIES: string;
    EAGER_LOAD_SERVICES: string;
    ENTITIES_GLOB: string;
    SERVICES_GLOB: string;
    ENTITIES_PATH: string;
    SERVICES_PATH: string;
    WORKERS_PATH: string;
  };
  customScripts?: CustomScript[];
};
