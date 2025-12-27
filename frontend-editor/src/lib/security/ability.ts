import {
  AbilityBuilder,
  createMongoAbility,
  type MongoAbility,
} from "@casl/ability";

import type { Comment } from "@/zodSchemas/comment.zod";
import type { Article } from "@/zodSchemas/article.zod";
import type { Role } from "@/zodSchemas/auth.zod";

export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "publish"
  | "unpublish";

export type Subjects =
  | "Article"
  | ({ __type: "Article" } & Pick<Article, "id">)
  | "Comment"
  | ({ __type: "Comment" } & Pick<Comment, "id" | "authorId">)
  | "all";

export type AppAbility = MongoAbility<[Action, Subjects]>;

export const createAbility = (user: { id: string; role: Role }) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  can("read", "all");

  if (user.role === "READER") {
    can("create", "Comment");
    can("update", "Comment", { authorId: user.id });
    can("delete", "Comment", { authorId: user.id });
  }

  if (user.role === "AUTHOR") {
    can("create", "Article");
    can("update", "Article");
    can("delete", "Article");
    can("publish", "Article");
    can("unpublish", "Article");

    can("create", "Comment");
    can("update", "Comment", { authorId: user.id });
    can("delete", "Comment");
  }

  if (user.role === "GUEST") {
    can("publish", "Article");
    can("unpublish", "Article");

    can("create", "Comment");
    can("update", "Comment", { authorId: user.id });
    can("delete", "Comment", { authorId: user.id });
  }

  return build({
    detectSubjectType: (item: unknown) => {
      const obj = item as Record<string, unknown>;
      return (obj.__type as "Article" | "Comment") || "all";
    },
  });
};
