import { Heroes, Maps } from "@/lib/constants";
import {
  Display,
  DisplayMap,
  Match,
  Matchup,
  MatchupWithMaps,
} from "@/lib/types";
import {
  addMatchToMatchup,
  addMatchToMatchupSingle,
} from "./addMatchToMatchup";

export function displayByRoleAgainst(
  role: string,
  matchups: MatchupWithMaps[]
) {
  let heroes = Heroes;
  if (role !== "") {
    heroes = Heroes.filter((hero) => hero.role === role);
  }

  let display: Display[] = [];

  heroes.forEach((hero) => {
    let wins = 0,
      losses = 0,
      heroMatchups: MatchupWithMaps[] = [];

    matchups.forEach((matchup) => {
      if (
        matchup.enemy1.name === hero.name ||
        matchup.enemy2.name === hero.name ||
        matchup.enemy3.name === hero.name ||
        matchup.enemy4.name === hero.name ||
        matchup.enemy5.name === hero.name ||
        (matchup.enemy6 && matchup.enemy6.name === hero.name)
      ) {
        matchup.win ? wins++ : losses++;
        heroMatchups.push(matchup);
      }
    });
    display.push({
      hero: hero.image,
      wins: wins,
      losses: losses,
      matchups: heroMatchups,
    });
  });

  return display;
}

export function displayByRoleWith(role: string, matchups: MatchupWithMaps[]) {
  let heroes = Heroes;
  if (role !== "") {
    heroes = Heroes.filter((hero) => hero.role === role);
  }

  let display: Display[] = [];

  heroes.forEach((hero) => {
    let wins = 0,
      losses = 0,
      heroMatchups: MatchupWithMaps[] = [];

    matchups.forEach((matchup) => {
      if (
        matchup.ally1.name === hero.name ||
        matchup.ally2.name === hero.name ||
        matchup.ally3.name === hero.name ||
        matchup.ally4.name === hero.name ||
        (matchup.ally5 && matchup.ally5.name === hero.name)
      ) {
        matchup.win ? wins++ : losses++;
        heroMatchups.push(matchup);
      }
    });
    display.push({
      hero: hero.image,
      wins: wins,
      losses: losses,
      matchups: heroMatchups,
    });
  });

  return display;
}

export function displayMaps(maptype: string, role: string, matches: Match[]) {
  let maps = Maps;
  if (maptype !== "") {
    maps = Maps.filter((map) => map.mode === maptype);
  }

  let display: DisplayMap[] = [];

  maps.forEach((map) => {
    let wins = 0,
      losses = 0,
      draws = 0,
      matchups: MatchupWithMaps[] = [];

    matches.forEach((match) => {
      if (match.map === map.name) {
        match.result === "win"
          ? wins++
          : match.result === "loss"
          ? losses++
          : draws++;
        matchups = [...matchups, ...addMatchToMatchupSingle(match)];
      }
    });
    display.push({
      map: map.image,
      wins: wins,
      losses: losses,
      draws: draws,
      matchups: matchups,
    });
  });

  return display;
}
