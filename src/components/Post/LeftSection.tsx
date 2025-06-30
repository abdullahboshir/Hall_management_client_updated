import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import { Box } from "@mui/material";
import Spinner from "../Shared/Spinner/Spinner";

const LeftSection = () => {

    

  const { data, isLoading } = useGetAllNoticesQuery({});


  if (isLoading) {
    return   <Spinner/>
  }

    return (
             <Box bgcolor='primary.light' height='100vh' borderRadius={2} p={2}>
  <Box bgcolor='white' px={3} py={2} borderRadius={1}>
{
    data?.slice(0, 3).map((notice: any) => (
        <Box key={notice._id} p={1} my={5} borderColor='grey.300'>
            <Box fontWeight='bold' mb={1}>{notice.title}</Box>
            <Box color='text.secondary'>{notice.description.length > 60? notice.description.slice(0, 60) + '...' : notice.description}</Box>
            <Box mt={1} fontSize='small' color='primary.main'> {notice.createdBy?.fullName}</Box>
        </Box>
    ))
}
  </Box>
        </Box>
    )
}


export default LeftSection;