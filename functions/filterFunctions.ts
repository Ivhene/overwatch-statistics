import { findAllHeroes } from "@/lib/API";
import { MatchupWithMaps } from "@/lib/types";

export function filterByHero(
  hero: string,
  target: string,
  matchups: MatchupWithMaps[]
) {
  return (matchups = matchups.filter(
    (matchup) => matchup.heroPlayed.name === hero
  ));
}
