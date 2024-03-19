export class Colorizer {
  static applyColor(colorCode, text) {
    return `\x1b[${colorCode}m${text}\x1b[0m`;
  }

  static red = (text) => Colorizer.applyColor(31, text);
  static green = (text) => Colorizer.applyColor(32, text);
  static yellow = (text) => Colorizer.applyColor(33, text);
  static blue = (text) => Colorizer.applyColor(34, text);
  static magenta = (text) => Colorizer.applyColor(35, text);
  static cyan = (text) => Colorizer.applyColor(36, text);
}
