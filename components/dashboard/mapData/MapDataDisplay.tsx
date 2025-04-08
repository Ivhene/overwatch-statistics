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
import { displayMaps } from "@/functions/matchupDisplay";
import { Match } from "@/lib/types";
import { CustomTooltip } from "../CustomTooltip";

interface HeroDataDisplayProps {
  data: Match[];
  role: string;
  maptype: string;
}

export default function MapDataDisplay({
  data,
  role,
  maptype,
}: HeroDataDisplayProps) {
  const display = displayMaps(maptype, role, data);

  return (
    <div className="w-full h-full bg-main_background p-2">
      <ResponsiveContainer width="97.5%" height={"100%"}>
        <BarChart data={display}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="map"
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
            dataKey="draws"
            fill="#FFC91A"
            activeBar={<Rectangle fill="yellow" stroke="yellow" />}
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
