"use client";

import { Box, Grid2, Stack, Typography, Button, Divider } from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import {
  useGetAllPostsQuery,
  useUpdateLikeMutation,
  useUpdatePostBookmarkMutation,
} from "@/redux/api/postApi";
import Image from "next/image";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getTimeAgo } from "@/utils/getTimeAgo";
import CreatePost from "./CreatePost";
import Spinner from "../Shared/Spinner/Spinner";

const PAGE_SIZE = 5;

const MiddleSection = () => {
  const [open, setOpen] = useState(false);
  const { data: userData } = useGetSingleUserQuery({});
  const { data: allPosts, refetch, isLoading } = useGetAllPostsQuery({});
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

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
        if (
          entries[0].isIntersecting &&
          visiblePosts.length < allPosts?.length
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(lastPostRef.current);
    
    return () => observer.disconnect();
  }, [visiblePosts, allPosts]);
  
  const [updateLike] = useUpdateLikeMutation();
  const [updatePostBookmark] = useUpdatePostBookmarkMutation();
  
  const handlePostUpdate = async (id: string) => {
    try {
      const res = await updateLike(id).unwrap();
      if (res?._id) {
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



    const handleBookmarkUpdate = async (id: string) => {
    try {
      const res = await updatePostBookmark(id).unwrap();
      if (res?._id) {
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
  
  if(isLoading){
    return <Spinner/>
  }


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
                <Box bgcolor="white" px={7} py={2} borderRadius={1}>
                  <Box
                    onClick={() => setOpen(true)}
                    width="30vw"
                    height="6vh"
                    border={2}
                    borderRadius={2}

                    borderColor="secondary.light"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography fontWeight='bold' fontSize='1vw'>Add a Post</Typography>
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
                          transition: "all 0.6s ease",
                          transform: "scale(1)",
                          opacity: 1,
                        }}
                      >
                        {/* Header */}
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mb={2}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Box
                              position="relative"
                              width={50}
                              height={50}
                              overflow="hidden"
                              borderRadius={1}
                              // border={1}
                            >
                              <Image
                                src={
                                  post?.createdBy?.profileImg || "/default-avatar.png"
                                }
                                alt="profile-picture"
                                fill
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "top",
                                }}
                              />
                            </Box>

                            <Box ml={1.5} display="flex" flexDirection={"column"}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                lineHeight={1}
                              >
                                {post?.createdBy?.fullName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                lineHeight={1.5}
                                // mt={-0.3}
                              >
                                Posted by {post?.createdBy?.role}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                lineHeight={1}
                                // mt={-0.3}
                              >
                              <AccessTimeFilledIcon sx={{fontSize: '13px'}}/>  {getTimeAgo(post?.createdAt)} ago
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                            ml="auto"
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize={16}
                            >
                              {/* {
                                new Date(post.createdAt)
                                  .toTimeString()
                                  .split(" ")[0]
                              } */}
                              <MoreHorizIcon/>
                           
                               
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize={16}
                                onClick={() => handleBookmarkUpdate(post?._id)}
                                sx={{cursor: 'pointer'}}
                            >
                              {/* {new Date(post.createdAt).getDate() +
                                "/" +
                                (new Date(post.createdAt).getMonth() + 1) +
                                "/" +
                                new Date(post.createdAt).getFullYear()} */}
                                   {post?.bookmark.includes(userData?._id)? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                              
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />

                        {/* Title & Description */}
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          gutterBottom
                          mt={2}
                        >
                          {post?.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {post?.description}
                        </Typography>

                   {post?.images?.length > 0 && (
  <Box mt={2} display="flex" flexDirection="column" gap={1}>
    {post.images
      .slice(0, 6)
      .reduce((rows: string[][], img: string, idx: number) => {
        if (idx % 3 === 0) rows.push([img]);
        else rows[rows.length - 1].push(img);
        return rows;
      }, [])
      .map((row: any, rowIdx: any) => (
        <Box
          key={rowIdx}
          display="flex"
          gap={1}
          width="100%"
          height={150} // Adjust this if you want landscape or square
        >
          {row.map((img: string, idx: number) => (
            <Box
              key={idx}
              flex={1}
              position="relative"
              // borderRadius={2}
              overflow="hidden"
            >
              <Image
                src={img}
                alt={`post-img-${rowIdx}-${idx}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      ))}
  </Box>
)}


                        {/* Like + Comment Buttons */}
                        <Box mt={2} display="flex" gap={2}>
                          <Button
                            onClick={() => handlePostUpdate(post?._id)}
                            size="small"
                            variant={
                              post.likes.includes(userData?._id)
                                ? "contained"
                                : "outlined"
                            }
                          >
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
