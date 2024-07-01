"use client";
import { Match, MatchupWithMaps } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addMatchToMatchup } from "@/functions/addMatchToMatchup";
import {
  selectHero,
  selectMaps,
  selectMapTypes,
} from "@/functions/selectMapper";
import { findMaptypeOfMap } from "@/functions/findMaptypeOfMap";
import { Button } from "../ui/button";
import { filterByHero } from "@/functions/filterFunctions";
import { changeTarget } from "@/functions/changeTarget";
import { usePathname } from "next/navigation";
import HeroDataDisplay from "./HeroDataDisplay";
import { Label } from "../ui/label";

interface HeroDataProps {
  data: Match[];
}

export function HeroDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectHeroPlayed: "",
    selectMapType: "",
    selectMap: "",
    selectRole: "tank",
    selectTarget: "you",
  });

  let matchups: MatchupWithMaps[] = addMatchToMatchup(data);

  const [displayData, setDisplayData] = useState<MatchupWithMaps[]>(matchups);

  useEffect(() => {
    let filteredMatchups = changeTarget(filterStates.selectTarget, matchups);
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
    });
  };

  const path = usePathname();

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-fit bg-slate-100 p-4">
        <h2 className="pl-2 font-medium text-lg text-slate-700">
          {path === "/dashboard/against"
            ? "Results playing against heroes"
            : "Results playing with heroes"}
        </h2>
        <p className="m-2 border-b-2 border-slate-200 text-sm text-slate-500 pb-1">
          {path === "/dashboard/against"
            ? "Results of matchups when up against each hero. The win bar (green on the left) means that you won the matchup against this hero, while loss bar (red on the right) means that you lost the matchup against this hero"
            : "Results of matchups when playing with each hero on your team. The win bar (green on the left) means that you won the matchup with this hero on your team, while loss bar (red on the right) means that you lost the matchup with this hero on your team"}
        </p>
        <div className="w-full h-fit p-2 flex gap-4">
          <div className="flex flex-col gap-2">
            <Label>Select Data Target</Label>
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select target" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                <SelectItem value="you">You</SelectItem>
                <SelectItem value="others">Other Players</SelectItem>
                <SelectItem value="both">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select Role</Label>
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                <SelectItem value="tank">Tank</SelectItem>
                <SelectItem value="damage">Damage</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select Hero</Label>
            <Select
              value={filterStates.selectHeroPlayed}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectHeroPlayed: value,
                }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select hero played" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {selectHero("")}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select Map Type</Label>
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select map types" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {selectMapTypes()}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select Map</Label>
            <Select
              value={filterStates.selectMap}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectMap: value,
                }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select map" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {selectMaps(filterStates.selectMapType)}
              </SelectContent>
            </Select>
          </div>
          <Button className="mb-0 mt-auto" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
      <HeroDataDisplay data={displayData} role={filterStates.selectRole} />
    </div>
  );
}
