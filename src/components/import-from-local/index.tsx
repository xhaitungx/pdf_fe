import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { BookApi } from "../../api";
import { useDispatch } from "react-redux";
import { handleFetchBooks } from "../../store/actions";
import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SnackBar from "../../components/snack-bar";

const ImportFromLocal = () => {
  const [snackBar, setSnackBar] = useState({
    openSnackbar: false,
    alertType: "",
    message: ""
  })
  const dispatch = useDispatch();
  const onImportBook = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId = window.localStorage.getItem("userId");
    const files = e.target.files;
    const filesData = new FormData();
    if (files)
      for (let i = 0; i < files.length; i++) {
        filesData.append(`files`, files[i]);
      }
    if (userId !== null && userId !== undefined)
      filesData.append(`userId`, userId);
    const result = await axios
      .post("http://localhost:5004/book", filesData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res);
    if (result.status === 200) {
      const books = result.data;
      if (books.fail.length > 0) {
        setSnackBar({
          openSnackbar: true,
          alertType: "warning",
          message: books.fail.join(", ") + " đã tồn tại"
        })
      }
      if (books.success.length > 0) {
        setSnackBar({
          openSnackbar: true,
          alertType: "success",
          message: "Sách đã được thêm thành công"
        })
        const result = await BookApi("getBooksList");
        dispatch(handleFetchBooks(result.books));
      }


    }
  };
  const handleCloseSnackbar = () => {
    setSnackBar({
      openSnackbar: false,
      alertType: "",
      message: ""
    })
  }
  return (
    <div>
      <input
        type="file"
        id="input-import-book"
        accept=".pdf"
        multiple
        onChange={onImportBook}
      />
      <Button
        variant="contained"
        onClick={(e) => document.getElementById("input-import-book")!.click()}
        sx={{
          background: "#ebecf0",
          color: "black",
          "&:hover": {
            background: "#b5b6b9",
            color: "black",
          },
        }}
      >
        <FileUploadIcon />
        Thêm sách
      </Button>
      <SnackBar
        open={snackBar.openSnackbar}
        handleClose={handleCloseSnackbar}
        type={snackBar.alertType}
        message={snackBar.message}
      />
    </div>
  );
};

export default ImportFromLocal;
