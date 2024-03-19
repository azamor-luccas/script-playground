import "reflect-metadata";
import { DataSource } from "typeorm";
import { Print } from "../repl/print";

export const initializeAppDataSource = async (dataSource?: DataSource) => {
  if (!dataSource) {
    Print.noDataSourceProvided();
    return;
  }

  Print.connectingToDB();
  await dataSource.initialize();
  Print.connectedToDB();

  return dataSource;
};
