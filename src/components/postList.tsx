"use client";

import { useEffect, useState } from "react";

import PostTile from '@/components/postTile';

interface Post {
  id: number;
  image: string;
  title: string;
  content: string;
  author: string;
}

export default function PostList() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("../api/posts"); 
  
        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(`Error ${response.status}: ${errorResponse}`);
        }
  
        const data = await response.json();
        const posts  = data.applications;
        setPosts(posts); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };
  
    fetchPosts();
  }, []); 

  if (error) return <div>Nedaří se nám načíst příspevky. Něco se asi pokazilo.</div>;

  if (posts.length === 0) return <div>Loading...</div>;
      
    return (
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {posts.map((post) => {
          return (
            <PostTile
              id={post.id}
              key={post.id}
              image={post.image}
              title={post.title}
              content={post.content}
              author={post.author}
            />
          );
        })}
      </div>
  );
}

  