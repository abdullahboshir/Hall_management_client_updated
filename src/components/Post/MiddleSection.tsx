'use client';

import { Box, Grid2, Stack, Typography, Button } from '@mui/material';
import CreatePost from './CreatePost';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { useGetAllPostsQuery, useUpdateLikeMutation } from '@/redux/api/postApi';
import Image from 'next/image';

const PAGE_SIZE = 5;

const MiddleSection = () => {
  const [open, setOpen] = useState(false);
  const { data: userData } = useGetSingleUserQuery({});
  const { data: allPosts, refetch } = useGetAllPostsQuery({});
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

if(allPosts){
      console.log('isssssssssssssssssssavtiveeeeeeeeee',  allPosts.map((post: any) => post.likes))
}

  const lastPostRef = useRef<HTMLDivElement | null>(null);

  // Load more posts when scroll reaches end
  const loadMorePosts = useCallback(() => {
    if (allPosts) {
      const start = (page - 1) * PAGE_SIZE;
      const end = page * PAGE_SIZE;
      setVisiblePosts((prev) => [...prev, ...allPosts.slice(start, end)]);
    }
  }, [allPosts, page]);

  useEffect(() => {
    loadMorePosts();
  }, [page, loadMorePosts]);

  // IntersectionObserver to detect when to load more
  useEffect(() => {
    if (!lastPostRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visiblePosts.length < allPosts?.length) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(lastPostRef.current);

    return () => observer.disconnect();
  }, [visiblePosts, allPosts]);



  

    const [updateLike] = useUpdateLikeMutation();

  
const handlePostUpdate = async (id: string) => {
  try {
    const res = await updateLike({ id }).unwrap();
    if (res?._id) {
      console.log('like updated:', res.likes);
      const refreshed = await refetch(); // fetch latest posts from backend

      // Reset visiblePosts from fresh data
      const all = refreshed?.data || [];
      const start = 0;
      const end = page * PAGE_SIZE;
      setVisiblePosts(all.slice(start, end));
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};




  return (
    <Box px={2} height="100%">
      {open && <CreatePost open={open} setOpen={setOpen} />}

      <Stack>
        <Box>
          <Grid2 container spacing={2} gap={1}>
            <Grid2 size={12}>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="primary.light"
                p={2}
                borderRadius={2}
              >
                  <Box  bgcolor='white' px={7} py={2} borderRadius={1}>
                <Box
                  onClick={() => setOpen(true)}
                  width="30vw"
                  height="6vh"
                  border={1}
                  borderRadius={2}
                  borderColor="secondary.light"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ cursor: 'pointer' }}
                >
                     <Typography>Type your post here...</Typography>
                 </Box>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={12}>
              <Box bgcolor="primary.light" p={2} borderRadius={2}>
          

                <Box mt={2} display="flex" flexDirection="column" gap={3}>
                  {visiblePosts.map((post: any, i: number) => {
                    const isLast = i === visiblePosts.length - 1;
                    return (
                      <Box
                        key={post._id}
                        ref={isLast ? lastPostRef : null}
                        p={3}
                        borderRadius={3}
                        boxShadow={3}
                        bgcolor="background.paper"
                        sx={{
                          transition: 'all 0.6s ease',
                          transform: 'scale(1)',
                          opacity: 1,
                        }}
                      >
                        {/* Header */}
                        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                          <Image
                            width={50}
                            height={50}
                            alt="profile-picture"
                            src={userData?.profileImg || '/default-avatar.png'}
                            style={{ borderRadius: '50%', marginRight: '12px' }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {userData?.fullName || 'User'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {userData?.role || 'Role'}
                            </Typography>
                          </Box>

                          <Box display="flex" flexDirection="column" alignItems="flex-start" ml="auto">
                            <Typography variant="caption" color="text.secondary" fontSize={16}>
                              {new Date(post.createdAt).toTimeString().split(' ')[0]}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontSize={16}>
                              {new Date(post.createdAt).getDate() +
                                '/' +
                                (new Date(post.createdAt).getMonth() + 1) +
                                '/' +
                                new Date(post.createdAt).getFullYear()}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Title & Description */}
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {post.description}
                        </Typography>

                        {/* Images */}
                        {post?.images?.length > 0 && (
                          <Box
                            mt={2}
                            display="grid"
                            gridTemplateColumns={`repeat(auto-fit, minmax(130px, 1fr))`}
                            gap={1}
                            borderRadius={2}
                            overflow="hidden"
                          >
                            {post.images.slice(0, 5).map((img: string, idx: number) => (
                              <Box
                                key={idx}
                                position="relative"
                                width="100%"
                                pt="100%"
                                borderRadius={2}
                                overflow="hidden"
                              >
                                <Image
                                  src={img}
                                  alt={`post-img-${idx}`}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                />
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* Like + Comment Buttons */}
                        <Box mt={2} display="flex" gap={2}>
                          <Button onClick={() => handlePostUpdate(post?._id)} size="small" variant={post.likes.includes(userData?._id)? "contained" :  "outlined"} sx={{ p: 2 }}>
                              👍 Like 
                          </Button>
                          <Button size="small" variant="outlined">
                            💬 Comment
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Stack>
    </Box>
  );
};

export default MiddleSection;
