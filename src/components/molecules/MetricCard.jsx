import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ title, value, icon, trend, color = "accent" }) => {
  const colorClasses = {
    accent: "text-accent",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
    info: "text-info"
  };

  return (
    <Card hoverable className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className={`text-3xl font-bold bg-gradient-to-r from-${color} to-${color}/80 bg-clip-text text-transparent`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <ApperIcon 
                name={trend.type === "up" ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                className={trend.type === "up" ? "text-success" : "text-error"}
              />
              <span className={`text-sm ml-1 ${trend.type === "up" ? "text-success" : "text-error"}`}>
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br from-${color}/10 to-${color}/5`}>
          <ApperIcon name={icon} size={24} className={colorClasses[color]} />
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;