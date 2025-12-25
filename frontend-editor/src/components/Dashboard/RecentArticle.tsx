import { handleDate } from "@/lib/utils";

export const RecentArticle = ({
  title,
  updatedAt,
  status,
}: {
  title: string;
  updatedAt: string;
  status: "PUBLISHED" | "DRAFT";
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
            status === "PUBLISHED"
              ? "bg-primary text-background dark:text-foreground"
              : "bg-accent text-foreground dark:text-background"
          }`}
        >
          {status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
        </span>
      </div>
    </div>
  );
};
