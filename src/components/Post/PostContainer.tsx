import { Box } from "@mui/material";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";

const PostContainer = () => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      width="98.8vw"
      height="91.4vh"
      display="flex"
      flexDirection="row"
      pt={1}
    >

  <Box width="27%" top={0} left={0}>
        <LeftSection />
      </Box>

      
      <Box width="46%">
        <MiddleSection />
      </Box>

      <Box width="27%" position="sticky" top={0} left={0}>
        <RightSection />
      </Box>


    
    </Box>
  );
};

export default PostContainer;
