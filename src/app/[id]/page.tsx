'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
    id: number;
    image: string;
    title: string;
    content: string;
    author: string;
  }


export default function PostDetail (){
    const params = useParams();
    const id = Number(params.id);    
    const [post, setPost] = useState<Post | null>(null); 

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await fetch('/api/posts');
    
            if (!response.ok) {
              const errorResponse = await response.text();
              throw new Error(`Error: ${response.status} : ${errorResponse}`);
            }
    
            const data = await response.json();
            const posts: Post[] = data.applications;
            const foundPost = posts.find((post) => post.id === id);
    
            if (foundPost) {
              setPost(foundPost);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPost();
      }, [id]);
    
      if (!post) return <p>Loading...</p>; 
    

    return(
        <div className="flex flex-col lg:flex-row gap-3 items-start lg:pt-[5.7rem] lg:pr-[10.5rem] pb-[1.5rem]" aria-labelledby="post-title" aria-describedby="post-content">
            <div className="flex flex-row gap-6 items-center">
                <p className="text-sm font-bold" style={{color: '#495057'}}>{post.author}</p>
                <div className="h-[1px] w-[34px]" style={{backgroundColor: '#C4C4C4'}}></div>
            </div>
            <div>
                <p className="text-base">{post.content}</p>
            </div>
        </div>
    )
}