import dynamicallyImport from "./dynamicallyImport";

export async function loadDependencies() {
  let promises = [];
  if (process.env.EAGER_LOAD_ENTITIES === "true") {
    let entitiesPromise = dynamicallyImport(process.env.ENTITIES_GLOB);
    promises.push(entitiesPromise);
  }
  if (process.env.EAGER_LOAD_SERVICES === "true") {
    let servicesPromise = dynamicallyImport(process.env.SERVICES_GLOB);
    promises.push(servicesPromise);
  }
  return await Promise.all(promises);
}
