import { glob } from "glob";
import requireUncached from "./requireUncached";
import path from "path";

export default async function dynamicallyImport(
  relativePath: string,
  cache = true,
  onlyDefault = false
) {
  let importsObject = {};
  const absolutePath = path.join(process.cwd(), relativePath);

  let res = await glob(absolutePath);

  let modules = await Promise.all(
    res.map(
      (file) => importModule(file.replace(".ts", ""), cache)
      // (file) => importModule(file.replace(process.cwd(), ".").replace(".ts", ""), cache)
    )
  );

  if (onlyDefault) {
    return {
      default: modules[0]["default"],
    };
  }

  modules.forEach((e) => {
    Object.keys(e).forEach((key: string) => {
      if (key === "default") {
        importsObject[e["default"].name] = e.default;
      } else {
        importsObject[key] = e[key];
      }
    });
  });

  return importsObject;
}

function importModule(module, cached = true) {
  if (cached) {
    return import(module);
  } else {
    return requireUncached(module);
  }
}
