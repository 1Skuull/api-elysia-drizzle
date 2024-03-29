import { jwt } from '@elysiajs/jwt'
import { Elysia } from "elysia";


export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET_KEY as string,
    })
  )
  .post("/login", async ({ body, jwt, cookie: { auth } }) => {
    auth.set({
      value: await jwt.sign({ auth: "5" }),
      httpOnly: false,
      maxAge: 7 * 86400,
      path: '/verify',
    })
    

    return auth.value
  })
  .post("/register", async ({ body }) => {

    // const hash = await Bun.password.hash(body.password);
    // const isMatch = await Bun.password.verify(body.password, hash);

    return body
  })
  .get('/verify', async ({ jwt, set, cookie: { auth }, headers }) => { 
    const profile = await jwt.verify(auth.value)
    
    console.log(auth.value)
    console.log(headers.cookie)

    if (!profile) {
      set.status = 401
      return 'Unauthorized'
    }

    return { id: profile , msg: `Hello nundo` }
  })