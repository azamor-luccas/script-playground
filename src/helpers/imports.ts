import dynamicallyImport from "./dynamicallyImport";

type EntityResponseFormat = "obj" | "default";

type ImportEntity = (
  entityName: string,
  format: EntityResponseFormat
) => Promise<any>;

type ImportService = (serviceName: string, cache: boolean) => Promise<any>;

type ImportWorker = (workerName: string, cache: boolean) => Promise<any>;

export type { ImportEntity, ImportService, ImportWorker };

export default class Imports {
  ENTITIES_PATH: string;
  SERVICES_PATH: string;
  WORKERS_PATH: string;

  constructor(env) {
    this.ENTITIES_PATH = env.ENTITIES_PATH;
    this.SERVICES_PATH = env.SERVICES_PATH;
    this.WORKERS_PATH = env.WORKERS_PATH;
  }

  importEntity: ImportEntity = async (
    entityName: string,
    format: EntityResponseFormat = "default"
  ) => {
    let importsObj = await dynamicallyImport(
      `${this.ENTITIES_PATH}${entityName}.ts`
    );

    if (format === "default") {
      return new importsObj[entityName]();
    }

    return importsObj;
  };

  importService: ImportService = async (serviceName: string, cache = false) => {
    let importsObj = await dynamicallyImport(
      `${this.SERVICES_PATH}${serviceName}.ts`,
      cache
    );
    return new importsObj[Object.keys(importsObj)[0]]();
  };

  importWorker: ImportWorker = async (workerName: string, cache = false) => {
    let importsObj = await dynamicallyImport(
      `${this.WORKERS_PATH}${workerName}.ts`,
      cache,
      true
    );
    return importsObj["default"];
  };
}
