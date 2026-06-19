"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { NewMatchForm } from "../dashboard/NewMatchForm";
import { Button } from "../ui/button";
import { AlignJustify, Plus, Trash, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { deleteData } from "@/lib/API";
import NavbarLinks from "./NavbarLinks";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function toggleMobileNavbar() {
    setMobileSidebarOpen(!mobileSidebarOpen);
  }

  // close new match dialog
  function closeDialog() {
    setOpen(!open);
  }

  return (
    <div className="flex-col">
      <div className="h-8 sm:h-12 md:h-16 flex items-center justify-between bg-overwatch_blue_main sm:p-0">
        <nav className="h-full hidden md:flex flex-row items-center text-xs sm:text-sm lg:text-base 2xl:text-lg mr-2 sm:ml-0 text-white">
          <NavbarLinks />
        </nav>
        <div className="md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md"
            onClick={toggleMobileNavbar}
          >
            {mobileSidebarOpen ? <X /> : <AlignJustify />}
          </button>
        </div>

        <div className="pr-2 md:pr-4 flex items-center space-x-2 md:space-x-4">
          <Dialog open={open}>
            <DialogTrigger
              onClick={() => setOpen(!open)}
              className="h-6 sm:h-8 md:h-10 flex w-16 sm:w-24 md:w-32 md:p-2 md:text-base text-[9px] sm:text-xs bg-orange_highlighter hover:bg-orange-500 md:gap-1 text-white rounded-md items-center justify-center"
            >
              <Plus className="hidden sm:block sm:h-4 sm:w-4 md:h-5 md:w-5" />{" "}
              New match
            </DialogTrigger>
            <DialogContent className="min-w-fit bg-extra_background border-none max-h-screen">
              <DialogHeader>
                <DialogTitle className="text-overwatch_blue_main">
                  New Match
                </DialogTitle>
              </DialogHeader>
              <NewMatchForm close={closeDialog} />
            </DialogContent>
          </Dialog>
          <Button
            onClick={async () => {
              await deleteData();
              window.location.reload();
            }}
            className="w-16 h-6 sm:h-8 md:h-10 text-[9px] flex sm:w-24 md:w-32 md:p-2 md:text-base sm:text-xs md:gap-1 text-white rounded-md items-center justify-center bg-enemy_color hover:bg-red-700"
          >
            <Trash />
            Delete data
          </Button>
          <UserButton />
        </div>
      </div>
      {mobileSidebarOpen && (
        <nav className="md:hidden sm:text-base text-xs justify-start">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavbarLinks />
          </div>
        </nav>
      )}
    </div>
  );
}
