import { ABOUTPAGE_DATA } from "@/lib/about-page-data";
import { layout, spacing, typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Moon_4 } from "../ui/svgs";

export const AboutPageHeader = () => {
  return (
    <section className={cn(layout.headerSection)}>
      <div className={cn(spacing.padding_x, layout.heroSection, "text-start")}>
        <h1 className={cn(typography.hero.title, "mb-6")}>
          {ABOUTPAGE_DATA.header.title}
        </h1>
        <p className={cn(typography.hero.subtitle)}>
          {ABOUTPAGE_DATA.header.subtitle}
        </p>
      </div>
      <div className="hidden md:block">
        <Moon_4 />
      </div>
    </section>
  );
};
