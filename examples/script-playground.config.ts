import { DataSource } from "typeorm";
require("dotenv").config({ path: `.env` });

//import { Config } from 'script-playground/src/config/config'

// const config: Config = {
const config = {
  datasource: new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: false,
    logging: false,
    entities: process.env.TYPEORM_ENTITIES?.split(",") || [],
    migrations: [],
    subscribers: [],
  }),
  env: {
    ENV_PATH: ".env",
    EAGER_LOAD_ENTITIES: "true",
    EAGER_LOAD_SERVICES: "false",
    ENTITIES_GLOB: "/src/database/entity/*.ts",
    SERVICES_GLOB: "/src/services/**/*.ts",
    ENTITIES_PATH: "/src/database/entity/",
    SERVICES_PATH: "/src/services/**/",
    WORKERS_PATH: "/src/jobs/services/repeatable/",
  },
  customScripts: [
    async function test(dataSource, importEntity, importService, importWorker) {
      return await new (await importWorker("DynamicPricing", true))(
        dataSource
      ).execute();
    },
    async function test(dataSource, importEntity, importService, importWorker, a, b, c) {
      console.log(a, b, c);
      return a;
    },
  ],
};

export default config;
