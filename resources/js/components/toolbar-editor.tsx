import { Level } from '@tiptap/extension-heading';
import { ChainedCommands, Editor } from '@tiptap/react';
import { AlignCenter, AlignLeft, AlignRight, Bold, Code2, ImageIcon, Italic, Strikethrough, Underline } from 'lucide-react';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ToolbarEditorProps {
  editor: Editor | null;
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const tools = [
  {
    task: 'bold',
    icon: Bold,
    level: null,
  },
  {
    task: 'italic',
    icon: Italic,
    level: null,
  },
  {
    task: 'underline',
    icon: Underline,
    level: null,
  },
  {
    task: 'strike',
    icon: Strikethrough,
    level: null,
  },
  {
    task: 'codeblock',
    icon: Code2,
    level: null,
  },
  {
    task: 'left',
    icon: AlignLeft,
    level: null,
  },
  {
    task: 'center',
    icon: AlignCenter,
    level: null,
  },
  {
    task: 'right',
    icon: AlignRight,
    level: null,
  },
] as const;

type TaskType = (typeof tools)[number]['task'];

const chainMethods = (editor: Editor | null, command: (chain: ChainedCommands) => ChainedCommands) => {
  if (!editor) return;

  command(editor.chain().focus()).run();
};

export default function ToolbarEditor({ editor, handleImageUpload }: ToolbarEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnClick = (task: TaskType, level: Level | null, editor: Editor) => {
    switch (task) {
      case 'bold':
        return chainMethods(editor, (chain) => chain.toggleBold());
      case 'italic':
        return chainMethods(editor, (chain) => chain.toggleItalic());
      case 'underline':
        return chainMethods(editor, (chain) => chain.toggleUnderline());
      case 'strike':
        return chainMethods(editor, (chain) => chain.toggleStrike());
      case 'codeblock':
        chainMethods(editor, (chain) => chain.toggleCodeBlock());

        editor?.chain().focus().updateAttributes('codeBlock', { language: 'javascript' }).run();
        return;
      case 'left':
        return chainMethods(editor, (chain) => chain.setTextAlign('left'));
      case 'center':
        return chainMethods(editor, (chain) => chain.setTextAlign('center'));
      case 'right':
        return chainMethods(editor, (chain) => chain.setTextAlign('right'));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Membuka file input
    }
  };

  const handleChange = (value: string) => {
    if (!editor) return;

    switch (value) {
      case 'heading-1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'heading-2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'heading-3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'paragraph':
        editor.chain().focus().setParagraph().run();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2 space-x-1 sm:flex-row sm:space-y-0">
        <div className="grid gap-1 lg:grid-cols-2">
          <Select disabled={editor?.isActive('codeBlock')} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose text style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heading-1">Heading 1</SelectItem>
              <SelectItem value="heading-2">Heading 2</SelectItem>
              <SelectItem value="heading-3">Heading 3</SelectItem>
              <SelectItem value="paragraph">Paragraph</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="gap-1 space-x-1 sm:grid sm:grid-cols-4 sm:space-x-0 lg:grid-cols-9">
          {tools.map((item, i) => {
            return (
              <Button
                key={i}
                type="button"
                variant={
                  item.task === 'codeblock'
                    ? editor?.isActive('codeBlock')
                      ? 'default'
                      : 'outline'
                    : editor?.isActive(item.task) || editor?.isActive({ textAlign: item.task })
                      ? 'default'
                      : 'outline'
                }
                size={'icon'}
                onClick={() => handleOnClick(item.task, item.level, editor!)} // Kirim level heading ke handler
              >
                <item.icon className="h-4 w-4" />
              </Button>
            );
          })}
          <Button type="button" variant="outline" size="icon" onClick={handleButtonClick}>
            <input
              ref={fileInputRef}
              // id="dropzone-file"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <ImageIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
