 
import { Box, List, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import SidebarItems from "./SidebarItems";
import { getUserInfo } from "@/services/auth.services";

const SideBar = () => {
  const [userRole, setUserRole] = useState("") as any;
  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        paddingY={1}
        component={Link}
        href={userRole === 'student'? '/' : `/dining`}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 0.5, sm: 1 },
          py: { xs: 0.5, sm: 1 }
        }}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/bn/b/b2/%E0%A6%95%E0%A7%81%E0%A6%AE%E0%A6%BF%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A6%BE_%E0%A6%AD%E0%A6%BF%E0%A6%95%E0%A7%8D%E0%A6%9F%E0%A7%8B%E0%A6%B0%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE_%E0%A6%B8%E0%A6%B0%E0%A6%95%E0%A6%BE%E0%A6%B0%E0%A6%BF_%E0%A6%95%E0%A6%B2%E0%A7%87%E0%A6%9C%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.png"
          width={40}
          height={40}
          alt="versity logo"
        />
        <Typography 
          variant="h6" 
          component="h1"
          fontSize={{ xs: '14px', sm: '16px', md: '20px' }}
          textAlign={{ xs: 'center', sm: 'left' }}
        >
          Hall Management
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole).map((item, index) => (
          <SidebarItems key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
