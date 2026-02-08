import {useEditor,EditorContent} from '@tiptap/react'
import StarterKit from'@tiptap/starter-kit'
import './richTextEditor.css'

export default function RichTextEditor({value,onChange}){
    const editor=useEditor({
        extensions:[StarterKit],
        content:value,
        onUpdate:({editor})=>{
            onChange(editor.getHTML());
        },
    });

    if(!editor) return null;

    return(
        <div className="editor-wrapper">
            {/* toolbar */}
            <div className="editor-toolbar">
                <button
                    type='button'
                    onClick={()=>editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold')?'active':''}
                >
                    B
                </button>

              <button
                    type='button'
                    onClick={()=>editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic')?'active':''}
                >
                    I
                </button>

                  <button
                    type='button'
                    onClick={()=>editor.chain().focus().toggleBulletList().run()}
                >
                    •List
                </button>

                  <button
                    type='button'
                    onClick={()=>editor.chain().focus().toggleHeading({level:2}).run()}
                >
                    H2
                </button>
            </div>

            {/* editor */}
            <EditorContent editor={editor} className='editor'/>
        </div>
    )
}