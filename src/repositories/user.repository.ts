import { asc, eq } from "drizzle-orm";
import { db } from "../db/db";
import { users, type User } from "../db/schema";

export async function getAllUsers():Promise<User[]>{
    const result:User[] = await db.select()
    .from(users)
    .orderBy(asc(users.id));
    
    return result
}

export async function getUserById(id:number):Promise<User[]>{
    const result:User[] = await db.select()
    .from(users)
    .where(eq(users.id, id))
    
    return result
}

export async function getUserByEmail(email:string):Promise<User[]>{
    const result:User[] = await db.select()
    .from(users)
    .where(eq(users.email, email))
    
    return result
}

export async function getUsersPosts(id:number):Promise<User[]>{
    return await db.query.users.findMany({
        where: eq(users.id, id),
        with: {
            posts: true
        },
    });
}

export async function getUsersComments(id:number):Promise<User[]>{
    return await db.query.users.findMany({
        where: eq(users.id, id),
        with: {
            comments: true
        },
    });
}

export async function getUsersLikes(id:number):Promise<User[]>{
    return await db.query.users.findMany({
        where: eq(users.id, id),
        with: {
            likes: true
        },
    });
}

export async function createUser(body:any):Promise<User[] | any>{
    return await db.insert(users).values(body);
}

export async function updateUser(body:any, id:number):Promise<User[] | any>{
    return await db.update(users).set(body).where(eq(users.id, id));;
}

export async function deletedUser(id:number):Promise<User[] | any>{
    return await db.delete(users).where(eq(users.id, id));
}
