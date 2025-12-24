import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className="p-2 bg-accent rounded-md">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
