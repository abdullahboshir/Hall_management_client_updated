'use client';
import { formattedDate } from "@/utils/currentDateBD";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import ContactEmergencyOutlinedIcon from "@mui/icons-material/ContactEmergencyOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const initials = (name?: string) =>
  (name || "U")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatAddress = (addr: any) => {
  if (!addr) return "-";
  if (typeof addr === "string") return addr;
  const parts = [
    addr?.village,
    addr?.alliance,
    addr?.subDistrict,
    addr?.division,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "-";
};

const statusToColor = (status?: string): any => {
  const s = (status || '').toLowerCase();
  if (["active", "enabled", "approved"].includes(s)) return "success";
  if (["pending", "processing", "awaiting"].includes(s)) return "warning";
  if (["blocked", "disabled", "inactive", "rejected"].includes(s)) return "error";
  return "default";
};

const FancyTile = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
}) => (
  <Box
    sx={{
      borderRadius: 2.5,
      p: 2.2,
      bgcolor: 'background.paper',
      position: 'relative',
      border: '1px solid',
      borderColor: 'divider',
      backgroundImage:
        'linear-gradient(145deg, rgba(99,102,241,0.06), rgba(236,72,153,0.06))',
      transition: 'transform .2s ease, box-shadow .2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 6,
      },
    }}
  >
    <Stack direction="row" gap={1.4} alignItems="center">
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          background:
            'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} sx={{ wordBreak: 'break-word' }}>
          {value || '-'}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

const Profile = ({ data }: { data: any }) => {
  const role = data?.role || data?.user?.role;
  const status = data?.status || data?.user?.status;
  const isSuperAdmin = role === 'superAdmin';

  return (
    <Box sx={{ width: '100%' }}>
      {/* Banner similar to MealOverview/ProfileDetails */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 160, md: 180 },
          borderRadius: '0 0 16px 16px',
          bgcolor: 'primary.main',
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 20px)',
          boxShadow: 2,
        }}
      />

      {/* Card wrapper overlapping the banner */}
      <Box sx={{ px: { xs: 1.5, sm: 3 }, mt: { xs: -8, md: -10 }, mb: 3 }}>
        <Box
          sx={{
            background:
              'linear-gradient(120deg, rgba(124,58,237,0.18), rgba(59,130,246,0.18))',
            p: { xs: 1.2, sm: 1.6 },
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(2,8,20,0.08)',
              p: { xs: 2.5, sm: 3, md: 4 },
            }}
          >
            {/* Floating glow behind avatar */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: -40, md: -48 },
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: 120, md: 140 },
                height: { xs: 120, md: 140 },
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(99,102,241,0.45), rgba(236,72,153,0.1) 60%, transparent 70%)',
                filter: 'blur(10px)',
                zIndex: 0,
              }}
            />

            {/* Header with center avatar overlapping */}
            <Stack alignItems="center" gap={1.5} sx={{ position: 'relative' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={data?.profileImg || undefined}
                  alt={data?.fullName || 'User Avatar'}
                  sx={{
                    width: { xs: 110, md: 130 },
                    height: { xs: 110, md: 130 },
                    fontSize: 34,
                    boxShadow: 4,
                    border: '6px solid rgba(255,255,255,0.95)',
                    zIndex: 1,
                    mt: { xs: -8, md: -9 },
                  }}
                >
                  {initials(data?.fullName)}
                </Avatar>
                <Tooltip title="Update photo">
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      boxShadow: 2,
                      '&:hover': { bgcolor: 'grey.100' },
                      zIndex: 2,
                    }}
                    aria-label="update-profile-photo"
                  >
                    <CameraAltOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: 0.4, textAlign: 'center', mt: 0.5 }}>
                {(data?.fullName || '').toUpperCase()}
              </Typography>
              {data?.designation && (
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: -0.5 }}>
                  {data?.designation}
                </Typography>
              )}

              {/* Role and Status chips */}
              <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center">
                {role && (
                  <Chip label={String(role).toUpperCase()} color="primary" variant="filled" size="small" sx={{ fontWeight: 800 }} />
                )}
                {status && (
                  <Chip label={String(status).toUpperCase()} color={statusToColor(status)} variant="outlined" size="small" sx={{ fontWeight: 800 }} />
                )}
              </Stack>

              {/* Contact chips */}
              <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center" sx={{ mt: 0.5 }}>
                {data?.email && (
                  <Chip
                    icon={<EmailOutlinedIcon />}
                    label={data?.email}
                    variant="outlined"
                    color="default"
                    sx={{
                      maxWidth: { xs: '100%', md: 360 },
                      '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
                    }}
                  />
                )}
                {data?.phoneNumber && (
                  <Chip icon={<PhoneIphoneOutlinedIcon />} label={data?.phoneNumber} variant="outlined" color="default" />
                )}
              </Stack>
            </Stack>

            <Divider sx={{ my: { xs: 2, md: 3 } }} />

            {/* Info tiles grid */}
            <Grid container spacing={{ xs: 1.8, md: 2.4 }}>
              {!isSuperAdmin && (
                <Grid item xs={12} sm={6} md={4}>
                  <FancyTile icon={<WcOutlinedIcon color="primary" />} label="Gender" value={data?.gender || '-'} />
                </Grid>
              )}

              {!isSuperAdmin && (
                <Grid item xs={12} sm={6} md={4}>
                  <FancyTile
                    icon={<CakeOutlinedIcon color="primary" />}
                    label="Date of birth"
                    value={data?.dateOfBirth ? formattedDate(data?.dateOfBirth) : '-'}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6} md={4}>
                <FancyTile
                  icon={<PhoneIphoneOutlinedIcon color="primary" />}
                  label="Phone"
                  value={data?.phoneNumber || '-'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FancyTile icon={<EmailOutlinedIcon color="primary" />} label="Email" value={data?.email || '-'} />
              </Grid>

              {!isSuperAdmin && (
                <Grid item xs={12} sm={6} md={4}>
                  <FancyTile
                    icon={<ContactEmergencyOutlinedIcon color="primary" />}
                    label="Emergency contact"
                    value={data?.emergencyContactNo || '-'}
                  />
                </Grid>
              )}

              {!isSuperAdmin && (
                <Grid item xs={12} md={6}>
                  <FancyTile
                    icon={<HomeOutlinedIcon color="primary" />}
                    label="Present address"
                    value={formatAddress(data?.presentAddress)}
                  />
                </Grid>
              )}

              {!isSuperAdmin && (
                <Grid item xs={12} md={6}>
                  <FancyTile
                    icon={<LocationOnOutlinedIcon color="primary" />}
                    label="Permanent address"
                    value={formatAddress(data?.permanentAddress)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
