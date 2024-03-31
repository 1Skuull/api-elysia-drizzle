import { t, type Static } from "elysia";

export const UserSchema = t.Object({
  name: t.String({ minLength: 3 }),
  email: t.String({ format: 'email', error: 'Invalid email 😡' }),
  password: t.String({ minLength: 6 }),
  confirmPassword: t.String({ minLength: 6 }),
});

export type IUser = Static<typeof UserSchema>  