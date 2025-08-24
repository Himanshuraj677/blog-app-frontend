import { z } from "zod";

export const signinSchema = z.object({
  email: z.email("Email is required"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(15, "Password can't have more than 15 chracters"),
});

export const signupSchema = signinSchema
  .extend({
    fullName: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((args, ctx) => {
    if (args.password !== args.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });


export type signinType = z.infer<typeof signinSchema>
export type signupType = z.infer<typeof signupSchema>