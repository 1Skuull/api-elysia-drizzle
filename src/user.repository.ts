import { eq } from "drizzle-orm";
import { db } from "./db/db";
import { users, type User } from "./db/schema";



export async function getAllUser():Promise<User[]>{
    const result:User[] = await db.select().from(users);

    return result
}

export async function getUserById(id:number):Promise<User[]>{
    const result:User[] = await db.select().from(users).where(eq(users.id, id))

    return result
}


export async function createUser(body:any):Promise<User[] | any>{
    const result = await db.insert(users).values(body);

    return result;
}