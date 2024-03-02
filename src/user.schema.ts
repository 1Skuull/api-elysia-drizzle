import { t, type Static } from "elysia";

export const User = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
  createAt: t.String(),
  updateAt: t.String(),
});

export type IUser = Static<typeof User>  

export const users: IUser[] = [
  {
    id: 1,
    name: "bruna",
    email: "bruna@gmail.com",
    password: "12346",
    createAt: "01/02/2024",
    updateAt: "01/02/2024",
  },
];