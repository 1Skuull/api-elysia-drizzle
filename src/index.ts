import { Elysia, t } from "elysia";
import { user } from "./user.controller";
import { cors } from '@elysiajs/cors'

new Elysia()
.use(cors())
.use(user)
.listen(9191, () => console.log("Hello Elysia🦊"));
