"use client";
import { Match, MatchupWithMaps } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { addMatchToMatchup } from "@/functions/addMatchToMatchup";
import {
  selectHero,
  selectMaps,
  selectMapTypes,
} from "@/functions/selectMapper";
import { findMaptypeOfMap } from "@/functions/findMaptypeOfMap";
import { Button } from "../../ui/button";
import { filterByHero } from "@/functions/filterFunctions";
import { changeTarget } from "@/functions/changeTarget";
import { usePathname } from "next/navigation";
import HeroDataDisplay from "./HeroDataDisplay";
import { Label } from "../../ui/label";
import { X } from "lucide-react";

interface HeroDataProps {
  data: MatchupWithMaps[];
}

export function HeroDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectHeroPlayed: "",
    selectMapType: "",
    selectMap: "",
    selectRole: "tank",
    selectTarget: "you",
    selectFormat: "",
  });

  const [matchups, setMatchups] = useState<MatchupWithMaps[]>(data);
  const [displayData, setDisplayData] = useState<MatchupWithMaps[]>(matchups);

  useEffect(() => {
    let filteredMatchups = changeTarget(
      filterStates.selectTarget,
      data,
      filterStates.selectFormat
    );
    setMatchups(filteredMatchups);
    if (filterStates.selectHeroPlayed !== "") {
      filteredMatchups = filterByHero(
        filterStates.selectHeroPlayed,
        filterStates.selectTarget,
        filteredMatchups
      );
    }
    if (filterStates.selectMap !== "") {
      filteredMatchups = filteredMatchups.filter(
        (matchup) => matchup.match.map === filterStates.selectMap
      );
    }
    if (filterStates.selectMapType !== "") {
      filteredMatchups = filteredMatchups.filter(
        (matchup) =>
          findMaptypeOfMap(matchup.match.map) === filterStates.selectMapType
      );
    }
    setDisplayData(filteredMatchups);
  }, [filterStates]);

  const handleClearFilters = () => {
    setFilterStates({
      selectHeroPlayed: "",
      selectMap: "",
      selectMapType: "",
      selectRole: filterStates.selectRole,
      selectTarget: filterStates.selectTarget,
      selectFormat: "",
    });
  };

  const path = usePathname();

  const matches = Array.from(new Set(displayData.map((item) => item.match)));
  const wins = matches.filter((match) => match.result === "win").length;
  const draws = matches.filter((match) => match.result === "draw").length;
  const losses = matches.filter((match) => match.result === "loss").length;

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-fit bg-extra_background p-4">
        <h2 className="pl-2 font-medium text-base md:text-lg text-overwatch_blue_main">
          {path === "/mypage/against"
            ? "Results playing against heroes"
            : "Results playing with heroes"}
        </h2>
        <p className="m-2 border-b-2 border-slate-200 text-xs md:text-sm text-overwatch_gray_main pb-1">
          {path === "/mypage/against"
            ? "Results of matchups when up against each hero. The win bar (green on the left) means that the data target won the matchup against this hero, while loss bar (red on the right) means that the data target lost the matchup against this hero."
            : "Results of matchups when playing with each hero on your team. The win bar (green on the left) means that the data target won the matchup with this hero on your team, while loss bar (red on the right) means that the data target lost the matchup with this hero on your team."}
          {` Data collected from ${matches.length} matches (${wins}W/${draws}D/${losses}L). Win/loss record is personal`}
        </p>
        <div className="w-full h-fit p-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2 lg:h-fit h-full justify-between">
            <Label className="text-overwatch_blue_main">
              Select Data Target
            </Label>
            <Select
              value={filterStates.selectTarget}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectTarget: value,
                }));
              }}
              defaultValue="you"
            >
              <SelectTrigger className="lg:w-36 xl:w-[170px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select target" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                <SelectItem value="you">You</SelectItem>
                <SelectItem value="teamExcludingYou">Allies</SelectItem>
                <SelectItem value="teamIncludingYou">
                  Allies (including you)
                </SelectItem>
                <SelectItem value="enemy">Enemies</SelectItem>
                <SelectItem value="others">Other Players</SelectItem>
                <SelectItem value="both">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:h-fit h-full justify-between">
            <Label className="text-overwatch_blue_main">
              Select Game Format
            </Label>
            <Select
              value={filterStates.selectFormat}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectFormat: value,
                }));
              }}
              defaultValue=""
            >
              <SelectTrigger className="lg:w-36 xl:w-[170px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                <SelectItem value="5v5">5v5</SelectItem>
                <SelectItem value="6v6">6v6</SelectItem>
                <SelectItem value="stadium">Stadium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:h-fit h-full justify-between">
            <Label className="text-overwatch_blue_main">Select Role</Label>
            <Select
              value={filterStates.selectRole}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectRole: value,
                }));
              }}
              defaultValue="tank"
            >
              <SelectTrigger className="lg:w-36 xl:w-[170px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                <SelectItem value="tank">Tank</SelectItem>
                <SelectItem value="damage">Damage</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:h-fit h-full justify-between">
            <Label className="text-overwatch_blue_main">Select Hero</Label>
            <Select
              value={filterStates.selectHeroPlayed}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectHeroPlayed: value,
                }));
              }}
            >
              <SelectTrigger className="lg:w-36 xl:w-[170px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select hero played" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                {selectHero("", matchups)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:h-fit h-full justify-between">
            <Label className="text-overwatch_blue_main">Select Map Type</Label>
            <Select
              value={filterStates.selectMapType}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectMap: "",
                  selectMapType: value,
                }));
              }}
            >
              <SelectTrigger className="lg:w-36 xl:w-[170px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select map types" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                {selectMapTypes()}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:h-fit h-full justify-between">
            <Label className="text-overwatch_blue_main">Select Map</Label>
            <Select
              value={filterStates.selectMap}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectMap: value,
                }));
              }}
            >
              <SelectTrigger className="lg:w-36 xl:w-[170px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select map" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                {selectMaps(filterStates.selectMapType, matches)}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="mb-0 mt-auto lg:w-36 xl:w-[170px] gap-1 bg-overwatch_blue_main"
            onClick={handleClearFilters}
          >
            <X /> Clear Filters
          </Button>
        </div>
      </div>
      <HeroDataDisplay data={displayData} role={filterStates.selectRole} />
    </div>
  );
}
