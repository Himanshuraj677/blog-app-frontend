"use client";

import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}
export function AuthModal({ open, setOpen, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // prevent scroll
    } else {
      document.body.style.overflow = ""; // reset scroll
    }

    return () => {
      document.body.style.overflow = ""; // cleanup
    };
  }, [open]);
  if (!open) return null; 
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative z-10 bg-black rounded-xl w-full max-w-md py-4 px-6 shadow-md">
        {children}
      </div>
    </div>
  );
}
