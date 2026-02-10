
'use client';

import { useState, useMemo } from 'react';
import type { Content, Creator } from '@/lib/data';
import ContentCard from '@/components/content-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type ContentDisplayProps = {
  content: Content[];
  creators: Creator[];
};

const categories = ['All', 'Fashion', 'Art', 'Music'];

export default function ContentDisplay({ content, creators }: ContentDisplayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredContent = useMemo(() => {
    return content
      .filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const creator = creators.find((c) => c.id === item.creatorId);
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creator?.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content, creators, searchQuery, selectedCategory]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search topics or creators..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.map((item) => {
          const creator = creators.find((c) => c.id === item.creatorId);
          if (!creator) return null;
          return <ContentCard key={item.id} content={item} creator={creator} />;
        })}
      </div>
       {filteredContent.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No content found. Try adjusting your search or filters.</p>
          </div>
        )}
    </div>
  );
}
