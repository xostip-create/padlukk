
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Image as ImageIcon, FileText } from 'lucide-react';

import type { Content, Creator } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type ContentCardProps = {
  content: Content;
  creator: Creator;
};

const typeIcons = {
  article: <FileText className="h-4 w-4" />,
  photo_essay: <ImageIcon className="h-4 w-4" />,
  video: <PlayCircle className="h-4 w-4" />,
};

export default function ContentCard({ content, creator }: ContentCardProps) {
  const contentImage = PlaceHolderImages.find((img) => img.id === content.imageId);
  const creatorImage = PlaceHolderImages.find((img) => img.id === creator.avatarImageId);

  return (
    <Link href={`/${content.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            {contentImage ? (
              <Image
                src={contentImage.imageUrl}
                alt={content.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={contentImage.imageHint}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
            <div className="absolute right-3 top-3">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {typeIcons[content.type]}
                <span className="ml-1.5">{content.category}</span>
              </Badge>
            </div>
          </AspectRatio>
        </CardContent>
        <CardHeader>
          <CardTitle className="font-headline text-xl leading-snug">{content.title}</CardTitle>
          <CardDescription className="line-clamp-2">{content.excerpt}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={creatorImage?.imageUrl} alt={creator.name} data-ai-hint={creatorImage?.imageHint} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">{creator.name}</p>
              <p className="text-muted-foreground">{new Date(content.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
