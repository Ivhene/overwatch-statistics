import { MatchupWithMaps } from "@/lib/types";

export function changeTarget(
  target: string,
  matchups: MatchupWithMaps[],
  format: string
): MatchupWithMaps[] {
  matchups =
    format !== ""
      ? matchups.filter((matchup) => matchup.match.game_format === format)
      : matchups;
  if (target === "you") return matchups;

  if (target === "others") return findOthers(matchups);

  if (target === "teamIncludingYou") return findTeam(matchups, true);

  if (target === "teamExcludingYou") return findTeam(matchups, false);

  if (target === "enemy") return findEnemyTeam(matchups);

  return [...matchups, ...findOthers(matchups)];
}

function findTeam(matchups: MatchupWithMaps[], includeYou: boolean) {
  let newMatchups: MatchupWithMaps[] = [];

  matchups.forEach((matchup) => {
    if (includeYou) newMatchups.push(matchup);
    newMatchups.push(addAlly1(matchup));
    newMatchups.push(addAlly2(matchup));
    newMatchups.push(addAlly3(matchup));
    newMatchups.push(addAlly4(matchup));
    if (matchup.match.game_format === "6v6") {
      newMatchups.push(addAlly5(matchup));
    }
  });

  return newMatchups;
}

function findEnemyTeam(matchups: MatchupWithMaps[]) {
  let newMatchups: MatchupWithMaps[] = [];

  matchups.forEach((matchup) => {
    newMatchups.push(addEnemy1(matchup));
    newMatchups.push(addEnemy2(matchup));
    newMatchups.push(addEnemy3(matchup));
    newMatchups.push(addEnemy4(matchup));
    newMatchups.push(addEnemy5(matchup));
    if (matchup.match.game_format === "6v6") {
      newMatchups.push(addEnemy6(matchup));
    }
  });

  return newMatchups;
}

function findOthers(matchups: MatchupWithMaps[]) {
  let newMatchups: MatchupWithMaps[] = [];

  matchups.forEach((matchup) => {
    newMatchups.push(addAlly1(matchup));
    newMatchups.push(addAlly2(matchup));
    newMatchups.push(addAlly3(matchup));
    newMatchups.push(addAlly4(matchup));
    if (matchup.match.game_format === "6v6") {
      newMatchups.push(addAlly5(matchup));
    }
    newMatchups.push(addEnemy1(matchup));
    newMatchups.push(addEnemy2(matchup));
    newMatchups.push(addEnemy3(matchup));
    newMatchups.push(addEnemy4(matchup));
    newMatchups.push(addEnemy5(matchup));
    if (matchup.match.game_format === "6v6") {
      newMatchups.push(addEnemy6(matchup));
    }
  });

  return newMatchups;
}

function addAlly1(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally1,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    // retain optional enemy6 if present
    enemy6: matchup.enemy6,
    ally1: matchup.heroPlayed,
    ally2: matchup.ally2,
    ally3: matchup.ally3,
    ally4: matchup.ally4,
    ally5: matchup.ally5,
    match: matchup.match,
  };
}

function addAlly2(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally2,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    enemy6: matchup.enemy6,
    ally1: matchup.ally1,
    ally2: matchup.heroPlayed,
    ally3: matchup.ally3,
    ally4: matchup.ally4,
    ally5: matchup.ally5,
    match: matchup.match,
  };
}

function addAlly3(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally3,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    enemy6: matchup.enemy6,
    ally1: matchup.ally1,
    ally2: matchup.ally2,
    ally3: matchup.heroPlayed,
    ally4: matchup.ally4,
    ally5: matchup.ally5,
    match: matchup.match,
  };
}

function addAlly4(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally4,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    enemy6: matchup.enemy6,
    ally1: matchup.ally1,
    ally2: matchup.ally2,
    ally3: matchup.ally3,
    ally4: matchup.heroPlayed,
    ally5: matchup.ally5,
    match: matchup.match,
  };
}

function addAlly5(matchup: MatchupWithMaps): MatchupWithMaps {
  // Only call this if matchup.ally5 is defined.
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.ally5!,
    win: matchup.win,
    enemy1: matchup.enemy1,
    enemy2: matchup.enemy2,
    enemy3: matchup.enemy3,
    enemy4: matchup.enemy4,
    enemy5: matchup.enemy5,
    enemy6: matchup.enemy6,
    ally1: matchup.ally1,
    ally2: matchup.ally2,
    ally3: matchup.ally3,
    ally4: matchup.ally4,
    // Swap heroPlayed with ally5 as in the other functions
    ally5: matchup.heroPlayed,
    match: matchup.match,
  };
}

function addEnemy1(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy1,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    enemy6: matchup.ally5,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    // retain optional ally5 if present
    ally5: matchup.enemy6,
    match: matchup.match,
  };
}

function addEnemy2(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy2,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    enemy6: matchup.ally5,
    ally1: matchup.enemy1,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    ally5: matchup.enemy6,
    match: matchup.match,
  };
}

function addEnemy3(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy3,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    enemy6: matchup.ally5,
    ally1: matchup.enemy2,
    ally2: matchup.enemy1,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    ally5: matchup.enemy6,
    match: matchup.match,
  };
}

function addEnemy4(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy4,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    enemy6: matchup.ally5,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy1,
    ally4: matchup.enemy5,
    ally5: matchup.enemy6,
    match: matchup.match,
  };
}

function addEnemy5(matchup: MatchupWithMaps): MatchupWithMaps {
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy5,
    win: !matchup.win,
    enemy1: matchup.heroPlayed,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    enemy6: matchup.ally5,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy1,
    ally5: matchup.enemy6,
    match: matchup.match,
  };
}

function addEnemy6(matchup: MatchupWithMaps): MatchupWithMaps {
  // Only call this if matchup.enemy6 is defined.
  return {
    matchupID: matchup.matchupID,
    heroPlayed: matchup.enemy6!,
    win: !matchup.win,
    enemy1: matchup.ally5!,
    enemy2: matchup.ally1,
    enemy3: matchup.ally2,
    enemy4: matchup.ally3,
    enemy5: matchup.ally4,
    // Swap enemy6 with heroPlayed similar to the ally functions:
    enemy6: matchup.heroPlayed,
    ally1: matchup.enemy2,
    ally2: matchup.enemy3,
    ally3: matchup.enemy4,
    ally4: matchup.enemy5,
    ally5: matchup.enemy6,
    match: matchup.match,
  };
}
