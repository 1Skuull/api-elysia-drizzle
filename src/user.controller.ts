import { Elysia, t } from "elysia";
import { UserSchema } from "./user.schema";
import { createUser, getAllUser, getUserById, deletedUser, updateUser } from "./user.repository";


export const user = new Elysia({ prefix: "/user" })
  .get("/:id", async ({ set, params }) => {
    try {
      const users = await getUserById(params.id)

      if (!users.length) {
        set.status = 400
        return 'No users found!'
      }

      return users
    } catch (error) {
      console.log(error)
      return error
    }
  },
  {
    params: t.Object({
      id: t.Numeric()
    }) 
  })
  .get("/all", async ({ set }) => {
    try {
      const users = await getAllUser()

      if (!users.length) {
        set.status = 400
        return 'No users found!'
      }

      return users
    } catch (error) {
      console.log(error)
      return error
    }
  })
  .post("/add", async ({ body }) => {
    try {
      await createUser({
        name: body.name,
        email: body.email,
        password: await Bun.password.hash(body.password)
      })
      console.log("depois")
        
      return "vapo!"
    } catch (error) {
      console.log(error)
      return error;        
    }
  },
  { 
    body: UserSchema,
    beforeHandle(){console.log("antes")},
  })
  .put("/:id", async ({ set, body, params }) => {
    try {

      const userExist = await getUserById(params.id)

      console.log(userExist.length)

      if (!userExist.length) {
        set.status = 400
        return 'User does not exist!'
      }
      
      await updateUser({
        name: body.name,
        email: body.email,
        password: await Bun.password.hash(body.password)
      }, params.id)
      
      return "Updated user!";
    } catch (error) {
      console.log(error)
      return error;  
    }
  },
  { 
    body: UserSchema, 
    params: t.Object({
      id: t.Numeric()
    }) 
  })
  .delete("/:id", async({ set, params }) => {
    try {
      const userExist = await getUserById(params.id)

      console.log(userExist.length)

      if (!userExist.length) {
        set.status = 400
        return 'User does not exist!'
      }

      await deletedUser(params.id)
      
      return "Deleted user!"
    } catch (error) {
      console.log(error)
      return error;
    }
  },
  {
    params: t.Object({
      id: t.Numeric()
    }) 
  })
