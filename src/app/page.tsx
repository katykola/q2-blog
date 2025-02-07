import PostList from '@/components/postList'

export default function Home() {
    return (
    <div className='px-2'>
      <h1 className='pb-10' id="latest-posts-title">Nejnovější</h1>
      <PostList aria-labelledby="latest-posts-title"/>
    </div>
  );

}
  