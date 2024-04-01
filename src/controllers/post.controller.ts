import { Elysia, t } from "elysia";
import { createPost, getSinglePostById, getAllPosts } from "../repositories/post.repository";

export const post = new Elysia({ prefix: "/post" })
.get("/:id", ({ params }) => getSinglePostById(Number(params.id)))
.get("/all", () => getAllPosts())
.post("/add", () => createPost("Bunda!", 1))
.put("/:id", () => "hi🐤!")
.delete("/:id", () => "hi🐤!")