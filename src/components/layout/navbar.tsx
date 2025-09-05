"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search, Menu, X, LogOut } from "lucide-react";   // ⬅ added LogOut icon
import { Input } from "../ui/input";
import TechBlogLogo from "../svg/logo";
import { AuthModal } from "../ui/modal";
import AuthForm from "../auth/AuthForm";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [hasCreatePermission, setHasCreatePermission] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // ⬅ logout handler
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/"); // redirect to home
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    const checkPermission = async () => {
      try {
        const { data, error } = await authClient.admin.hasPermission({
          userId: session.user.id,
          permission: { blog: ["create"] },
        });
        if (!error) {
          setHasCreatePermission(data?.success || false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    checkPermission();
  }, [session]);

  const linkClass = (href: string) =>
    `hover:text-primary transition-colors ${
      pathname === href ? "text-primary font-semibold" : "text-muted-foreground"
    }`;

  return (
    <nav className="sticky z-40 top-0 h-16 border-b border-slate-800 bg-background">
      <div className="flex justify-between items-center h-full container mx-auto px-4">
        {/* Logo */}
        <Link href="/">
          <TechBlogLogo />
        </Link>

        {/* Desktop Search */}
        {session?.user && (
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Input
              name="search-post"
              type="text"
              className="pl-10 w-full border-slate-800"
              placeholder="Search for posts..."
            />
            <Search
              width={16}
              height={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        )}

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          {isPending ? (
            <>
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </>
          ) : session?.user ? (
            <>
              <Link href="/" className={linkClass("/")}>Home</Link>
              <Link href="/my-blogs" className={linkClass("/my-blogs")}>My Blogs</Link>
              {hasCreatePermission && (
                <Link href="/blog/create" className={linkClass("/blog/create")}>
                  Create
                </Link>
              )}
              <Avatar
                className="cursor-pointer"
                onClick={() => router.push(`/profile/${session.user.id}`)}
              >
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>
                  {session.user.name ? session.user.name[0] : "U"}
                </AvatarFallback>
              </Avatar>
              {/* ⬅ Logout button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-red-500"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-gray-800 text-white hover:bg-gray-900"
                size="sm"
                onClick={() => {
                  setMode("signin");
                  setOpen(true);
                }}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setMode("signup");
                  setOpen(true);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-4 p-4 border-t border-slate-800 bg-background">
          {isPending ? (
            <>
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </>
          ) : session?.user ? (
            <>
              {/* Mobile Search */}
              <div className="relative">
                <Input
                  name="search-post"
                  type="text"
                  className="pl-10 w-full border-slate-800"
                  placeholder="Search..."
                />
                <Search
                  width={16}
                  height={16}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
              </div>

              <Link href="/" className={linkClass("/")} onClick={() => setMobileMenu(false)}>Home</Link>
              <Link href="/my-blogs" className={linkClass("/my-blogs")} onClick={() => setMobileMenu(false)}>My Blogs</Link>
              {hasCreatePermission && (
                <Link
                  href="/blog/create"
                  className={linkClass("/blog/create")}
                  onClick={() => setMobileMenu(false)}
                >
                  Create
                </Link>
              )}
              <Link href= {`/profile/${session.user.id}`} className={linkClass("/profile")} onClick={() => setMobileMenu(false)}>
                Profile
              </Link>
              {/* ⬅ Logout in mobile */}
              <Button
                variant="ghost"
                onClick={() => {
                  handleLogout();
                  setMobileMenu(false);
                }}
                className="justify-start text-muted-foreground hover:text-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-gray-800 text-white hover:bg-gray-900 w-full"
                onClick={() => {
                  setMode("signin");
                  setOpen(true);
                  setMobileMenu(false);
                }}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setMode("signup");
                  setOpen(true);
                  setMobileMenu(false);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal open={open} setOpen={setOpen}>
        <AuthForm mode={mode} setOpen={setOpen} />
      </AuthModal>
    </nav>
  );
}
