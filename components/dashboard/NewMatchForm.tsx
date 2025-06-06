"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Trash } from "lucide-react";
import { NewMatchupForm } from "./NewMatchupForm";
import { selectMaps, selectResult } from "@/functions/selectMapper";
import { useState, useEffect } from "react";
import { MatchToSave, MatchupToSave } from "@/lib/types";
import React from "react";
import { addNewGame } from "@/lib/API";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

interface NewMatchFormProps {
  close: () => void;
}

const formSchema = z.object({
  map: z
    .string({
      required_error: "Please select a map",
    })
    .min(1, "Please select a map"),
  result: z
    .string({
      required_error: "Please select a result",
    })
    .min(1, "Please select a result"),
  role: z
    .string({
      required_error: "Please select a role",
    })
    .min(1, "Please select a role"),
  format: z
    .string({
      required_error: "Please select a format",
    })
    .min(1, "Please select a result"),
});

export function NewMatchForm({ close }: NewMatchFormProps) {
  const [matchups, setMatchups] = useState<MatchupToSave[]>([]);
  const [open, setOpen] = useState(false);
  const [submitClickCount, setSubmitClickCount] = useState(0);
  const [closeClickCount, setCloseClickCount] = useState(0);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      map: "",
      result: "",
      role: "",
      format: "",
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".submit-button") &&
        !event.target.closest(".close-button")
      ) {
        setSubmitClickCount(0);
        setCloseClickCount(0);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function CloseDialog() {
    setOpen(false);
  }

  function AddMatchup(matchup: MatchupToSave) {
    setMatchups((prevMatchups) => [...prevMatchups, matchup]);
    CloseDialog();
  }

  function DeleteMatchup(matchup: MatchupToSave) {
    setMatchups((prevMatchups) => prevMatchups.filter((m) => m !== matchup));
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (matchups.length > 0) {
      const match: MatchToSave = {
        map: values.map,
        result: values.result,
        role: values.role,
        game_format: values.format,
        matchup: matchups,
      };

      close();
      await addNewGame(match);
      window.location.reload();
    }
  }

  function handleSubmit() {
    if (submitClickCount === 0) {
      setSubmitClickCount(1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  }

  function handleClose() {
    if (closeClickCount === 0) {
      setCloseClickCount(1);
    } else {
      close();
    }
  }

  function checkValues() {
    const values = form.getValues();
    return (
      values.map !== "" &&
      values.result !== "" &&
      values.role !== "" &&
      values.format !== ""
    );
  }

  return (
    <div className="flex flex-col h-fit max-h-screen">
      <div className="h-auto">
        <Dialog open={open}>
          <DialogTrigger
            onClick={() => setOpen(!open)}
            disabled={!checkValues()}
            className="h-10 flex w-fit p-2 disabled:bg-opacity-75 disabled:border-neutral-900 bg-orange_highlighter gap-1 text-white rounded-md items-center justify-center mt-4"
          >
            <Plus className="w-5" /> New Matchup
          </DialogTrigger>
          <DialogContent className="min-w-fit bg-extra_background border-none overflow-auto max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-overwatch_blue_main">
                New Matchup
              </DialogTitle>
            </DialogHeader>
            <NewMatchupForm
              close={CloseDialog}
              addMatchup={AddMatchup}
              lastMatchup={
                matchups.length === 0 ? null : matchups[matchups.length - 1]
              }
              role={form.getValues().role}
              format={form.getValues().format}
            />
          </DialogContent>
        </Dialog>
        <Form {...form}>
          <form className="w-full mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="map"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-overwatch_blue_main">
                      Map
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="xl:w-[180px] w-36">
                          <SelectValue placeholder="Select map" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        {selectMaps("")}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-overwatch_blue_main">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={matchups.length > 0}
                    >
                      <FormControl>
                        <SelectTrigger className="xl:w-[180px] w-36">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        <SelectItem value="tank">Tank</SelectItem>
                        <SelectItem value="damage">Damage</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-overwatch_blue_main">
                      Result
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="xl:w-[180px] w-36">
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        {selectResult()}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-overwatch_blue_main">
                      Format
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={matchups.length > 0}
                    >
                      <FormControl>
                        <SelectTrigger className="xl:w-[180px] w-36">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        <SelectItem value="5v5">5v5</SelectItem>
                        <SelectItem value="6v6">6v6</SelectItem>
                        <SelectItem value="stadium">Stadium</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-4 mt-6">
              <Button
                className="bg-orange_highlighter active:bg-orange_highlighter hover:bg-orange_highlighter submit-button"
                type="button"
                onClick={handleSubmit}
              >
                {submitClickCount === 0 ? "Submit" : "Confirm Submit"}
              </Button>
              <Button
                className="close-button bg-overwatch_blue_main active:bg-overwatch_blue_main hover:bg-overwatch_blue_main"
                type="button"
                onClick={handleClose}
              >
                {closeClickCount === 0 ? "Close" : "Confirm Close"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="grow overflow-y-auto mt-6 mb-16">
        <Table>
          <TableBody>
            {matchups.map((matchup, index) => (
              <TableRow className="text-sm text-white" key={index}>
                {matchup.win ? (
                  <TableCell className="font-light bg-blue-600">Win</TableCell>
                ) : (
                  <TableCell className="font-light bg-red-600">Loss</TableCell>
                )}
                <TableCell className="bg-green-600">
                  {matchup.heroPlayed}
                </TableCell>
                <TableCell className="bg-cyan-400">{matchup.ally1}</TableCell>
                <TableCell className="bg-cyan-400">{matchup.ally2}</TableCell>
                <TableCell className="bg-cyan-400">{matchup.ally3}</TableCell>
                <TableCell className="bg-cyan-400">{matchup.ally4}</TableCell>
                <TableCell className="bg-cyan-400">{matchup.ally5}</TableCell>
                <TableCell className="bg-red-900">{matchup.enemy1}</TableCell>
                <TableCell className="bg-red-900">{matchup.enemy2}</TableCell>
                <TableCell className="bg-red-900">{matchup.enemy3}</TableCell>
                <TableCell className="bg-red-900">{matchup.enemy4}</TableCell>
                <TableCell className="bg-red-900">{matchup.enemy5}</TableCell>
                <TableCell className="bg-red-900">{matchup.enemy6}</TableCell>
                <TableCell
                  onClick={() => DeleteMatchup(matchup)}
                  className="bg-red-600 cursor-pointer"
                >
                  <Trash />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
