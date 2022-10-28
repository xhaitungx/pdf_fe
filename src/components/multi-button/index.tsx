import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleChangeReadMode } from "../../store/actions";
import { stateType } from "../../store";
import { Box, Fab, Tooltip } from "@mui/material";
import { Translate, Notes, Visibility, Cancel } from "@mui/icons-material";
import "./style.css";
const MultiButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState(0);
  const dispatch = useDispatch();

  const Buttons = [
    {
      title: "Mặc định",
      element: <Visibility />,
      background: "white",
      readMode: 0
    },
    {
      title: "Dịch nghĩa",
      element: <Translate />,
      background: "#d8f2ff",
      readMode: 1
    },
    {
      title: "Ghi chú",
      element: <Notes />,
      background: "#00cbfe",
      readMode: 2
    }
  ]

  const onChangeReadMode = (readModeNumber) => {
    dispatch(handleChangeReadMode(readModeNumber));
    setViewMode(readModeNumber);
    setIsOpen(false);
  };

  const ButtonWithTooltip = (button) => (
    <Tooltip title={button.title} placement="left" disableInteractive>
      <Fab
        onClick={(e) => {
          setIsOpen(true);
          if (button.readMode !== viewMode) onChangeReadMode(button.readMode)
        }
        }
        sx={{ mb: 1, background: button.background }}
      >
        {button.element}
      </Fab>
    </Tooltip>
  );

  return (
    <div className="multi-button" onMouseLeave={(e) => setIsOpen(false)}>
      {isOpen && <div className="selective-button">
        {Buttons.filter((item, index) => item.readMode !== viewMode)
          .map(button => ButtonWithTooltip(Buttons[button.readMode]))}
      </div>}
      <div className="active-button">
        {ButtonWithTooltip(Buttons[viewMode])}
      </div>
    </div>
  );
};

export default MultiButton;
