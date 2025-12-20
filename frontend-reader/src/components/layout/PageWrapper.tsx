import Header from "./Header";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="">
        <Header />
        {children}
      </div>
    </div>
  );
};

PageWrapper.displayName = "PageWrapper";
