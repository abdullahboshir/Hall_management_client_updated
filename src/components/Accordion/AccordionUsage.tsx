/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function AccordionUsage({ noticeData }: { noticeData: any }) {
  return (
    <div>
      {noticeData?.map((data: any, index: any) => (
        <Accordion key={data?._id} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>{data?.title}</Typography>
              <Typography mr={2} fontWeight={600}>
                {data?.isPublished ? (
                  <Typography color="secondary.main" fontWeight={600}>
                    Published
                  </Typography>
                ) : (
                  <Typography color="error.secondary" fontWeight={600}>
                    Pending
                  </Typography>
                )}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>{data?.description}</AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Publish</Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
