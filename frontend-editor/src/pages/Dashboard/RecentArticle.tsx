import { handleDate } from "@/lib/utils";

const RecentArticle = ({
  title,
  updatedAt,
  status,
}: {
  title: string;
  updatedAt: string;
  status: "published" | "draft";
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-muted-foreground last:border-0">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">
          Updated on {handleDate(updatedAt)}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "published"
              ? "bg-primary text-secondary"
              : "bg-accent text-foreground"
          }`}
        >
          {status === "published" ? "Published" : "Draft"}
        </span>
      </div>
    </div>
  );
};

export default RecentArticle;
