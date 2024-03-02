import { Elysia } from "elysia";
import { User } from "./user.schema";
import { jwt } from "@elysiajs/jwt";


export const user = new Elysia({ prefix: "/user" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET_KEY as string,
    })
  )
  .get("/:id", async ({ jwt, cookie: { auth  }, params }) => {
    auth.set({
      value: await jwt.sign({ auth: params.id }),
      httpOnly: true,
      maxAge: 7 * 86400,
      // path: '/verify',
    })

    return auth.value
  })
  .get('/verify', async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value)
    
    console.log(profile)

    if (!profile) {
        set.status = 401
        return 'Unauthorized'
    }

    return {id: profile.auth , msg: `Hello nundo`}
})
  .post("/",({ body }) => {

      console.log("depois")

      return body;
    },
    { 
      beforeHandle(){console.log("antes")} , 
      body: User
    },
  )
