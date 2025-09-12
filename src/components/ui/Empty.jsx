import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "Inbox",
  title = "No data found", 
  description = "Get started by adding your first item.", 
  action,
  actionLabel = "Add Item"
}) => {
  return (
    <Card className="p-12 text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={40} className="text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
      
      {action && (
        <Button onClick={action} variant="primary" size="lg">
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default Empty;