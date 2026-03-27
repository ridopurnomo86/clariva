import * as z from "zod";

const LoginSchemaValidation = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export default LoginSchemaValidation;
