import Image from 'next/image';
import Link from 'next/link';
import placeholder from '../../public/placeholder_image.png';

interface PostTileProps {
  id: number;
  image: string;
  author: string;
  title: string;
  content: string;
}

export default function PostTile({ id, image, author, title, content }: PostTileProps) {

  const truncateContent = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';

  };
    return(
        <div className='flex flex-col gap-9'>
        <Link href={`/${id}`}>
        <div className='flex flex-col gap-2 cursor-pointer mb-4 transform transition-transform hover:scale-105'>            
          <Image loading = 'lazy'  src={ image ? image : placeholder } alt="Obrázek" width='350' height='350' style={{ borderRadius: '5px', aspectRatio: 1/1 }}/>
            <p className='text-xs'>{author}</p>
            <h3>{title}</h3>
            <p className='text-sm'>{truncateContent(content, 150)}</p> 
          </div>
        </Link>
      </div>
    )
}