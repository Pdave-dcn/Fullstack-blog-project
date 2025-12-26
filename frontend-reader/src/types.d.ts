import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "css-doodle": React.HTMLAttributes<HTMLElement> & {
        ref?: React.Ref<HTMLElement>;
        use?: string;
      };
    }
  }
}

export {};
