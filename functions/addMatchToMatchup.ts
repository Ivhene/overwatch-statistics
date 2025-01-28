import { findAllGames, findHeroByName } from "@/lib/API";
import { Match, Matchup, MatchupWithMaps } from "@/lib/types";

export function addMatchToMatchup(matches: Match[]) {
  let matchups: MatchupWithMaps[] = [];

  matches.forEach((match) =>
    match.matchups.forEach(async (matchup) => {
      matchups.push({
        matchupID: matchup.matchupID,
        heroPlayed: await findHeroByName(matchup.heroPlayed),
        win: matchup.win,
        ally1: await findHeroByName(matchup.ally1),
        ally2: await findHeroByName(matchup.ally2),
        ally3: await findHeroByName(matchup.ally3),
        ally4: await findHeroByName(matchup.ally4),
        enemy1: await findHeroByName(matchup.enemy1),
        enemy2: await findHeroByName(matchup.enemy2),
        enemy3: await findHeroByName(matchup.enemy3),
        enemy4: await findHeroByName(matchup.enemy4),
        enemy5: await findHeroByName(matchup.enemy5),
        match: match,
      });
    })
  );

  return matchups;
}

export async function addMatchToMatchups(matchups: Matchup[]) {
  let matchupsWithMatch: MatchupWithMaps[] = [];
  const games = await findAllGames();

  matchups.forEach(async (matchup) => {
    matchupsWithMatch.push({
      matchupID: matchup.matchupID,
      heroPlayed: await findHeroByName(matchup.heroPlayed),
      win: matchup.win,
      ally1: await findHeroByName(matchup.ally1),
      ally2: await findHeroByName(matchup.ally2),
      ally3: await findHeroByName(matchup.ally3),
      ally4: await findHeroByName(matchup.ally4),
      enemy1: await findHeroByName(matchup.enemy1),
      enemy2: await findHeroByName(matchup.enemy2),
      enemy3: await findHeroByName(matchup.enemy3),
      enemy4: await findHeroByName(matchup.enemy4),
      enemy5: await findHeroByName(matchup.enemy5),
      match: games?.find((match) => match.matchID === matchup.matchID) ?? {
        matchID: -1,
        map: "",
        matchups: [],
        result: "",
        user1: "",
        role: "",
      },
    });
  });

  return matchupsWithMatch;
}
