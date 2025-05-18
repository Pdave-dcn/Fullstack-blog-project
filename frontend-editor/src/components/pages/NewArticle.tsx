import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

const ArticleEditorForm = () => {
  const [title, setTitle] = useState("");
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (status: "draft" | "published") => {
    const content = editorRef.current?.getContent();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }

    const articleData = { title, content, status };

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (response.ok) {
      alert(
        `Article ${status === "published" ? "published" : "saved as draft"}!`
      );
      navigate("/articles");
    } else {
      alert("Something went wrong.");
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
            className="w-md"
          />
        </div>

        <div className="flex-1 h-[calc(100%-120px)]">
          <Label>Content</Label>
          <div className="h-full">
            <Editor
              apiKey="no-api-key"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Start writing your article here...</p>"
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
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                resize: false,
                autoresize_bottom_margin: 0,
              }}
            />
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end space-x-4 pt-4 bg-white border-t">
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

export default ArticleEditorForm;
