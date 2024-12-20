import { findAllGames } from "@/lib/API";
import { HeroDataProcessing } from "./HeroDataProcessing";
import { convertNewMatchupToOldType } from "@/functions/convertNewMatchupToOldType";

export default async function HeroDataFetching() {
  const data = await findAllGames();

  if (!data) {
    return <div>Error</div>;
  }

  const converted = convertNewMatchupToOldType(data);

  return <HeroDataProcessing data={converted} />;
}
