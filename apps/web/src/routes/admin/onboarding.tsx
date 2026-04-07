import AdminDashboard from "#/views/admin/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/onboarding")({
  component: AdminDashboard,
});
