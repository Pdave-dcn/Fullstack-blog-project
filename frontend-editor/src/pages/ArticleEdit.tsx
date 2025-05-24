import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import type { Editor as TinyMCEEditor } from "tinymce";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { MessageLoading } from "@/components/ui/MessageLoading";

interface Article {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft";
  createdAt: string;
}

const ArticleEdit = () => {
  const { id } = useParams<{ id: string }>();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    data: article,
    error: articleError,
    loading: articleLoading,
  } = useDataFetching<Article>("http://localhost:3000/api", `/posts/${id}`);

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

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent();

    if (!title.trim() || !content?.trim()) {
      toast.warning("Title and content are required.");
      return;
    }

    const articleData = { title, content };

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(articleData),
      }
    );

    if (response.ok) {
      toast.success("Article updated successfully!");
      navigate("/articles");
    } else {
      const errorData = await response.json();
      toast.error("Failed to update article", {
        description: errorData.message,
      });
    }
  };

  if (articleLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <MessageLoading />
      </div>
    );
  }

  if (!article) {
    return (
      <div title="Article Not Found">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold">Article not found</h2>
          <p className="mt-2">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => handleNavigation("articles")}
          >
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  if (articleError) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <p>A network error was encountered</p>
      </div>
    );
  }

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
          />
        </div>

        <div className="flex-1 h-[calc(100%-120px)]">
          <Label>Content</Label>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(evt, editor) => {
              editorRef.current = editor;
              if (article) {
                editor.setContent(article.content);
              }
            }}
            initialValue={article?.content || ""}
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
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Article</Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
