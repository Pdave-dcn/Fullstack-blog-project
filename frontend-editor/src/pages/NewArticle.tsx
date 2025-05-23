import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import type { Editor as TinyMCEEditor } from "tinymce";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (status: "draft" | "published") => {
    if (!editorRef.current) return;
    const content = editorRef.current?.getContent();

    if (!title.trim() || !content.trim()) {
      toast.warning("Title and content are required.");
      return;
    }

    const articleData = { title, content, status };

    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", errorData.message);
      toast.error("Failed to create Article", {
        description: errorData.message,
      });

      return;
    }

    if (response.ok) {
      toast.success(
        `Article ${status === "published" ? "published" : "saved as draft"}!`
      );
      navigate("/articles");
    } else {
      toast.error("Something went wrong.");
    }
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
            className=""
          />
        </div>

        <div className="flex-1 h-[calc(100%-120px)]">
          <Label>Content</Label>
          <div className="h-full">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
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
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSubmit("draft")}>
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit("published")}>Publish</Button>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
