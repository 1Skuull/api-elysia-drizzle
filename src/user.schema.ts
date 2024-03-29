import { t, type Static } from "elysia";

export const UserSchema = t.Object({
  name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
  confirmPassword: t.String({ minLength: 6 }),
});

export type IUser = Static<typeof UserSchema>  