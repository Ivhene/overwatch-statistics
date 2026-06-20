"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoryTick } from "../CategoryTick";
import {
  displayByRoleAgainst,
  displayByRoleWith,
} from "@/functions/matchupDisplay";
import { MatchupWithMaps } from "@/lib/types";
import { usePathname } from "next/navigation";
import { CustomTooltip } from "../CustomTooltip";
import { useEffect, useState } from "react";

interface HeroDataDisplayProps {
  data: MatchupWithMaps[];
  role: string;
}

export default function HeroDataDisplay({ data, role }: HeroDataDisplayProps) {
  const path = usePathname();
  const [isLocked, setIsLocked] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    payload?: any[];
    label?: string;
    x?: number;
    y?: number;
  }>({});

  const LockedTooltip = (props: any) => {
    useEffect(() => {
      if (
        !isLocked &&
        props.payload?.length > 0 &&
        props.coordinate?.x !== tooltipData.x
      ) {
        setTooltipData({
          payload: props.payload,
          x: props.coordinate?.x,
          y: props.coordinate?.y,
          label: props.label,
        });
      }
    }, [
      isLocked,
      props.payload,
      props.coordinate?.x,
      props.coordinate?.y,
      props.label,
      tooltipData.x,
    ]);

    return (
      <CustomTooltip
        {...props}
        payload={tooltipData.payload ?? props.payload ?? []}
        label={tooltipData.label ?? props.label}
      />
    );
  };

  const display =
    path === "/mypage/against"
      ? displayByRoleAgainst(role, data)
      : displayByRoleWith(role, data);

  return (
    <div className="w-full h-full bg-main_background pb-2">
      <ResponsiveContainer width="97.5%" height={"100%"}>
        <BarChart
          data={display}
          onClick={() => setIsLocked((locked) => !locked)}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="hero"
            interval={0}
            height={60}
            tick={<CategoryTick />}
          />
          <YAxis />
          <Tooltip
            content={<LockedTooltip />}
            wrapperStyle={{ pointerEvents: "auto" }}
            position={
              isLocked
                ? { x: tooltipData.x ?? 0, y: tooltipData.y ?? 0 }
                : undefined
            }
          />
          <Legend verticalAlign="top" />
          <Bar
            dataKey="wins"
            fill="#33BB33"
            activeBar={<Rectangle fill="green" stroke="green" />}
          />
          <Bar
            dataKey="losses"
            fill="#FF3333"
            activeBar={<Rectangle fill="red" stroke="red" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
