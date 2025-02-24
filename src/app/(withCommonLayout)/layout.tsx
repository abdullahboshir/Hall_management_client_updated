import Navbar from "@/components/Shared/Navbar/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  console.log("whatttttttttttttttttttt", children);
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default CommonLayout;
