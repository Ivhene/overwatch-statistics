import Link from "next/link";
import { Button } from "../ui/button";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full h-16 p-2 flex items-center justify-between">
      <img
        src="/Overwatch_2_logo.png"
        className="h-full"
        alt="Overwatch 2 logo"
      />
      <div className="flex items-center">
        <Show when="signed-in">
          <Button className="mr-3 bg-orange_highlighter hover:bg-orange-400 active:bg-orange_highlighter font-bold">
            <Link href="/mypage">My page</Link>
          </Button>
          <UserButton />
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal" fallbackRedirectUrl={"/mypage"}>
            <Button className="mr-3 bg-orange_highlighter hover:bg-orange-400 active:bg-orange_highlighter font-bold">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal" fallbackRedirectUrl={"/mypage"}>
            <Button className="w-24 bg-overwatch_blue_main hover:bg-overwatch_gray_main active:bg-overwatch_blue_main">
              Sign Up
            </Button>
          </SignUpButton>
        </Show>
      </div>
    </nav>
  );
}
