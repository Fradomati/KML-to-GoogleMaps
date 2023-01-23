import * as React from "react";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomContainer = styled(Container)`
  color: #264653;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 6em;
  width: 100%;
  font-weight: bold;
  /* color: #2a9d8f; */
`;
export const Header = () => {
  return (
    <CustomContainer>
      <Typography variant="h1">KML to Google Maps</Typography>
    </CustomContainer>
  );
};
