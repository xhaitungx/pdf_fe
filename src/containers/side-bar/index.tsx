import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MenuBook, SpeakerNotes, Translate, Delete } from "@mui/icons-material";

import "./style.css";

const SideBar = () => {
  const [selectedUrl, setSelectedUrl] = useState(window.location.pathname);
  const drawerWidth = 240;
  const sideBarList = [
    {
      icon: <MenuBook />,
      label: "Tủ sách",
      url: "/management/",
    },
    {
      icon: <SpeakerNotes />,
      label: "Ghi chú",
      url: "/management/notes",
    },
    {
      icon: <Translate />,
      label: "Từ vựng",
      url: "/management/vocabularies",
    },
    {
      icon: <Delete />,
      label: "Thùng rác",
      url: "/management/deletes",
    },
  ];
  const handleListItemClick = (event, url) => {
    setSelectedUrl(url);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#215262",
        },
      }}
    >
      <Toolbar />
      <Box id="pd-sidebar" sx={{ overflow: "auto" }}>
        <List>
          {sideBarList.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Link to={item.url} style={{ width: drawerWidth }}>
                {item.label === "Thùng rác" && <Divider />}
                <ListItemButton
                  selected={selectedUrl === item.url}
                  onClick={(event) => handleListItemClick(event, item.url)}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
