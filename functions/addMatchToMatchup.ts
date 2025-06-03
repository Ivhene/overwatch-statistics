import { findAllGames } from "@/lib/API";
import { Hero, Match, Matchup, MatchupWithMaps } from "@/lib/types";
import { findHeroByName } from "./findNonAsync";

export function addMatchToMatchup(matches: Match[]) {
  let matchups: MatchupWithMaps[] = [];

  matches.forEach((match) =>
    match.matchups.forEach(async (matchup) => {
      matchups.push({
        matchupID: matchup.matchupID,
        heroPlayed: findHeroByName(matchup.heroPlayed),
        win: matchup.win,
        ally1: findHeroByName(matchup.ally1),
        ally2: findHeroByName(matchup.ally2),
        ally3: findHeroByName(matchup.ally3),
        ally4: findHeroByName(matchup.ally4),
        ally5:
          match.game_format === "6v6"
            ? findHeroByName(matchup.ally5)
            : undefined,
        enemy1: findHeroByName(matchup.enemy1),
        enemy2: findHeroByName(matchup.enemy2),
        enemy3: findHeroByName(matchup.enemy3),
        enemy4: findHeroByName(matchup.enemy4),
        enemy5: findHeroByName(matchup.enemy5),
        enemy6:
          match.game_format === "6v6"
            ? findHeroByName(matchup.enemy6)
            : undefined,
        match: match,
      });
    })
  );

  return matchups;
}

export function addMatchToMatchupSingle(match: Match) {
  let matchups: MatchupWithMaps[] = [];

  match.matchups.forEach(async (matchup) => {
    matchups.push({
      matchupID: matchup.matchupID,
      heroPlayed: findHeroByName(matchup.heroPlayed),
      win: matchup.win,
      ally1: findHeroByName(matchup.ally1),
      ally2: findHeroByName(matchup.ally2),
      ally3: findHeroByName(matchup.ally3),
      ally4: findHeroByName(matchup.ally4),
      ally5:
        match.game_format === "6v6" ? findHeroByName(matchup.ally5) : undefined,
      enemy1: findHeroByName(matchup.enemy1),
      enemy2: findHeroByName(matchup.enemy2),
      enemy3: findHeroByName(matchup.enemy3),
      enemy4: findHeroByName(matchup.enemy4),
      enemy5: findHeroByName(matchup.enemy5),
      enemy6:
        match.game_format === "6v6"
          ? findHeroByName(matchup.enemy6)
          : undefined,
      match: match,
    });
  });

  return matchups;
}

export async function addMatchToMatchups(
  matchups: Matchup[]
): Promise<MatchupWithMaps[]> {
  // 1) Fetch all games once.
  const games = await findAllGames();

  // 2) Build a Map<matchID, Match> where every Match.matchups has been normalized
  const gameById = new Map<number, Match>();

  if (games) {
    for (const rawGame of games) {
      // Normalize the rawGame.matchups array so that `null` → `undefined` on ally5/enemy6.
      const normalizedMatchups: Matchup[] = rawGame.matchups.map((m) => ({
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

      const normalizedGame: Match = {
        matchID: rawGame.matchID,
        map: rawGame.map,
        user1: rawGame.user1,
        result: rawGame.result,
        role: rawGame.role,
        game_format: rawGame.game_format, // ← don’t forget this field
        matchups: normalizedMatchups,
      };

      gameById.set(rawGame.matchID, normalizedGame);
    }
  }

  // 3) Build the final array in one pass over `matchups`
  const result: MatchupWithMaps[] = matchups.map((mu) => {
    // Look up the normalized Match in O(1). If none exists, fall back to an “empty” Match.
    const matched = gameById.get(mu.matchID) ?? {
      matchID: -1,
      map: "",
      user1: "",
      result: "",
      role: "",
      game_format: "",
      matchups: [],
    };

    // Convert each hero‐string → Hero
    const normalizeHero = (name: string | undefined): Hero | undefined =>
      name ? findHeroByName(name) : undefined;

    return {
      matchupID: mu.matchupID,
      heroPlayed: findHeroByName(mu.heroPlayed),
      win: mu.win,
      ally1: findHeroByName(mu.ally1),
      ally2: findHeroByName(mu.ally2),
      ally3: findHeroByName(mu.ally3),
      ally4: findHeroByName(mu.ally4),
      ally5: normalizeHero(mu.ally5),
      enemy1: findHeroByName(mu.enemy1),
      enemy2: findHeroByName(mu.enemy2),
      enemy3: findHeroByName(mu.enemy3),
      enemy4: findHeroByName(mu.enemy4),
      enemy5: findHeroByName(mu.enemy5),
      enemy6: normalizeHero(mu.enemy6),
      match: matched,
    };
  });

  return result;
}
