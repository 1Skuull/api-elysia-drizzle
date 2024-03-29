import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db/db";
import { users, type User } from "./db/schema";

export async function getAllUser():Promise<User[]>{
    const result:User[] = await db.select()
    .from(users)
    .orderBy(asc(users.id));
    
    return result
}

export async function getUserById(id:number):Promise<User[]>{
    const result:User[] = await db.select().from(users).where(eq(users.id, id))
    return result
}

export async function createUser(body:any):Promise<User[] | any>{
    return await db.insert(users).values(body);
}

export async function updateUser(body:any, id:number):Promise<User[] | any>{
    return await db.update(users)
    .set(body)
    .where(eq(users.id, id));;
}

export async function deletedUser(id:number):Promise<User[] | any>{
    return await db.delete(users).where(eq(users.id, id));
}