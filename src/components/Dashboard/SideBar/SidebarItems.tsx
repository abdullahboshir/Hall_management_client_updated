import { DrawerItem } from "@/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type IProps = {
  item: DrawerItem;
};

const SidebarItems = ({ item }: IProps) => {
  const LinkPath = `/dashboard/${item?.path}`;
  const pathname = usePathname();

  return (
    <Link href={LinkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === LinkPath
            ? {
                borderRight: "3px solid #6200EE",
                "& svg": {
                  color: "#6200EE",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton
          sx={{
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: { xs: 30, sm: 40 },
              "& svg": {
                fontSize: { xs: '18px', sm: '20px', md: '24px' }
              }
            }}
          >
            {item?.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText 
            primary={item?.title} 
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: { xs: '12px', sm: '14px', md: '16px' }
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItems;
