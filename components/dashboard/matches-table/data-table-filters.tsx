import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectMaps } from "@/functions/selectMapper";
import { deleteMatches } from "@/lib/API";
import { Match } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { Trash, X } from "lucide-react";

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
}

export function DataTableFilters({ table }: DataTableFiltersProps<Match>) {
  function clearFilters() {
    table.resetColumnFilters();
  }

  return (
    <div className="flex mb-4 gap-4">
      <Select
        value={
          (table.getColumn("game_format")?.getFilterValue() as string) ?? ""
        }
        onValueChange={(value) =>
          table.getColumn("game_format")?.setFilterValue(value)
        }
      >
        <SelectTrigger className="lg:w-36 xl:w-[180px] text-overwatch_gray_main bg-main_background">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent className="max-h-72 text-overwatch_gray_main">
          <SelectItem value="5v5">5v5</SelectItem>
          <SelectItem value="6v6">6v6</SelectItem>
          <SelectItem value="stadium">Stadium</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table.getColumn("role")?.setFilterValue(value)
        }
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
      <Select
        value={(table.getColumn("mapName")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table.getColumn("mapName")?.setFilterValue(value)
        }
      >
        <SelectTrigger className="lg:w-36 xl:w-[180px] text-overwatch_gray_main bg-main_background">
          <SelectValue placeholder="Select map" />
        </SelectTrigger>
        <SelectContent className="max-h-72 text-overwatch_gray_main">
          {selectMaps("")}
        </SelectContent>
      </Select>

      <Select
        value={(table.getColumn("result")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table.getColumn("result")?.setFilterValue(value)
        }
      >
        <SelectTrigger className="lg:w-36 xl:w-[180px] text-overwatch_gray_main bg-main_background">
          <SelectValue placeholder="Select result" />
        </SelectTrigger>
        <SelectContent className="max-h-72 text-overwatch_gray_main">
          <SelectItem value="win">Win</SelectItem>
          <SelectItem value="draw">Draw</SelectItem>
          <SelectItem value="loss">Loss</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="mb-0 mt-auto lg:w-36 xl:w-[180px] gap-1 bg-overwatch_blue_main hover:bg-overwatch_gray_main active:bg-overwatch_blue_main"
        onClick={clearFilters}
      >
        <X /> Clear Filters
      </Button>
      <Button
        disabled={table.getFilteredSelectedRowModel().rows.length <= 0}
        onClick={async () => {
          await deleteMatches(
            table.getFilteredSelectedRowModel().rows.map((row) => row.original)
          );
          window.location.reload();
        }}
        className="w-16 h-6 sm:h-8 md:h-10 text-[9px] flex sm:w-24 md:w-32 xl:w-[180px] md:p-2 md:text-base sm:text-xs md:gap-1 text-white rounded-md items-center justify-center bg-enemy_color hover:bg-red-700"
      >
        <Trash />
        Delete matches
      </Button>
    </div>
  );
}
