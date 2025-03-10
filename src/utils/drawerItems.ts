import { USER_ROLE } from "@/constant/role";
import { DrawerItem, TUserRole } from "@/types";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PersonIcon from "@mui/icons-material/Person";
import CampaignIcon from "@mui/icons-material/Campaign";
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
          title: "Admin",
          path: `${role}/admin`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Manager",
          path: `${role}/manager`,
          icon: SupervisorAccountIcon,
        },
        {
          title: "Moderator",
          path: `${role}/moderator`,
          icon: AddModeratorIcon,
        },
        {
          title: "Student",
          path: `${role}/student`,
          icon: PersonAddAltIcon,
        },
        {
          title: "Hall",
          path: `${role}/hall`,
          icon: WarehouseIcon,
        },
        {
          title: "Dining",
          path: `${role}/dining`,
          icon: DiningIcon,
        },
        {
          title: "Notices",
          path: `${role}/notices`,
          icon: CampaignIcon,
        }
      );
      break;

    case USER_ROLE.admin:
      roleMenus.push(
        {
          title: "Admin",
          path: `${role}/admin`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Manager",
          path: `${role}/manager`,
          icon: SupervisorAccountIcon,
        },
        {
          title: "Moderator",
          path: `${role}/moderator`,
          icon: AddModeratorIcon,
        },
        {
          title: "Student",
          path: `${role}/student`,
          icon: PersonAddAltIcon,
        },
        {
          title: "Notices",
          path: `${role}/notices`,
          icon: CampaignIcon,
        }
      );
      break;

    case USER_ROLE.manager:
      roleMenus.push(
        {
          title: "Dining",
          path: `${role}/dining`,
          icon: DiningIcon,
        },
        {
          title: "Meals",
          path: `${role}/meal`,
          icon: WarehouseIcon,
        },
        {
          title: "Notices",
          path: `${role}/notices`,
          icon: CampaignIcon,
        }
      );
      break;

    case USER_ROLE.moderator:
      roleMenus.push({
        title: "Notices",
        path: `${role}/notices`,
        icon: CampaignIcon,
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
