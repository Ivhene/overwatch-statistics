"use client";

import { convertHeroPlayedData } from "@/functions/matchDataMapper";
import { Heroes } from "@/lib/constants";
import { HeroPlayedData, Matchup, MatchupWithMaps } from "@/lib/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

export function CustomTooltip(props: any) {
  const path = usePathname();

  let dataCount = 0;
  props.payload.forEach((prop: any) => (dataCount += prop.value));

  if (dataCount === 0) {
    return null;
  }

  let matchups: MatchupWithMaps[] = props.payload[0].payload.matchups;

  const matchupWithoutMap: Matchup[] = matchups.map((matchup, index) => {
    return {
      matchID: matchup.matchupID,
      heroPlayed: matchup.heroPlayed.name,
      matchupID: matchup.matchupID,
      win: matchup.win,
      ally1: matchup.ally1.name,
      ally2: matchup.ally2.name,
      ally3: matchup.ally3.name,
      ally4: matchup.ally4.name,
      ally5: matchup.ally5 ? matchup.ally5.name : undefined,
      enemy1: matchup.enemy1.name,
      enemy2: matchup.enemy2.name,
      enemy3: matchup.enemy3.name,
      enemy4: matchup.enemy4.name,
      enemy5: matchup.enemy5.name,
      enemy6: matchup.enemy6 ? matchup.enemy6.name : undefined,
      order: index,
    };
  });

  const matches = matchups
    .map((matchup) => matchup.match.matchID)
    .filter((matchID, index, self) => self.indexOf(matchID) === index); // gets rid of duplicates

  const heroPlayedData = convertHeroPlayedData(matchupWithoutMap);

  let heroPlayedDataRowed: HeroPlayedData[][] = [];

  const rowSize = 6;

  for (let i = 0; i < Math.ceil(heroPlayedData.length / 6); i++) {
    heroPlayedDataRowed[i] = []; // Initialize the row as an empty array
    for (let j = 0; j < rowSize; j++) {
      if (i * rowSize + j >= heroPlayedData.length) {
        break;
      }
      heroPlayedDataRowed[i][j] = heroPlayedData[i * rowSize + j];
    }
  }

  return (
    <div key={props.label} className="bg-white flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="">
          {path === "/mypage/maps" ? (
            <React.Fragment>
              <h2>Map</h2>
              <Image
                alt="Image of map"
                width={70}
                height={70}
                src={props.label}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Hero</h2>
              <Image
                alt="Image of hero"
                width={35}
                height={35}
                src={props.label}
              />
            </React.Fragment>
          )}
        </div>
        <div className="">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            Heroes played ({heroPlayedData.length})
          </h2>
          {heroPlayedDataRowed.map((row, index) => {
            return (
              <div
                key={index}
                className={cn(`flex flex-row gap-4 justify-center`)}
              >
                {row.map((data, index) => (
                  <div key={index} className="text-center">
                    <Image
                      src={data.image}
                      alt={`image of ${data.name}`}
                      width={35}
                      height={35}
                    />
                    <p>{data.percentagePlayed.toFixed(1)}%</p>
                    <p>
                      <span className="text-green-400">{data.wins}</span>/
                      <span className="text-enemy_color">{data.losses}</span>
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {path === "/mypage/maps" ? null : <div>Other heroes against/with</div>}
      {path === "/mypage/maps" ? null : (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            From matches
          </h2>
          <div className="flex flex-row gap-4 justify-center w-full">
            {matches.map((match, index) => (
              <p key={index}>[{match}]</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
