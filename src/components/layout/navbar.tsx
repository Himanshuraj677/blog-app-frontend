"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import TechBlogLogo from "../svg/logo";
import { AuthModal } from "../ui/modal";
import AuthForm from "../auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <nav className="sticky z-40 top-0 h-16 border-b border-slate-800 bg-background">
      <div className="relative flex justify-between items-center h-full container mx-auto px-4">
        {/* Logo */}
        <div className="w-auto">
          <TechBlogLogo />
        </div>

        {/* Search input */}
        <div className="hidden absolute left-1/2 -translate-x-1/2 w-1/3 md:block">
          <Input
            name="search-post"
            type="text"
            className="pl-10 w-full border-slate-800"
            placeholder="Search for posts..."
          />
          <Search
            width={16}
            height={16}
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
        </div>

        {/* User section */}
        <div className="flex items-center gap-4">
          {loading ? (
            // Placeholder while checking auth
            <div className="w-24 h-8 bg-gray-700 animate-pulse rounded" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <Button variant="secondary" onClick={() => router.push('/blog/create')}>Create</Button>
              <Avatar>
                <AvatarImage src={user.avatarUrl || ""} />
                <AvatarFallback>
                  {user.fullName ? user.fullName[0] : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                className="bg-gray-800 text-white hover:bg-gray-900"
                onClick={() => {
                  setMode("signin");
                  setOpen(true);
                }}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setMode("signup");
                  setOpen(true);
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Auth modal */}
      <AuthModal open={open} setOpen={setOpen}>
        <AuthForm mode={mode} setOpen={setOpen} />
      </AuthModal>
    </nav>
  );
}
