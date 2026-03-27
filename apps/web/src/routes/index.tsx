import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "#/views/root/Landing";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingPage />
    </div>
  );
}
