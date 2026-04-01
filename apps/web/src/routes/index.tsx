import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "#/services/post";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => {
    return {
      posts: await getPosts(),
    };
  },
});

function HomePage() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white">
      <h1>Home</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
