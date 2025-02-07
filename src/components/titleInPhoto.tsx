'use client';

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

interface Post {
    id: number;
    image: string;
    title: string;
    content: string;
    author: string;
}

export default function TitleInPhoto(){
    const params = useParams();
    const id = Number(params.id);
    const pathname = usePathname();
    const [title, setTitle] = useState<string | null>('');

    useEffect(()=>{
        if(id){
            const fetchPostTitle = async () => {
                try{
                    const response = await fetch('../api/posts');
                    if(!response.ok){
                        throw new Error('Failed to fetch post');
                    }
                    const data = await response.json();
                    const post = data.applications.find((post: Post) => post.id === id);             
                    if (post) {
                        setTitle(post.title);
                      } else {
                        console.error('Post not found for ID:', id);
                      }
                    } catch(error) {
                    console.error('Error fetching post title', error);
                }
            };
            fetchPostTitle(); 
        }
    }, [id])

    return (
        <div className={`absolute top-[50%] w-full max-w-[700px] py-0`} style={{ paddingLeft: 'var(--padding-main-x)', paddingRight: 'var(--padding-main-x)' }}>
            <h1 className="text-white">
                { id ? (title || 'Příspěvek') : pathname === '/new' ? 'Přidání článku' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
            </h1>
        </div>
    )
}