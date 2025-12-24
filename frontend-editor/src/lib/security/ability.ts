import {
  AbilityBuilder,
  createMongoAbility,
  type MongoAbility,
} from "@casl/ability";

import type { Comment } from "@/zodSchemas/comment.zod";

export type Role = "AUTHOR" | "READER";
export type Action = "create" | "read" | "update" | "delete";

export type Subjects =
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
    can("create", "Comment");
    can("update", "Comment", { authorId: user.id });

    can("delete", "Comment");
  }

  return build({
    detectSubjectType: (item) => item.__type ?? "Comment",
  });
};
