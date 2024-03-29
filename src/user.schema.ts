import { t, type Static } from "elysia";

export const UserSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
  createAt: t.String(),
  updateAt: t.String(),
});

export type IUser = Static<typeof UserSchema>  