import { NextResponse } from "next/server";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export async function POST(request: Request){
    try{
  
      const{title, content, author} = await request.json();
  
      if(!title || !content || !author){
        return NextResponse.json({error: "Chybí požadované pole"}, {status: 400});
      }
  
      const body = JSON.stringify({
        token: TOKEN,
        title,
        content,
        author
      });
  
      const response = await fetch("https://stage73.q2.cz/q2onboarding/q2/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
  
      if(!response.ok){
        throw new Error(`Error ${response.status} : ${await response.text()}`)
      }
  
      const data = await response.json();
      return NextResponse.json(data, {status: response.status});
  
    } catch (error) {
      console.error("POST request error", error);
      return NextResponse.json({ error: (error as Error).toString() }, { status: 500 });  
    }
  
  }