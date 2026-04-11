
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { 
  Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, 
  Image as ImageIcon, List, ListOrdered, Quote, Redo, Undo,
  Type, Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  const [imageUrl, setImageUrl] = useState('');

  if (!editor) {
    return null;
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  const colors = [
    { name: 'Default', value: 'inherit' },
    { name: 'Primary', value: 'hsl(45 48% 53%)' },
    { name: 'Accent', value: 'hsl(68 30% 40%)' },
    { name: 'White', value: '#ffffff' },
    { name: 'Gray', value: '#9ca3af' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-md">
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive('bold') && 'bg-accent text-accent-foreground')}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive('italic') && 'bg-accent text-accent-foreground')}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(editor.isActive('underline') && 'bg-accent text-accent-foreground')}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" type="button">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 flex flex-col gap-1">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => editor.chain().focus().setColor(c.value).run()}
              className="flex items-center gap-2 px-2 py-1 hover:bg-muted text-sm rounded transition-colors"
            >
              <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.value }} />
              {c.name}
            </button>
          ))}
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive('bulletList') && 'bg-accent text-accent-foreground')}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive('orderedList') && 'bg-accent text-accent-foreground')}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="sm" type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive('blockquote') && 'bg-accent text-accent-foreground')}
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" type="button">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Insert Image URL</h4>
            <div className="flex gap-2">
              <Input 
                placeholder="https://..." 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button size="sm" onClick={addImage}>Insert</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="ml-auto flex gap-1">
        <Button
          variant="ghost" size="sm" type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="sm" type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function EditorialEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg border shadow-lg max-w-full h-auto my-8 mx-auto block',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6 text-lg leading-loose',
      },
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden bg-card/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
