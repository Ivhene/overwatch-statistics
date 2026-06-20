export function convertTargetToReadableText(target: string) {
  switch (target) {
    case "you":
      return "You";
    case "teamExcludingYou":
      return "Allies";
    case "teamIncludingYou":
      return "Allies (including you)";
    case "enemy":
      return "Enemies";
    case "others":
      return "Other Players";
    case "both":
      return "All";
    default:
      return target;
  }
}
