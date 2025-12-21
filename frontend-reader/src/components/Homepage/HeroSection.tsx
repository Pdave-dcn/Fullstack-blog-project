import { HOMEPAGE_DATA } from "@/lib/homepage-data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Moon_4 } from "../ui/svgs";
import { cn } from "@/lib/utils";
import { layout, spacing, typography } from "@/lib/design-tokens";

export const HeroSection = () => {
  return (
    <section className={cn(layout.headerSection)}>
      <div className={cn(spacing.padding_x, layout.heroSection)}>
        <h1 className={cn(typography.hero.title, "mb-6")}>
          {HOMEPAGE_DATA.hero.title}
        </h1>
        <p className={cn(typography.hero.subtitle, "mb-8")}>
          {HOMEPAGE_DATA.hero.subtitle}
        </p>
        <div>
          <Link to="/articles">
            <Button size="lg" variant="secondary">
              {HOMEPAGE_DATA.hero.ctaText}
              <div className="ml-2">
                <ArrowRight size={20} />
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Moon_4 />
      </div>
    </section>
  );
};
