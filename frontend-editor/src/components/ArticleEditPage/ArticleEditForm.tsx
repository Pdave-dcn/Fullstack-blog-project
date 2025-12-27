import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import type { Article } from "@/zodSchemas/article.zod";
import { useAuthStore } from "@/stores/auth.store";

interface ArticleEditFormProps {
  article: Article;
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ArticleEditForm = ({
  article,
  onSubmit,
  onCancel,
  isSubmitting,
}: ArticleEditFormProps) => {
  const { ability } = useAuthStore();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState(article.title);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      if (
        editorRef.current &&
        editorRef.current.getContent() !== article.content
      ) {
        editorRef.current.setContent(article.content);
      }
    }
  }, [article]);

  const handleSubmit = () => {
    const content = editorRef.current?.getContent() || "";
    onSubmit(title, content);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your article title"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex-1 h-[calc(100%-120px)]">
          <Label>Content</Label>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(_evt, editor) => {
              editorRef.current = editor;
              if (article) {
                editor.setContent(article.content);
              }
            }}
            initialValue={article?.content || ""}
            disabled={isSubmitting}
            init={{
              height: 500,
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
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !ability?.can("update", "Article")}
          >
            {isSubmitting ? "Updating..." : "Update Article"}
          </Button>
        </div>
      </div>
    </div>
  );
};
