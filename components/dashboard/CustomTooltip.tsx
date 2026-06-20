"use client";

import { MatchupWithMaps } from "@/lib/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Heroes, Maps } from "@/lib/constants";
import { convertTargetToReadableText } from "@/functions/convertDataToText";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function CustomTooltip(props: any) {
  // Get target from props
  const target = props.target ?? "you";

  // Check what tooltip is for based on the pathname
  const path = usePathname();
  const isMapTooltip = path === "/mypage/maps";

  // Get the route to allow for redirects
  const router = useRouter();

  // If there is no data, return nothing
  let dataCount = 0;
  props.payload.forEach((prop: any) => (dataCount += prop.value));

  if (dataCount === 0) {
    return null;
  }

  // Get the matchups from the props payload
  let matchups: MatchupWithMaps[] = props.payload[0].payload.matchups;
  const targetText = convertTargetToReadableText(target);

  // Gather the unique matches from the matchups to allow for linking to the match page
  const matches = matchups
    .map((matchup) => matchup.match)
    .filter((match, index, self) => self.indexOf(match) === index);

  // Gather the match results for the tooltip
  let matchResults: { wins: number; losses: number; draws: number } = {
    wins: matches.filter((match) => match.result === "win").length,
    losses: matches.filter((match) => match.result === "loss").length,
    draws: matches.filter((match) => match.result === "draw").length,
  };

  // Find the hero data for the hero being hovered over
  const hero = Heroes.find(
    (hero) => hero.image === props.payload[0].payload.hero,
  ) ?? {
    heroID: 0,
    name: "Unknown Hero",
    image: props.payload[0].payload.hero,
    role: "unknown",
  };

  const map = Maps.find(
    (map) => map.image === props.payload[0].payload.map,
  ) ?? {
    mapID: 0,
    name: "Unknown Map",
    image: props.payload[0].payload.map,
  };

  // Build per-hero win/loss counts from the hovered matchup list
  const targetHeroesPlayed = Heroes.map((hero) => {
    const heroMatchups = matchups.filter(
      (matchup) => matchup.heroPlayed.name === hero.name,
    );
    const wins = heroMatchups.filter((matchup) => matchup.win).length;

    return {
      ...hero,
      wins,
      losses: heroMatchups.length - wins,
    };
  }).filter((hero) => hero.wins > 0 || hero.losses > 0);

  // Build per-hero counts for allies (ally1-5)
  const allyHeroesPlayed = Heroes.map((hero) => {
    const heroMatchups = matchups.filter((matchup) => {
      return [
        matchup.ally1,
        matchup.ally2,
        matchup.ally3,
        matchup.ally4,
        matchup.ally5,
      ].some((ally) => ally && ally.name === hero.name);
    });
    const wins = heroMatchups.filter((m) => m.win).length;
    return {
      ...hero,
      wins,
      losses: heroMatchups.length - wins,
    };
  }).filter((h) => h.wins > 0 || h.losses > 0);

  // Build per-hero counts for enemies (enemy1-6)
  const enemyHeroesPlayed = Heroes.map((hero) => {
    const heroMatchups = matchups.filter((matchup) => {
      return [
        matchup.enemy1,
        matchup.enemy2,
        matchup.enemy3,
        matchup.enemy4,
        matchup.enemy5,
        matchup.enemy6,
      ].some((enemy) => enemy && enemy.name === hero.name);
    });
    const wins = heroMatchups.filter((m) => m.win).length;
    return {
      ...hero,
      wins,
      losses: heroMatchups.length - wins,
    };
  }).filter((h) => h.wins > 0 || h.losses > 0);

  return (
    <div
      key={props.label}
      className="bg-extra_background flex flex-col gap-4 max-h-82 overflow-y-auto shadow-lg"
    >
      <div className="bg-overwatch_blue_main text-white p-2 flex flex-row gap-2 text-center justify-center items-center">
        <Image
          src={isMapTooltip ? map.image : hero.image}
          width={32}
          height={32}
          alt="Hero"
        />
        <h3 className="font-bold">
          {isMapTooltip
            ? `Detailed stats for matchups on ${map.name}`
            : `Detailed stats for matchups against ${hero.name}`}
        </h3>
      </div>

      <div className="flex flex-col gap-4 p-2">
        <h3 className="font-semibold text-overwatch_blue_main">
          {isMapTooltip
            ? `Heroes played by you on ${map.name}`
            : `Heroes played by ${targetText}`}
        </h3>
        <div className="grid grid-cols-8 gap-4">
          {targetHeroesPlayed.map((hero) => (
            <div key={hero.heroID} className="flex flex-col items-center gap-1">
              <Image src={hero.image} width={32} height={32} alt="Hero" />
              <div className="text-sm">
                <span className="text-green-400">{hero.wins}W</span>/
                <span className="text-enemy_color">{hero.losses}L</span> (
                {Math.round(
                  (hero.wins / (hero.wins + hero.losses)) * 100 * 10,
                ) / 10}
                %)
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2">
        <h3 className="font-semibold text-overwatch_blue_main">
          {isMapTooltip
            ? `Heroes on the same team as you on ${map.name}`
            : `Heroes on the same team as ${targetText}`}
        </h3>
        <div className="grid grid-cols-8 gap-4">
          {allyHeroesPlayed.map((hero) => (
            <div
              key={`ally-${hero.heroID}`}
              className="flex flex-col items-center gap-1"
            >
              <Image src={hero.image} width={32} height={32} alt="Hero" />
              <div className="text-sm">
                <span className="text-green-400">{hero.wins}W</span>/
                <span className="text-enemy_color">{hero.losses}L</span> (
                {Math.round(
                  (hero.wins / (hero.wins + hero.losses)) * 100 * 10,
                ) / 10}
                %)
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2">
        <h3 className="font-semibold text-overwatch_blue_main">
          {isMapTooltip
            ? `Heroes on the enemy team against you on ${map.name}`
            : `Heroes on {hero.name}s team`}
        </h3>
        <div className="grid grid-cols-8 gap-4">
          {enemyHeroesPlayed.map((hero) => (
            <div
              key={`enemy-${hero.heroID}`}
              className="flex flex-col items-center gap-1"
            >
              <Image src={hero.image} width={32} height={32} alt="Hero" />
              <div className="text-sm">
                <span className="text-green-400">{hero.wins}W</span>/
                <span className="text-enemy_color">{hero.losses}L</span> (
                {Math.round(
                  (hero.wins / (hero.wins + hero.losses)) * 100 * 10,
                ) / 10}
                %)
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-overwatch_blue_main">
          Data was collected from {matches.length} matches{" "}
          {`(${matchResults.wins}W/${matchResults.draws}D/${matchResults.losses}L, ${
            Math.round((matchResults.wins / matches.length) * 100 * 10) / 10
          }% win rate)`}
        </h3>
        <div className="flex flex-col w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MatchID</TableHead>
                <TableHead>Map</TableHead>
                <TableHead>Game Format</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow
                  key={match.matchID}
                  onClick={() =>
                    router.push(`/mypage/matches/${match.matchID}`)
                  }
                  className="cursor-pointer hover:bg-slate-200"
                >
                  <TableCell>{match.matchID}</TableCell>
                  <TableCell>{match.map}</TableCell>
                  <TableCell>{match.game_format}</TableCell>
                  <TableCell>{match.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
