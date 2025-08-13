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
import { useEffect, useRef, useState } from "react";
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getTimeAgo } from "@/utils/getTimeAgo";
import CreatePost from "./CreatePost";
import Spinner from "../Shared/Spinner/Spinner";
import HmForm from "../Form/HmForm";
import HmInput from "../Form/HmInput";
import { FieldValues } from "react-hook-form";
import Progress from "../Shared/Spinner/Progress";

const MiddleSection = () => {
  const [open, setOpen] = useState(false);
  const [isPostIdMatch, setIsPostIdMatch] = useState("");
  const [postId, setPostId] = useState("");
  const { data: userData } = useGetSingleUserQuery({});
  const { data: postsData, refetch, isLoading } = useGetAllPostsQuery({});
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (postsData) {
      setAllPosts(postsData);
    }
  }, [postsData]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loadingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

      if (isNearBottom && visiblePosts < allPosts.length) {
        loadingRef.current = true;
        setTimeout(() => {
          setVisiblePosts((prev) => prev + 5);
          loadingRef.current = false;
        }, 500);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [visiblePosts, allPosts.length]);

  const [updateLike] = useUpdateLikeMutation();
  const [updateCommentReactions] = useUpdateCommentReactionsMutation();
  const [updatePostBookmark] = useUpdatePostBookmarkMutation();

  const handlePostUpdate = async (id: string) => {
    try {
      const res = await updateLike(id).unwrap();
      if (res?._id) {
        await refetch();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const handleBookmarkUpdate = async (id: string) => {
    try {
      const res = await updatePostBookmark(id).unwrap();
      if (res?._id) {
        await refetch();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const [createPost] = useCreateCommentMutation();

  const handleOnSubmitComment = async (values: FieldValues) => {
    const res = await createPost({ postId, body: values });
    if (res?.data?.comments?.length) {
      await refetch();
    }
  };

  const handleComment = async (id: string) => {
    setPostId(id);
  };

  const handleCommentReactions = async (
    id: string,
    commentId: string,
    action: string
  ) => {
    try {
      console.log("ddddddddddddddddd", action);

      const res = await updateCommentReactions({
        id,
        body: { commentId, action },
      }).unwrap();
      if (res?._id) {
        await refetch();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      px={{ xs: 1, sm: 2, md: 2 }}
      height={{ xs: "auto", md: "100vh" }}
      overflow="auto"
      ref={containerRef}
      sx={{
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "3px",
        },
      }}
    >
      {open && <CreatePost open={open} setOpen={setOpen} />}

      <Stack>
        <Box>
          <Grid2 container spacing={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 1 }}>
            <Grid2 size={12}>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="primary.light"
                p={{ xs: 1, sm: 2 }}
                borderRadius={2}
              >
                <Box bgcolor="white" px={{ xs: 2, sm: 4, md: 7 }} py={{ xs: 1, sm: 2 }} borderRadius={1}>
                  <Box
                    onClick={() => setOpen(true)}
                    width={{ xs: "100%", sm: "50vw", md: "30vw" }}
                    height={{ xs: "8vh", sm: "6vh" }}
                    border={2}
                    borderRadius={2}
                    borderColor="secondary.light"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography 
                      fontWeight="bold" 
                      fontSize={{ xs: "14px", sm: "16px", md: "1vw" }}
                    >
                      Add a Post
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={12}>
              <Box bgcolor="primary.light" p={{ xs: 1, sm: 2 }} borderRadius={2}>
                <Box mt={2} display="flex" flexDirection="column" gap={3}>
                  {allPosts.slice(0, visiblePosts).map((post: any) => {
                    return (
                      <Box
                        key={post._id}
                        p={{ xs: 2, sm: 3 }}
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
                          flexDirection={{ xs: "column", sm: "row" }}
                          gap={{ xs: 1, sm: 0 }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={{ xs: 1, sm: 0 }}
                          >
                            <Box
                              position="relative"
                              width={{ xs: 40, sm: 50 }}
                              height={{ xs: 40, sm: 50 }}
                              overflow="hidden"
                              borderRadius={1}
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
                              ml={{ xs: 0, sm: 1.5 }}
                              display="flex"
                              flexDirection={"column"}
                              textAlign={{ xs: "center", sm: "left" }}
                            >
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                lineHeight={1}
                                fontSize={{ xs: "14px", sm: "16px" }}
                              >
                                {post?.createdBy?.fullName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                lineHeight={1.5}
                                fontSize={{ xs: "12px", sm: "14px" }}
                              >
                                Posted by {post?.createdBy?.role}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                lineHeight={1}
                                fontSize={{ xs: "12px", sm: "14px" }}
                              >
                                <AccessTimeFilledIcon
                                  sx={{ fontSize: { xs: "12px", sm: "13px" } }}
                                />{" "}
                                {getTimeAgo(post?.createdAt)} ago
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            ml={{ xs: 0, sm: "auto" }}
                            gap={1}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize={{ xs: "14px", sm: "16px" }}
                            >
                              <MoreHorizIcon />
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize={{ xs: "14px", sm: "16px" }}
                              onClick={() => handleBookmarkUpdate(post?._id)}
                              sx={{ cursor: "pointer" }}
                            >
                              {post?.bookmarks.includes(userData?.user?._id) ? (
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
                          fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
                        >
                          {post?.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          fontSize={{ xs: "14px", sm: "16px" }}
                        >
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
                                  height={{ xs: 100, sm: 150 }}
                                >
                                  {row.map((img: string, idx: number) => (
                                    <Box
                                      key={idx}
                                      flex={1}
                                      position="relative"
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

                        <Box 
                          my={2} 
                          display="flex" 
                          gap={2}
                          flexDirection={{ xs: "column", sm: "row" }}
                        >
                          <Button
                            onClick={() => handlePostUpdate(post?._id)}
                            size="small"
                            sx={{ px: 1 }}
                            variant={
                              post.likes.includes(userData?.user?._id)
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
                            sx={{ px: 1 }}
                            
                          >
                            💬 Comment ({post?.comments?.length})
                          </Button>
                        </Box>

                        {isPostIdMatch === post?._id && (
                          <Box
                            mt={2}
                            p={{ xs: 1, sm: 2 }}
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
                                  onClick={() => setIsPostIdMatch("")}
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

                              <Box flexGrow={1}>
                                <HmForm onSubmit={handleOnSubmitComment}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      py: 1,
                                      width: "100%",
                                      flexDirection: { xs: "column", sm: "row" },
                                      gap: { xs: 1, sm: 0 },
                                    }}
                                  >
                                    <HmInput
                                      name="text"
                                      label="Write a comment..."
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
                                        ml: { xs: 0, sm: "20px" },
                                        mt: { xs: 1, sm: 0 },
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
                                            width: { xs: 25, sm: 30 },
                                            height: { xs: 25, sm: 30 },
                                            "& img": {
                                              objectFit: "cover",
                                              objectPosition: "top",
                                            },
                                          }}
                                        />

                                        <Box>
                                          <Typography
                                            fontSize={{ xs: "12px", sm: "14px", md: "1vw" }}
                                            fontWeight={600}
                                          >
                                            {comment?.user?.fullName}
                                          </Typography>
                                          <Typography
                                            fontSize={{ xs: "11px", sm: "12px", md: "1vw" }}
                                            lineHeight={0.4}
                                          >
                                            {comment?.user?.role}
                                          </Typography>
                                        </Box>
                                      </Stack>

                                      <Typography 
                                        color="text.secondary"
                                        fontSize={{ xs: "13px", sm: "14px" }}
                                      >
                                        {comment?.text}
                                      </Typography>

                                      <Stack
                                        flexDirection={"row"}
                                        mt={2}
                                        justifyContent={"space-between"}
                                        px={2}
                                      >
                                        <Stack
                                          display={"flex"}
                                          flexDirection={"row"}
                                          gap={2}
                                        >
                                          <Box>
                                            <Box
                                              onClick={() =>
                                                handleCommentReactions(
                                                  post?._id,
                                                  comment?.id,
                                                  "like"
                                                )
                                              }
                                              sx={{ cursor: "pointer" }}
                                            >
                                              {comment?.likes.includes(
                                                userData?.user?._id
                                              ) ? (
                                                <ThumbUpAltIcon />
                                              ) : (
                                                <ThumbUpOffAltIcon />
                                              )}
                                              {comment?.likes.length}
                                            </Box>
                                          </Box>
                                          <Box>
                                            <Box
                                              onClick={() =>
                                                handleCommentReactions(
                                                  post?._id,
                                                  comment?.id,
                                                  "dislike"
                                                )
                                              }
                                              sx={{ cursor: "pointer" }}
                                            >
                                              {" "}
                                              {comment?.dislikes.includes(
                                                userData?.user?._id
                                              ) ? (
                                                <ThumbDownAltIcon />
                                              ) : (
                                                <ThumbDownOffAltIcon />
                                              )}{" "}
                                              {comment?.dislikes.length}
                                            </Box>
                                          </Box>
                                        </Stack>
                                        <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                                          Reply
                                        </Typography>
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

                {visiblePosts < allPosts.length && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems={"center"}
                    py={4}
                    textAlign={'center'}
                  >
                    <Progress />
                  </Box>
                )}

                {visiblePosts >= allPosts.length && allPosts.length > 0 && (
                  <Box textAlign="center" py={4}>
                    <Typography color="text.secondary">
                      You&apos;ve seen all posts
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Stack>
    </Box>
  );
};

export default MiddleSection;
