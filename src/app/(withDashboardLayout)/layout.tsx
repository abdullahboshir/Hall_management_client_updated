"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import { isUserLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  if (!isUserLoggedIn()) {
    return router.push("/login");
  }

  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
