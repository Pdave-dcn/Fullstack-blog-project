import { ABOUTPAGE_DATA } from "@/lib/about-page-data";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-tokens";
import { Separator } from "../ui/separator";

export const AboutMeSection = () => {
  return (
    <section className={cn(spacing.padding_x)}>
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="text-center md:text-start">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            {ABOUTPAGE_DATA.aboutMe.heading}
          </h2>
          <p className="text-start text-xl leading-relaxed lg:text-2xl lg:w-[75%]">
            {ABOUTPAGE_DATA.aboutMe.paragraph}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8">
          {ABOUTPAGE_DATA.aboutMe.features.map((feature, index) => {
            return (
              <>
                <div key={feature.id} className="flex flex-col gap-3">
                  <h3 className="font-semibold text-xl">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                {index < ABOUTPAGE_DATA.aboutMe.features.length - 1 && (
                  <Separator className="md:hidden" />
                )}
                {index < ABOUTPAGE_DATA.aboutMe.features.length - 1 && (
                  <Separator
                    orientation="vertical"
                    className="hidden md:block"
                  />
                )}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};
