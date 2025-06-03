export type Hero = {
  heroID: number;
  name: string;
  image: string;
  role: string;
};

export type Map = {
  name: string;
  image: string;
  mode: string;
};

export type Match = {
  matchID: number; // Primary key, corresponds to Game.matchID
  map: string; // Matches Game.map
  user1: string; // Matches Game.user1
  result: string; // Matches Game.result
  role: string; // Matches Game.role
  matchups: Matchup[]; // Array of related Matchup records
  game_format: string;
};

export type Matchup = {
  matchupID: number; // Primary key, corresponds to Matchup.matchupID
  heroPlayed: string; // Matches Matchup.heroPlayed
  win: boolean; // Matches Matchup.win
  enemy1: string; // Matches Matchup.enemy1
  enemy2: string; // Matches Matchup.enemy2
  enemy3: string; // Matches Matchup.enemy3
  enemy4: string; // Matches Matchup.enemy4
  enemy5: string; // Matches Matchup.enemy5
  enemy6: string | undefined; // Matches Matchup.enemy6, can be null
  ally1: string; // Matches Matchup.ally1
  ally2: string; // Matches Matchup.ally2
  ally3: string; // Matches Matchup.ally3
  ally4: string; // Matches Matchup.ally4
  ally5: string | undefined; // Matches Matchup.ally5, can be null
  order: number;
  matchID: number; // Foreign key, corresponds to Game.matchID
};

export type GroupMember = {
  groupMemberID: number;
  allyNumber: number;
  role: string;
  gameID: number;
};

export type MatchToSave = {
  result: string;
  role: string;
  map: string;
  matchup: MatchupToSave[];
  game_format: string;
};

export type MatchupToSave = {
  heroPlayed: string;
  win: boolean;
  enemy1: string;
  enemy2: string;
  enemy3: string;
  enemy4: string;
  enemy5: string;
  enemy6: string | undefined;
  ally1: string;
  ally2: string;
  ally3: string;
  ally4: string;
  ally5: string | undefined;
};

export type MatchupWithMaps = {
  matchupID: number;
  heroPlayed: Hero;
  win: boolean;
  enemy1: Hero;
  enemy2: Hero;
  enemy3: Hero;
  enemy4: Hero;
  enemy5: Hero;
  enemy6: Hero | undefined;
  ally1: Hero;
  ally2: Hero;
  ally3: Hero;
  ally4: Hero;
  ally5: Hero | undefined;
  match: Match;
};

export type Display = {
  hero: string;
  wins: number;
  losses: number;
  matchups: MatchupWithMaps[];
};

export type DisplayMap = {
  map: string;
  wins: number;
  losses: number;
  draws: number;
  matchups: MatchupWithMaps[];
};

export type HeroPlayedData = {
  name: string;
  image: string;
  percentagePlayed: number;
  wins: number;
  losses: number;
};
