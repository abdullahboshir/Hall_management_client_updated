import { Box, Typography } from "@mui/material";
import Spinner from "../Shared/Spinner/Spinner";
import { useGetAllPostsQuery } from "@/redux/api/postApi";

const RightSection = () => {

  const { data, isLoading } = useGetAllPostsQuery({});

  const top3Likes = data && data.slice().sort((a: any, b: any) =>  b.likes.length - a.likes.length).slice(0, 3)

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
  Top 3 Liked Posts 
</Box>

{
    top3Likes?.map((post: any) => (
        <Box 
          key={post._id} 
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
              {post.title}
            </Box>
            <Box 
              color='text.secondary'
              fontSize={{ xs: 12, sm: 14 }}
            >
              {post.description.length > 60? post.description.slice(0, 60) + '...' : post.description}
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
                {post.createdBy?.fullName}
              </Typography>             
              <Typography 
                variant="caption" 
                color="text.secondary" 
                fontSize={{ xs: 12, sm: 16 }}
              >
                {new Date(post?.createdAt).getDate() +
                  '/' +
                  (new Date(post?.createdAt).getMonth() + 1) +
                  '/' +
                  new Date(post?.createdAt).getFullYear()}
              </Typography>
            </Box>
        </Box>
    ))
}
  </Box>
        </Box>
    )
}

export default RightSection;