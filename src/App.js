import * as React from "react";
import { Typography, Box } from "@mui/material";
import Link from "@mui/material/Link";
import { Layout } from "./interface/layout";
import { Converter } from "./main/converterToJson";
import { StyledEngineProvider, styled } from "@mui/material/styles";

const CustomBox = styled(Box)`
  display: block;
  margin-top: 3em;
  width: 100%;
  font-weight: bold;
`;

const Copyright = () => {
  return (
    <CustomBox>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/Fradomati">
          Fradomati DEV
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </CustomBox>
  );
};

export const App = () => {
  return (
    <StyledEngineProvider>
      <Layout>
        <Converter />
      </Layout>
      <Copyright />
    </StyledEngineProvider>
  );
};
