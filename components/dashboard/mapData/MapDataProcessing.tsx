"use client";
import { Match } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { selectMapTypes } from "@/functions/selectMapper";
import { findMaptypeOfMap } from "@/functions/findMaptypeOfMap";
import { Button } from "../../ui/button";
import MapDataDisplay from "./MapDataDisplay";
import { Label } from "../../ui/label";
import { X } from "lucide-react";

interface HeroDataProps {
  data: Match[];
}

export function MapDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectMapType: "control",
    selectRole: "",
    selectFormat: "",
  });

  const [displayData, setDisplayData] = useState<Match[]>(data);

  useEffect(() => {
    let matches = data;
    if (filterStates.selectFormat !== "") {
      matches = matches.filter(
        (match) => match.game_format === filterStates.selectFormat
      );
    }
    if (filterStates.selectMapType !== "") {
      matches = matches.filter(
        (match) => findMaptypeOfMap(match.map) === filterStates.selectMapType
      );
    }
    if (filterStates.selectRole !== "") {
      matches = matches.filter(
        (match) => match.role === filterStates.selectRole
      );
    }
    setDisplayData(matches);
  }, [filterStates]);

  const handleClearFilters = () => {
    setFilterStates({
      selectMapType: filterStates.selectMapType,
      selectRole: "",
      selectFormat: "",
    });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-fit bg-extra_background p-4">
        <h2 className="pl-2 font-medium text-lg text-overwatch_blue_main">
          Results on maps
        </h2>
        <p className="m-2 border-b-2 border-slate-200 text-sm text-overwatch_gray_main pb-1">
          Result of matches played on a map. The win bar (green on the left)
          means you won the match on this map. The draw bar (yellow in the
          middle) means you drew the match on this map. The loss bar (red on the
          right) means you lost the match on this map.
        </p>
        <div className="w-full h-fit p-2 flex gap-4">
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
          <div className="flex flex-col gap-2">
            <Label className="text-overwatch_blue_main">Select Role</Label>
            <Select
              value={filterStates.selectRole}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectRole: value,
                }));
              }}
            >
              <SelectTrigger className="lg:w-36 xl:w-[180px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                <SelectItem value="tank">Tank</SelectItem>
                <SelectItem value="damage">Damage</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-overwatch_blue_main">Select Map Type</Label>
            <Select
              value={filterStates.selectMapType}
              onValueChange={(value) => {
                setFilterStates((prev) => ({
                  ...prev,
                  selectMapType: value,
                }));
              }}
            >
              <SelectTrigger className="lg:w-36 xl:w-[180px] text-overwatch_gray_main bg-main_background">
                <SelectValue placeholder="Select map types" />
              </SelectTrigger>
              <SelectContent className="max-h-72 text-overwatch_gray_main">
                {selectMapTypes()}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="mb-0 mt-auto lg:w-36 xl:w-[180px] gap-1 bg-overwatch_blue_main hover:bg-overwatch_gray_main active:bg-overwatch_blue_main"
            onClick={handleClearFilters}
          >
            <X /> Clear Filters
          </Button>
        </div>
      </div>
      <MapDataDisplay
        data={displayData}
        role={filterStates.selectRole}
        maptype={filterStates.selectMapType}
      />
    </div>
  );
}
