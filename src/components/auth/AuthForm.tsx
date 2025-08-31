"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  signinSchema,
  signinType,
  signupSchema,
  signupType,
} from "@/lib/schema/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "signin" | "signup";
  setOpen: (open: boolean) => void;
}

export default function AuthForm({ mode, setOpen }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<signinType | signupType>({
    resolver: zodResolver(mode === "signin" ? signinSchema : signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const formSubmit = async (data: signinType | signupType) => {
    if (mode === "signup") {
      const { error } = await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.fullName.trim()}`,
        },
        {
          onRequest: (ctx) => {
            console.log(data);
            setLoading(true);
          },
          onSuccess: (ctx) => {
            setLoading(false);
            toast.success("User created successfully");
            setOpen(false);
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error.message);
          },
        }
      );
    } else if (mode === "signin") {
      const { error } = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          rememberMe: true,
        },
        {
          onRequest: (ctx) => {
            setLoading(true);
          },
          onSuccess: (ctx) => {
            setLoading(false);
            toast.success("You have logged in successfully");
            setOpen(false);
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error.message);
          },
        }
      );
    }
  };
  return (
    <div className="w-full relative z-50">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold mb-4">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h3>
        <X className="w-4 h-4 cursor-pointer" onClick={() => setOpen(false)} />
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              type="text"
              {...register("fullName")}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {loading || isSubmitting ? (
            <Spinner />
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );
}
