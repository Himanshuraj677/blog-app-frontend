"use client";

import React, { useEffect } from "react";
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
import { useService } from "@/hooks/useService";
import { API_SERVICES } from "@/lib/constant";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthFormProps {
  mode: "signin" | "signup";
  setOpen: (open: boolean) => void;
}

interface AuthResponse {
  message: string
  user: User
}

export default function AuthForm({ mode, setOpen }: AuthFormProps) {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<signinType | signupType>({
    resolver: zodResolver(mode === "signin" ? signinSchema : signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const apiEndpoint =
    mode === "signin"
      ? `${API_SERVICES.auth}/signin`
      : `${API_SERVICES.auth}/signup`;
  const { data, loading, error, execute } = useService<
    AuthResponse,
    signinType | signupType
  >(apiEndpoint);
  useEffect(() => {
    if (data) {
      // Save user info if needed
      if ("user" in data) {
        setUser(data.user)
      }
      toast.success(
        mode === "signin" ? "Signin successful!" : "Signup successful!"
      );
      setOpen(false);
    }
    if (error) toast.error(error.message);
  }, [data, error, setOpen, mode, setUser]);

  const formSubmit = (data: signinType | signupType) => {
    if (mode === "signup") {
      execute({ method: "POST", body: data });
    } else if (mode === "signin") {
      execute({ method: "POST", body: data });
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
            <p className="text-destructive text-sm">{errors.email.message}</p>
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
