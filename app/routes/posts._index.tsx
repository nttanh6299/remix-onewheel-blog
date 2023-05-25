import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostListing } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

export const loader = async () => {
  const posts = await getPostListing();
  return json({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData<typeof loader>();
  const admin = useOptionalAdminUser();

  return (
    <main>
      <h1>Posts</h1>
      {admin ? (
        <Link to="admin" className="text-blue-600">
          Admin
        </Link>
      ) : null}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
