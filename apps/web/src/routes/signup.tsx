import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "#/views/auth/Signup";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});
