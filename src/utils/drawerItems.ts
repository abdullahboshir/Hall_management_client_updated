import { USER_ROLE } from "@/constant/role";
import { DrawerItem, TUserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DiningIcon from "@mui/icons-material/Dining";

export const drawerItems = (role: TUserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.superAdmin:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage - Users",
          path: `${role}/manage-users`,
          icon: GroupIcon,
        }
      );
      break;

    case USER_ROLE.admin:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "manager",
          path: `${role}/manager`,
          icon: PersonIcon,
        },
        {
          title: "moderator",
          path: `${role}/moderator`,
          icon: AddModeratorIcon,
        },
        {
          title: "student",
          path: `${role}/student`,
          icon: PersonAddAltIcon,
        },
        {
          title: "hall",
          path: `${role}/hall`,
          icon: WarehouseIcon,
        },
        {
          title: "dining",
          path: `${role}/dining`,
          icon: DiningIcon,
        }
      );
      break;

    case USER_ROLE.manager:
      roleMenus.push(
        {
          title: "hall",
          path: `${role}/hall`,
          icon: WarehouseIcon,
        },
        {
          title: "dining",
          path: `${role}/dining`,
          icon: DiningIcon,
        }
      );
      break;

    case USER_ROLE.moderator:
      roleMenus.push({
        title: "declaration",
        path: `${role}/declaration`,
        icon: DiningIcon,
      });
      break;

    case USER_ROLE.student:
      roleMenus.push(
        {
          title: "Meal Information",
          path: `${role}/meal-Information`,
          icon: DiningIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: DiningIcon,
        }
      );
      break;
    default:
      break;
  }

  return [...roleMenus];
};
