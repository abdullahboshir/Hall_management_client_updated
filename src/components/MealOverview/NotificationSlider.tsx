'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useGetAllNoticesQuery } from '@/redux/api/noticeApi';
import Image from 'next/image';
import Spinner from '../Shared/Spinner/Spinner';

// Keyframe to move the strip leftward slowly
const slideLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-40%);
  }
`;

export default function NotificationSlider() {
  const [filters] = useState({
    isAllNotication: true,
    isPinned: false,
  });

  const { data, isLoading } = useGetAllNoticesQuery(filters);

  if (isLoading) return <Spinner />;

  const notices = data?.slice(0, 3) || [];

  return (
    <Box
      position="relative"
      overflow="hidden"
      bgcolor="white"
      borderRadius={2}
      height="50px"
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Box
        sx={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: `${slideLeft} 40s linear infinite`, // slowed marquee
        }}
      >
        {[...notices, ...notices].map((notice, index) => (
          <Box
            key={`${notice._id}-${index}`}
            display="flex"
            alignItems="center"
            justifyContent='center'
            minWidth="400px"
            gap={2}
            px={2}
          >
            {notice?.createdBy?.profileImg && (
              <Image
                src={notice.createdBy.profileImg}
                alt="avatar"
                width={30}
                height={30}
                style={{ objectFit: 'cover', borderRadius: 4 }} // square image
              />
            )}
            <Box>
              <Typography fontSize="1vw" fontWeight="bold">
                {notice.title}
              </Typography>
              <Typography fontSize="1vw" color="text.secondary">
                {notice.description?.length > 50
                  ? `${notice.description.slice(0, 50)}...`
                  : notice.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
