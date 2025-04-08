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

interface HeroDataDisplayProps {
  data: MatchupWithMaps[];
  role: string;
}

export default function HeroDataDisplay({ data, role }: HeroDataDisplayProps) {
  const path = usePathname();
  const display =
    path === "/mypage/against"
      ? displayByRoleAgainst(role, data)
      : displayByRoleWith(role, data);

  return (
    <div className="w-full h-full bg-main_background pb-2">
      <ResponsiveContainer width="97.5%" height={"100%"}>
        <BarChart data={display}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="hero"
            interval={0}
            height={60}
            tick={<CategoryTick />}
          />
          <YAxis />
          {/*<Tooltip content={<CustomTooltip />} />*/}
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
