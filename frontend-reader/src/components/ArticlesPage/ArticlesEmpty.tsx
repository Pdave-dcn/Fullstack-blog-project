export const ArticlesEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">No articles yet</h3>
        <p className="text-muted-foreground max-w-md">
          There are no published articles at the moment. Check back soon!
        </p>
      </div>
    </div>
  );
};
