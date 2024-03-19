import {
  newLineMessage,
  helpMessage,
  testFnHelpMessage,
  welcomeMessage,
  goodbyeMessage,
} from "./messages";

export class Print {
  static say = (message) => () => console.log(message);

  static help = Print.say(helpMessage);
  static testFnHelp = Print.say(testFnHelpMessage);
  static welcome = Print.say(welcomeMessage);
  static goodbye = Print.say(goodbyeMessage);

  static noDataSourceProvided = Print.say("No datasource provided, skipping database connection...")
  static connectingToDB = Print.say("Connecting to the database...")
  static connectedToDB = Print.say("Connected to the database.")
}
export { newLineMessage };
