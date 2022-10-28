import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import { MenuBook, SpeakerNotes, Translate, Delete } from "@mui/icons-material";

import "./style.css";

const FooterBar = () => {
  const [selectedUrl, setSelectedUrl] = useState(window.location.pathname);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const FooterBarList = [
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
    navigate(url);
  };
  return (
    <BottomNavigation
    sx={{position:"absolute", bottom:0, width: "100vw",zIndex:"999", background:"#215262"}}
    value={FooterBarList.map((item)=> item.url).indexOf(window.location.pathname)}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    >
    {FooterBarList.map((item, index) => (
      <BottomNavigationAction sx={{color:"white"}} key={index} label={item.label} icon={item.icon} onClick={(event) => handleListItemClick(event, item.url)} />
    ))}
    </BottomNavigation>
  );
};

export default FooterBar;
