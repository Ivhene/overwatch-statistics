"use server";

import { PrismaClient } from "@prisma/client";
import { Match, MatchToSave } from "./types";
import { currentUser } from "@clerk/nextjs/server";
import { Heroes, Maps } from "./constants";

let prisma: PrismaClient | undefined;

function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function findAllMaps() {
  return Maps;
}

export async function findMapByName(name: string) {
  return (
    Maps.find((map) => map.name === name) ?? { name: "", image: "", mode: "" }
  );
}

export async function findAllHeroes() {
  return Heroes;
}

export async function findHeroByName(name: string) {
  return (
    Heroes.find((hero) => hero.name === name) ?? {
      heroID: -1,
      name: "",
      image: "",
      role: "",
    }
  );
}

export async function findAllGames() {
  try {
    const user = await currentUser();
    if (!user) {
      // User not authenticated — return empty result rather than using client-only APIs
      return [];
    }

    const db = getPrisma();
    const games = await db.game.findMany({
      include: {
        matchups: true,
      },
      where: { user1: user?.id },
    });

    return games;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function findGame(gameID: number) {
  try {
    const db = getPrisma();
    const game = await db.game.findUnique({
      where: { matchID: gameID },
      include: {
        matchups: true,
      },
    });

    return game;
  } catch (error) {
    console.error(error);
    const game: Match = {
      matchID: -1,
      map: "",
      matchups: [],
      user1: "",
      role: "",
      result: "",
      game_format: "",
    };
    return game;
  }
}

export async function addNewGame(match: MatchToSave) {
  try {
    const role = match.game_format === "5v5" ? match.role : ""; // Not locked to a role in 6v6
    const user = await currentUser();
    const db = getPrisma();
    const savedMatch = await db.game.create({
      data: {
        map: match.map,
        result: match.result,
        role: role,
        user1: user?.id ?? "",
        game_format: match.game_format,
      },
    });

    // Ensure all matchup creations are complete before revalidation
    await Promise.all(
      match.matchup.map(async (m, index) => {
        const res = await db.matchup.create({
          data: {
            heroPlayed: m.heroPlayed,
            win: m.win,
            enemy1: m.enemy1,
            enemy2: m.enemy2,
            enemy3: m.enemy3,
            enemy4: m.enemy4,
            enemy5: m.enemy5,
            enemy6: m.enemy6 ?? null, // Handle undefined as null
            ally1: m.ally1,
            ally2: m.ally2,
            ally3: m.ally3,
            ally4: m.ally4,
            ally5: m.ally5 ?? null, // Handle undefined as null
            order: index,
            matchID: savedMatch.matchID,
          },
        });
        return res;
      })
    );
  } catch (error) {
    console.error("Error adding new game:", error);
  }
}

export async function deleteData() {
  try {
    const data = await findAllGames();
    if (!data) {
      return;
    }
    // Ensure all deletions are complete before revalidation
    await Promise.all(
      data.map(async (match) => {
        const db = getPrisma();
        await Promise.all(
          match.matchups.map(async (matchup) => {
            await db.matchup.delete({
              where: { matchupID: matchup.matchupID },
            });
          })
        );

        await db.game.delete({
          where: { matchID: match.matchID },
        });
      })
    );
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

export async function deleteMatches(matches: Match[]) {
  await Promise.all(
    matches.map(async (match: Match) => {
      const db = getPrisma();
      await Promise.all(
        match.matchups.map(async (matchup) => {
          await db.matchup.delete({
            where: { matchupID: matchup.matchupID },
          });
        })
      );

      await db.game.delete({
        where: { matchID: match.matchID },
      });
    })
  );
}
