import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
const SnackBar = ({ open, handleClose, type, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
