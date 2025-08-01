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
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import BusinessIcon from "@mui/icons-material/Business";
import PasswordIcon from "@mui/icons-material/Password";

export const drawerItems = (role: TUserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenu = [
    {
      title: "Notifications",
      path: `${role}/notifications`,
      icon: CircleNotificationsIcon,
    },
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: AccountCircleIcon,
    },
    {
      title: "Change Password",
      path: `${role}/change-password`,
      icon: PasswordIcon,
    },
    {
      title: "Dining Report",
      path: `${role}/dining-report`,
      icon: ReportIcon,
    },
    {
      title: "Support / Help ",
      path: `${role}/support `,
      icon: HelpIcon,
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
      title: "Notices",
      path: `${role}/notice`,
      icon: CampaignIcon,
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
          icon: BusinessIcon,
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
      
      );
      break;
    default:
      break;
  }

  return [...roleMenus, ...defaultMenu];
};
