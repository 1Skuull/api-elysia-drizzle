import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { user } from "./user.controller";
import { auth } from "./auth.controller";

new Elysia()
.use(cors())
.use(auth)
.use(user)
.onError(({ code }) => {
    if (code === 'NOT_FOUND') return 'Route not found :('
})
.listen(9191, () => console.log("Hello Elysia🦊"));
