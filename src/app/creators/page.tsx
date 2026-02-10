
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { creators } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CreatorsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl">Our Creators</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Meet the talented individuals shaping the narrative at Padluckk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {creators.map((creator) => {
          const creatorImage = PlaceHolderImages.find((img) => img.id === creator.avatarImageId);
          return (
            <Card key={creator.id} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="items-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                  <AvatarImage src={creatorImage?.imageUrl} alt={creator.name} data-ai-hint={creatorImage?.imageHint} />
                  <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">{creator.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{creator.bio}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
