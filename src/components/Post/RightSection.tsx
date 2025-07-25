import { Box, Typography } from "@mui/material";
import Spinner from "../Shared/Spinner/Spinner";
import { useGetAllPostsQuery } from "@/redux/api/postApi";

const RightSection = () => {

    

  const { data, isLoading } = useGetAllPostsQuery({});

  const top3Likes = data && data.slice().sort((a: any, b: any) =>  b.likes.length - a.likes.length).slice(0, 3)

    console.log('maxxxxxxxxxxx', top3Likes)
    // console.log('check', data?.slice().sort((a, b) => ))


  if (isLoading) {
    return   <Spinner/>
  }

    return (
             <Box bgcolor='primary.light' height='100vh' borderRadius={2} p={2}>
  <Box borderRadius={1}>

<Box fontWeight='bold' mb={2} fontSize={20} color='primary.main' bgcolor={'white'} p={1} borderRadius={1} textAlign='center'>
  Top 3 Liked Posts 
</Box>

{
    top3Likes?.map((post: any) => (
        <Box key={post._id} p={2} mb={2} borderColor='grey.300' bgcolor='white' borderRadius={2}>
            <Box fontWeight='bold'>{post.title}</Box>
            <Box color='text.secondary'>{post.description.length > 60? post.description.slice(0, 60) + '...' : post.description}</Box>
            <Box display={'flex'} justifyContent={'space-between'} mt={1} fontSize='small'> <Typography  color='primary.main'>{post.createdBy?.fullName}</Typography>             <Typography variant="caption" color="text.secondary" fontSize={16}>
                              {new Date(post?.createdAt).getDate() +
                                '/' +
                                (new Date(post?.createdAt).getMonth() + 1) +
                                '/' +
                                new Date(post?.createdAt).getFullYear()}
                            </Typography></Box>
        </Box>
    ))
}
  </Box>
        </Box>
    )
}


export default RightSection;