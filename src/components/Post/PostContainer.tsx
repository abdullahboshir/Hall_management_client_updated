import { Box } from "@mui/material";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";

const PostContainer = () => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100%"
      height={{ xs: "auto", sm: "auto", md: "91.4vh" }}
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      pt={1}
      gap={{ xs: 2, md: 0 }}
    >
      {/* Left Section - Hidden on mobile, visible on larger screens */}
      <Box 
        width={{ xs: "100%", md: "27%" }} 
        display={{ xs: "none", md: "block" }}
        top={0} 
        left={0}
      >
        <LeftSection />
      </Box>
      
      {/* Middle Section - Full width on mobile, 46% on larger screens */}
      <Box width={{ xs: "100%", md: "46%" }}>
        <MiddleSection />
      </Box>

      {/* Right Section - Hidden on mobile, visible on larger screens */}
      <Box 
        width={{ xs: "100%", md: "27%" }} 
        display={{ xs: "none", md: "block" }}
        position="sticky" 
        top={0} 
        left={0}
      >
        <RightSection />
      </Box>
    </Box>
  );
};

export default PostContainer;
