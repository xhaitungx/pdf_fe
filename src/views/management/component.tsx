import React from "react";
import { ManagementProps, ManagementStates } from "./interface";
import Header from "../../containers/header";
import SideBar from "../../containers/side-bar";
import FooterBar from "../../containers/footer-bar";
import ComponentRoutes from "../../router/ComponentRoutes";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./style.css";
class Management extends React.Component<ManagementProps, ManagementStates> {
  DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  render() {
    return (
      <>
      <div id="pd-management" style={{height:"calc(100vh - 56px)"}}>
        <Box sx={{display:"flex"}}>
          <SideBar />
          <Header />
          <Box
            id="pd-main"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              height: "100vh",
              overflowY: "hidden",
              paddingRight: 0,
            }}
          >
            <this.DrawerHeader />
            <ComponentRoutes />
          </Box>
        </Box>
      </div>
      <FooterBar/>
      </>
    );
  }
}

export default Management;
