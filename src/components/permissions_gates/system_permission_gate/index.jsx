import { useSelector } from "react-redux";
import { selectMySystemPermissions } from "../../../store/reducer/users";

const SystemPermissionGate = (props) => {
  const permissions = useSelector(selectMySystemPermissions);

  let hasPermission = false;
  for (const permission of props.permissions) {
    if (permissions.has(permission)) {
      hasPermission = true;
      break;
    }
  }

  if (hasPermission) {
    return props.children;
  }
  return null;
};

export default SystemPermissionGate;
