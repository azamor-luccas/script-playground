/**
 * 
 * This file contains colorized messages used in the Script Playground tool.
 * 
 */
import { Colorizer as C } from "./colorizer";

const userNameMessage: string = C.magenta(process.env.USER);

const nodeVersion = C.green(`${process.title} ${process.version}`);

const goodbyeMessage: string = `
  Goodbye, ${userNameMessage}!
`;
const newLineMessage: string = `${nodeVersion} → `;
const helpMessage: string = `
Usage examples:

* Load a User entity from the database:
  ${C.magenta("await")} ${C.cyan("ds.getRepository")}(${C.green(
  "'User'"
)}).${C.cyan("createQueryBuilder")}(${C.green("'user'")}).${C.cyan(
  "select"
)}(${C.green('"user.id"')}).${C.cyan("getOne")}()

* Get all loaded entities:
  ${C.cyan("ds.entityMetadatas")}.${C.cyan("map")}((${C.yellow(
  "e"
)}) => ${C.yellow("e")}.${C.cyan("name")})

* Load an entity:
  ${C.magenta("await")} ${C.cyan("e")}(${C.green('"User"')})

* Load a service and execute:
  ${C.magenta("await")} ${C.cyan("s")}(${C.green('"GetBookingRoom"')}).${C.cyan(
  "execute"
)}()

* Test scripts:
  ${C.cyan("t")}(${C.red("...args")}) ${C.green(
  "// if 'customScripts' has only one function"
)} 
  ${C.cyan("t")}(${C.red("index")})(${C.red("...args")}) ${C.green(
  "// if 'customScripts' has multiple functions"
)}
  ${C.cyan(".t")} ${C.green("// for first customScript without args")}

  run ${C.cyan(".printTestFnHelp")} for full test scripts help

`;

const welcomeMessage: string = `
Hello, ${userNameMessage}!
CWD: ${C.yellow(process.cwd())}.
Type  ${C.red("help()")} for ${C.yellow(
  "ScriptPlaygrund"
)} full list of commands.
Available cmds:
  ${C.red(".help")}: nodejs repl commands,
  ${C.red("t")}: run test functions defined in 'customScripts',
  ${C.red("ds")}: dataSource,
  ${C.red("d")}: dependencies,
  ${C.red("e")}: importEntity,
  ${C.red("s")}: importService,
  ${C.red("w")}: importWorker,
`;
const testFnHelpMessage: string = `
- If you pass ${C.red("only one")} function to 'customScripts', call ${C.cyan(
  "'t(...args)'"
)} from REPL.
    Example:
      customScripts: [
        ${C.blue(
          "function"
        )} test(dataSource, importEntity, importService, importWorker, a, b, c) {
          ${C.cyan("console")}${C.yellow(".log")}(${C.cyan("a,b,c")})
          return a
        }
      ]

    Usage:
      node → ${C.cyan("t(1, 2, 3)")}
      ${C.yellow("1 2 3")}

  - If you pass ${C.red(
    "multiple"
  )} functions to 'customScripts', call ${C.cyan("'t(index)(...args)'")}.
    Example:
      customScripts: [
        ${C.blue(
          "function"
        )} test(dataSource, importEntity, importService, importWorker, a, b, c) {
          ${C.cyan("console")}${C.yellow(".log")}(${C.cyan("a,b,c")})
          return a
        },
        ${C.blue(
          "function"
        )} test(dataSource, importEntity, importService, importWorker, a) {
          ${C.cyan("console")}${C.yellow(".log")}(${C.cyan("a")})
          return a
        }
      ]

    Usage:
      node → ${C.cyan("t(1)(4)")}
      ${C.yellow("4")}

  - If you want to run the first function without args, just use ${C.cyan(
    "'.t'"
  )}.
    Example:
      customScripts: [
        ${C.blue(
          "function"
        )} test(dataSource, importEntity, importService, importWorker) {
          ${C.cyan("console")}${C.yellow(".log")}(${C.green('"Hello"')})
        }
      ]

    Usage:
      node → ${C.cyan("'.t'")}
      ${C.green("Hello")}
`;

export { newLineMessage, helpMessage, testFnHelpMessage, welcomeMessage, goodbyeMessage };
