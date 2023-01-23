import * as React from "react";
import { Container } from "@mui/material";
import { Header } from "./header";
import { styled } from "@mui/material/styles";

const CustomContainer = styled(Container)`
  min-height: 100vh;
  width: 100%;
  background-color: fff;
  color: #264653;
  /* color: #2a9d8f; */
`;

export const Layout = ({ children }) => {
  return (
    <CustomContainer>
      <Header />
      {children}
    </CustomContainer>
  );
};
