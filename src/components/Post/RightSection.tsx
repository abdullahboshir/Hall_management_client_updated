import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import { Box, Typography } from "@mui/material";
import Spinner from "../Shared/Spinner/Spinner";

const RightSection = () => {

    

  const { data, isLoading } = useGetAllNoticesQuery({});


  if (isLoading) {
    return   <Spinner/>
  }

    return (
             <Box bgcolor='primary.light' height='100vh' borderRadius={2} p={2}>
  <Box borderRadius={1}>

<Box fontWeight='bold' mb={2} fontSize={20} color='primary.main' bgcolor={'white'} p={1} borderRadius={1} textAlign='center'>
  Recent Notices
</Box>

{
    data?.slice(0, 3).map((notice: any) => (
        <Box key={notice._id} p={2} mb={2} borderColor='grey.300' bgcolor='white' borderRadius={2}>
            <Box fontWeight='bold'>{notice.title}</Box>
            <Box color='text.secondary'>{notice.description.length > 60? notice.description.slice(0, 60) + '...' : notice.description}</Box>
            <Box display={'flex'} justifyContent={'space-between'} mt={1} fontSize='small'> <Typography  color='primary.main'>{notice.createdBy?.fullName}</Typography>             <Typography variant="caption" color="text.secondary" fontSize={16}>
                              {new Date(notice?.createdAt).getDate() +
                                '/' +
                                (new Date(notice?.createdAt).getMonth() + 1) +
                                '/' +
                                new Date(notice?.createdAt).getFullYear()}
                            </Typography></Box>
        </Box>
    ))
}
  </Box>
        </Box>
    )
}


export default RightSection;