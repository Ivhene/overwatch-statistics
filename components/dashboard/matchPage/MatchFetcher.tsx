import { findGame, findMapByName } from "@/lib/API";
import { MatchDisplay } from "./MatchDisplay";
import type { Match, Matchup } from "@/lib/types";

interface MatchFetcherProps {
  matchID: number;
}

export async function MatchFetcher({ matchID }: MatchFetcherProps) {
  const raw = await findGame(matchID);
  if (!raw) {
    return <div>Match does not exist or you do not have access to it</div>;
  }

  const normalizedMatchups: Matchup[] = raw.matchups
    .map((m) => ({
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
    }))
    .sort((a, b) => a.order - b.order);

  const normalizedMatch: Match = {
    matchID: raw.matchID,
    map: raw.map,
    user1: raw.user1,
    result: raw.result,
    role: raw.role,
    game_format: raw.game_format,
    matchups: normalizedMatchups,
  };

  const map = await findMapByName(normalizedMatch.map);

  return <MatchDisplay match={normalizedMatch} map={map} />;
}
