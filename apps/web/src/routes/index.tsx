import { createFileRoute } from "@tanstack/react-router";
import Landing from "#/views/root/Landing";

export const Route = createFileRoute("/")({
  component: Landing,
});
