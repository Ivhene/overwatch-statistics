import { findAllGames } from "@/lib/API";
import { MatchesList } from "./MatchesList";
import { Match, Matchup } from "@/lib/types";

export async function MatchesListFetcher() {
  const data = await findAllGames();

  if (!data) {
    return <div>Error</div>;
  }

  const matches: Match[] = data.map((g) => {
    // Normalize the inner `matchups` array:
    const normalizedMatchups: Matchup[] = g.matchups.map((m) => ({
      matchupID: m.matchupID,
      heroPlayed: m.heroPlayed,
      win: m.win,
      enemy1: m.enemy1,
      enemy2: m.enemy2,
      enemy3: m.enemy3,
      enemy4: m.enemy4,
      enemy5: m.enemy5,
      enemy6: m.enemy6 === null ? undefined : m.enemy6,
      ally1: m.ally1,
      ally2: m.ally2,
      ally3: m.ally3,
      ally4: m.ally4,
      ally5: m.ally5 === null ? undefined : m.ally5,
      order: m.order,
      matchID: m.matchID,
    }));

    return {
      matchID: g.matchID,
      map: g.map,
      user1: g.user1,
      result: g.result,
      role: g.role,
      game_format: g.game_format,
      matchups: normalizedMatchups,
    };
  });

  return <MatchesList matches={matches} />;
}
