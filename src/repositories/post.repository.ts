import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { posts } from "../db/schema";


export async function getAllPosts():Promise<any>{
  return await db.select().from(posts)
}

export async function getSinglePostById(id:number):Promise<any>{
  return await db.select().from(posts).where(eq(posts.id, id))
}

export async function createPost(text: string, userId: number):Promise<any>{
  return await db.insert(posts).values({ text, userId});
} 

export async function updatePost(text:string, id:number):Promise<any>{
  return await db.update(posts).set({ text }).where(eq(posts.id, id));
} 

export async function deletedPost(id:number):Promise<any>{
  return await db.delete(posts).where(eq(posts.id, id));
}