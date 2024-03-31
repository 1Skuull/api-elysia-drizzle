import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { user } from "./controllers/user.controller";
import { auth } from "./controllers/auth.controller";
import { post } from "./controllers/post.controller";

new Elysia()
.use(cors({
    credentials: true
}))
.onError(({ code }) => {
    if (code === 'NOT_FOUND') return 'Route not found :('
})
.use(auth)
.use(user)
.use(post)
.listen(9191, () => console.log("Hello Elysia🦊🐤"));
