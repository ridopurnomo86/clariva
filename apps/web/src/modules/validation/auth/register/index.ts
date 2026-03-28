import * as z from "zod";

const RegisterSchemaValidation = z.object({
  fullname: z.string().min(6),
  email: z.email(),
  password: z.string().min(6),
  verifyPassword: z.string().min(6),
});

export const RegisterSchemaValidationWithPasswordMatch = RegisterSchemaValidation.refine(
  (data) => data.password === data.verifyPassword,
  {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  },
);

export default RegisterSchemaValidation;
