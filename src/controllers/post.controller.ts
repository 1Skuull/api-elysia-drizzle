import { Elysia } from "elysia";

export const post = new Elysia({ prefix: "/post" })
.get("/:id", () => "hi🐤!")
.get("/all", () => "hi🐤!")
.post("/add", () => "hi🐤!")
.put("/:id", () => "hi🐤!")
.delete("/:id", () => "hi🐤!")