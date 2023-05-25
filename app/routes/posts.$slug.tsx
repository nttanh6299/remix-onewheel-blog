import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;
  invariant(slug, "Slug is required");
  const post = await getPost(slug);
  invariant(post, "Post not found");
  return json({ title: post.title, html: marked(post.markdown) });
};

export default function PostRoute() {
  const { title, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
