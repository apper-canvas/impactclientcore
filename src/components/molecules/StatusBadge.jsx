import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status, className = "" }) => {
  const getVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "qualified":
      case "won":
      case "closed":
        return "success";
      case "inactive":
      case "lost":
        return "error";
      case "lead":
      case "proposal":
        return "warning";
      case "negotiation":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Badge variant={getVariant(status)} className={className}>
      {status}
    </Badge>
  );
};

export default StatusBadge;