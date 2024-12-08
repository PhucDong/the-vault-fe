import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { useState } from "react";
import ReadMoreButton from "./ReadMoreButton";

function DetailedItemDescription({ item }) {
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  return (
    <CustomPaddingLayout
      sx={{
        padding: {
          xs: "24px 32px",
          sm: "40px 56px",
          md: "40px 152px",
          lg: "40px 192px",
        },
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            textTransform: "uppercase",
            fontWeight: 600,
            color: "primary.main",
            marginBottom: { xs: "8px", sm: "12px", lg: "16px" },
          }}
        >
          Description
        </Typography>
        <Accordion
          expanded={expandedAccordion}
          onChange={() => setExpandedAccordion(!expandedAccordion)}
          sx={{
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ReadMoreButton />}
            sx={{
              padding: 0,
              flexDirection: "column",
              gap: { xs: "4px", sm: "4px", md: "8px" },
              "& .MuiAccordionSummary-content": {
                margin: 0,
                flexDirection: "column",
                gap: "8px",
                "& .MuiTypography-root": {
                  lineHeight: { xs: 1.25, sm: 1.3, lg: 1.5 },
                  fontSize: {
                    sm: "0.935rem",
                    md: "0.975rem",
                    lg: "1.015rem",
                  },
                  color: "#ababab",
                },
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                width: "100%",
                justifyContent: "center",
                "&.Mui-expanded": { transform: "rotate(0)" },
                "& .MuiSvgIcon-root": {
                  transform: expandedAccordion && "rotate(180deg)",
                },
              },
            }}
          >
            <Typography>{item.description.slice(0, 230)}</Typography>
            {expandedAccordion && (
              <Typography>{item.description.slice(230)}</Typography>
            )}
          </AccordionSummary>
        </Accordion>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemDescription;
