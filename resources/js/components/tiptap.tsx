'use client';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import js from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/xml';
import { all, createLowlight } from 'lowlight';
import { Dispatch, SetStateAction, useEffect } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import ToolbarEditor from './toolbar-editor';

interface TiptapProps {
  content?: string;
  setContent?: (content: string) => void | Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<string | null>>;
  editable?: boolean;
}

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('php', php);
lowlight.register('javascript', js);
lowlight.register('python', python);
lowlight.register('css', css);
lowlight.register('java', java);

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
  }),
  Placeholder.configure({
    placeholder: 'Write something...',
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'javascript',
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  ImageResize.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'w-[80%] mx-auto',
    },
  }),
  Paragraph.configure({
    HTMLAttributes: {
      class: 'text-base',
    },
  }),
  Text,
];

const Tiptap = ({ content, setContent, editable = true }: TiptapProps) => {
  const editor = useEditor({
    extensions,
    content: content || '',
    editorProps: {
      attributes: {
        class: `prose-sm sm:prose-base lg:prose-lg w-full xl:prose-2xl outline-none rounded-md ${
          editable && 'min-h-[300px] border border-input p-4'
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      if (setContent) {
        setContent(editor.getHTML());
      }
    },
    immediatelyRender: false,
  });

  const uploadImageAsBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Konversi ke Base64
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await uploadImageAsBase64(file);

      // Tambahkan gambar ke editor
      editor?.chain().focus().setImage({ src: base64 }).run();
    }
  };

  // useEffect(() => {
  //   if (editor && content) {
  //     editor.commands.setContent(content); // Perbarui konten editor
  //   }
  // }, [editor, content]);

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  return (
    <div className="w-full space-y-4">
      {editable && <ToolbarEditor editor={editor} handleImageUpload={handleImageUpload} />}
      <EditorContent required={content ? true : false} editor={editor} />
    </div>
  );
};

export default Tiptap;
