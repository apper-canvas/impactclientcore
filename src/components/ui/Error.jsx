import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading this data.", 
  onRetry 
}) => {
  return (
    <Card className="p-12 text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600">{message}</p>
      </div>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </Card>
  );
};

export default Error;