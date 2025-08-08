import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import { Box, Typography } from "@mui/material";
import Spinner from "../Shared/Spinner/Spinner";

const LeftSection = () => {  

  const { data, isLoading } = useGetAllNoticesQuery({isAllNotifications: true});

  if (isLoading) {
    return   <Spinner/>
  }

    return (
             <Box 
               bgcolor='primary.light' 
               height={{ xs: 'auto', md: '100vh' }} 
               borderRadius={2} 
               p={{ xs: 1, sm: 2 }}
               overflow="auto"
             >
  <Box borderRadius={1}>

<Box 
  fontWeight='bold' 
  mb={2} 
  fontSize={{ xs: 16, sm: 18, md: 20 }} 
  color='primary.main' 
  bgcolor={'white'} 
  p={{ xs: 0.5, sm: 1 }} 
  borderRadius={1} 
  textAlign='center'
>
  Recent Notices
</Box>

{
    data?.slice(0, 3).map((notice: any) => (
        <Box 
          key={notice._id} 
          p={{ xs: 1, sm: 2 }} 
          mb={2} 
          borderColor='grey.300' 
          bgcolor='white' 
          borderRadius={2}
        >
            <Box 
              fontWeight='bold'
              fontSize={{ xs: 14, sm: 16 }}
            >
              {notice.title}
            </Box>
            <Box 
              color='text.secondary'
              fontSize={{ xs: 12, sm: 14 }}
            >
              {notice.description.length > 60? notice.description.slice(0, 60) + '...' : notice.description}
            </Box>
            <Box 
              display={'flex'} 
              justifyContent={'space-between'} 
              mt={1} 
              fontSize='small'
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={{ xs: 0.5, sm: 0 }}
            > 
              <Typography  
                color='primary.main'
                fontSize={{ xs: 12, sm: 14 }}
              >
                {notice.createdBy?.fullName}
              </Typography>             
              <Typography 
                variant="caption" 
                color="text.secondary" 
                fontSize={{ xs: 12, sm: 16 }}
              >
                {new Date(notice?.createdAt).getDate() +
                  '/' +
                  (new Date(notice?.createdAt).getMonth() + 1) +
                  '/' +
                  new Date(notice?.createdAt).getFullYear()}
              </Typography>
            </Box>
        </Box>
    ))
}
  </Box>
        </Box>
    )
}

export default LeftSection;