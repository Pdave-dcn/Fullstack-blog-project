import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import type { ArticleStatus } from "@/zodSchemas/article.zod";

interface NewArticleFormProps {
  onSubmit: (title: string, content: string, status: ArticleStatus) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const NewArticleForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
}: NewArticleFormProps) => {
  const [title, setTitle] = useState("");
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleSubmit = (status: ArticleStatus) => {
    if (!editorRef.current) return;
    const content = editorRef.current?.getContent();
    onSubmit(title, content, status);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter your article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex-1 h-[calc(100%-120px)]">
          <Label>Content</Label>
          <div className="h-full">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onInit={(_evt, editor) => {
                editorRef.current = editor;
              }}
              disabled={isSubmitting}
              init={{
                height: "100%",
                min_height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #F8F8F8; }",
                resize: false,
                autoresize_bottom_margin: 0,
              }}
            />
          </div>
        </div>

        <div className="sticky bottom-2 flex justify-end space-x-4 pt-4 bg-background border-t">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSubmit("DRAFT")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
};
