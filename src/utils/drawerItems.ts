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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const drawerItems = (role: TUserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaulltMenu = [
    {
      title: "Notices",
      path: `${role}/notice`,
      icon: CampaignIcon,
    },
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: AccountCircleIcon,
    },
    {
      title: "Support / Help ",
      path: `${role}/support `,
      icon: AccountCircleIcon,
    },
  ];

  const adminSharedMenus = [
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
      title: "Dining",
      path: `${role}/dining`,
      icon: DiningIcon,
    },
    {
      title: "Dining Reports",
      path: `${role}/dining-reports`,
      icon: DiningIcon,
    },
  ];

  switch (role) {
    case USER_ROLE.superAdmin:
      roleMenus.push(...adminSharedMenus);
      roleMenus.push(
        {
          title: "Hall",
          path: `${role}/hall`,
          icon: WarehouseIcon,
        },
        {
          title: "Audit Logs",
          path: `${role}/audit-logs`,
          icon: WarehouseIcon,
        }
      );
      break;

    case USER_ROLE.admin:
      roleMenus.push(...adminSharedMenus);
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
          title: "Daily Reports",
          path: `${role}/daily-reports`,
          icon: WarehouseIcon,
        }
      );
      break;

    case USER_ROLE.moderator:
      break;

    case USER_ROLE.student:
      roleMenus.push(
        {
          title: "My Meals",
          path: `${role}/my-meals`,
          icon: DiningIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: DiningIcon,
        },
        {
          title: "Complaints",
          path: `${role}/complaints`,
          icon: DiningIcon,
        }
      );
      break;
    default:
      break;
  }

  return [...roleMenus, ...defaulltMenu];
};
