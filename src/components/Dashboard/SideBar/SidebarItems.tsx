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
        <ListItemButton>
          <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item?.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItems;
