import { Elysia } from "elysia";
import { UserSchema } from "./user.schema";
import { createUser, getAllUser, getUserById } from "./user.repository";


export const user:any = new Elysia({ prefix: "/user" })
  .get("/all", async () => {
    try {
      // const users = await getAllUser()
      const users = await getUserById(1)

      return users
    } catch (error) {
      console.log(error)
      return error
    }
  })
  .post("/add", async ({ body }) => {
      try {
        const users = await createUser({
          name: body.name,
          email: body.email,
          password: body.password
        })
        console.log("depois")
        
        return users
      } catch (error) {
        console.log(error)
        return error;        
      }
    },
    { 
      beforeHandle(){console.log("antes")} , 
      body: UserSchema
    },
  )
