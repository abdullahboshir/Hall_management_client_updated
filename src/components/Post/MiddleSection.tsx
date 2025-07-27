"use client";

import {
  Box,
  Grid2,
  Stack,
  Typography,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import {
  useCreateCommentMutation,
  useGetAllPostsQuery,
  useUpdateCommentReactionsMutation,
  useUpdateLikeMutation,
  useUpdatePostBookmarkMutation,
} from "@/redux/api/postApi";
import Image from "next/image";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SendIcon from "@mui/icons-material/Send";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { getTimeAgo } from "@/utils/getTimeAgo";
import CreatePost from "./CreatePost";
import Spinner from "../Shared/Spinner/Spinner";
import HmForm from "../Form/HmForm";
import HmInput from "../Form/HmInput";
import { FieldValues } from "react-hook-form";

const PAGE_SIZE = 5;

const MiddleSection = () => {
  const [open, setOpen] = useState(false);
  const [isPostIdMatch, setIsPostIdMatch] = useState('');
  const [postId, setPostId] = useState("");
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
  const [updateCommentReactions] = useUpdateCommentReactionsMutation();
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

  const [createPost] = useCreateCommentMutation();

  const handleOnSubmitComment = async (values: FieldValues) => {
    const res = await createPost({ postId, body: values });
    if (res?.data?.comments?.length) {
    const refreshed = await refetch(); // fetch latest posts from backend

        // Reset visiblePosts from fresh data
        const all = refreshed?.data || [];
        const start = 0;
        const end = page * PAGE_SIZE;
        setVisiblePosts(all.slice(start, end));
      console.log("commentsssssssss", res?.data.comments);
    }
  };

  const handleComment = async (id: string) => {
    setPostId(id)
  };


  const handleCommentReactions = async (id: string, commentId: string, action: string) => {
      try {
        console.log('ddddddddddddddddd', action)
    
      const res = await updateCommentReactions({id, body: {commentId, action}}).unwrap()
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


  if (isLoading) {
    return <Spinner />;
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
                    <Typography fontWeight="bold" fontSize="1vw">
                      Add a Post
                    </Typography>
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
                                  post?.createdBy?.profileImg ||
                                  "/default-avatar.png"
                                }
                                alt="profile-picture"
                                fill
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "top",
                                }}
                              />
                            </Box>

                            <Box
                              ml={1.5}
                              display="flex"
                              flexDirection={"column"}
                            >
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
                                <AccessTimeFilledIcon
                                  sx={{ fontSize: "13px" }}
                                />{" "}
                                {getTimeAgo(post?.createdAt)} ago
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
                              <MoreHorizIcon />
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize={16}
                              onClick={() => handleBookmarkUpdate(post?._id)}
                              sx={{ cursor: "pointer" }}
                            >
                              {/* {new Date(post.createdAt).getDate() +
                                "/" +
                                (new Date(post.createdAt).getMonth() + 1) +
                                "/" +
                                new Date(post.createdAt).getFullYear()} */}
                              {post?.bookmark.includes(userData?._id) ? (
                                <BookmarkIcon />
                              ) : (
                                <BookmarkBorderIcon />
                              )}
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
                          <Box
                            mt={2}
                            display="flex"
                            flexDirection="column"
                            gap={1}
                          >
                            {post.images
                              .slice(0, 6)
                              .reduce(
                                (
                                  rows: string[][],
                                  img: string,
                                  idx: number
                                ) => {
                                  if (idx % 3 === 0) rows.push([img]);
                                  else rows[rows.length - 1].push(img);
                                  return rows;
                                },
                                []
                              )
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

                        <Box my={2} display="flex" gap={2}>
                          <Button
                            onClick={() => handlePostUpdate(post?._id)}
                            size="small"
                             sx={{px: 1}}
                            variant={
                              post.likes.includes(userData?._id)
                                ? "contained"
                                : "outlined"
                            }
                          >
                            👍 Like ({post?.likes.length})
                          </Button>

                          <Button
                            onClick={() => setIsPostIdMatch(post?._id)}
                            size="small"
                            variant="outlined"
                            sx={{px: 1}}
                          >
                            💬 Comment ({post?.comments?.length})
                          </Button>
                        </Box>

                        {isPostIdMatch === post?._id && (
                          <Box
                            mt={2}
                            p={2}
                            borderRadius={2}
                            bgcolor="background.paper"
                            maxWidth="100%"
                            sx={{ overflow: "hidden" }}
                          >
                            <Divider />

                            <Stack spacing={2} mt={2}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent={"space-between"}
                                flexDirection={{
                                  lg: "row",
                                  xs: "column",
                                  sm: "row",
                                }}
                                gap={2}
                              >
                                <Typography fontWeight={"bold"}>
                                  Comments
                                </Typography>

                                {/* Close Button */}
                                <Typography
                                  onClick={() => setIsPostIdMatch('')}
                                  // bgcolor='error.light'
                                  px={1}
                                  borderRadius={1}
                                  sx={{
                                    minWidth: "32px",
                                    alignSelf: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  ✕
                                </Typography>
                              </Box>

                              <Box flexGrow={1} width="100%">
                                <HmForm onSubmit={handleOnSubmitComment}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      // border: '1px solid #ccc',
                                      // px: 2,
                                      py: 1,
                                      // bgcolor: '#f9f9f9',
                                      width: "100%",
                                    }}
                                  >
                                    <HmInput
                                      name="text"
                                      label="Write a comment..."
                                      // isMultiline={true}
                                    />

                                    <Button
                                      type="submit"
                                      variant="contained"
                                      size="small"
                                      onClick={() => handleComment(post?._id)}
                                      sx={{
                                        textTransform: "none",
                                        p: 0,
                                        minWidth: "32px",
                                        ml: "20px",
                                      }}
                                    >
                                      <SendIcon />
                                    </Button>
                                  </Box>
                                </HmForm>
                              </Box>

                              {/* Example Comment */}
                              <Box>
                                {post.comments?.map(
                                  (comment: any, index: number) => (
                                    <Box
                                      key={index}
                                      bgcolor={"gray.light"}
                                      borderRadius={2}
                                      display={"flex"}
                                      flexDirection={"column"}
                                      my={1}
                                      gap={1}
                                      p={1}
                                    >
                                      <Stack
                                        display={"flex"}
                                        flexDirection={"row"}
                                        gap={1}
                                      >
                                        <Avatar
                                          alt={"user"}
                                          src={comment?.user?.profileImg}
                                          sx={{
                                            width: 30,
                                            height: 30,
                                            "& img": {
                                              objectFit: "cover",
                                              objectPosition: "top",
                                            },
                                          }}
                                        />

                                        <Box>
                                          <Typography fontSize='1vw' fontWeight={600}>
                                            {comment?.user?.fullName}
                                          </Typography>
                                          <Typography fontSize='1vw' lineHeight={.4}>
                                            {comment?.user?.role}
                                          </Typography>
                                        </Box>
                                      </Stack>

                                      <Typography
                                        
                                        color="text.secondary"
                                      >
                                        {comment?.text}
                                      </Typography>


                                     <Stack  flexDirection={'row'} mt={2} justifyContent={'space-between'} px={2}>
                               
                               <Stack display={'flex'} flexDirection={'row'} gap={2}>
                                     <Box>
                                         <Box onClick={() => handleCommentReactions(post?._id, comment?.id, 'like')}  sx={{cursor: 'pointer'}}>{comment?.likes.includes(userData?.user?._id) ?   <ThumbUpAltIcon/> : <ThumbUpOffAltIcon/> }{comment?.likes.length}</Box>
                                         {/* <Typography variant="body2">{comment?.likes.length}</Typography> */}
                                    </Box>
                                    <Box>
                                         <Box onClick={() => handleCommentReactions(post?._id, comment?.id, 'dislike')}  sx={{cursor: 'pointer'}}> {comment?.dislikes.includes(userData?.user?._id) ? <ThumbDownAltIcon/> : <ThumbDownOffAltIcon/>} {comment?.dislikes.length}</Box>
                                         {/* <Typography variant="body2">{comment?.dislikes.length}</Typography> */}
                                    </Box>
                               </Stack>

                               Reply
                                     
                                     </Stack>
                                    </Box>
                                  )
                                )}
                              </Box>
                            </Stack>
                          </Box>
                        )}
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
