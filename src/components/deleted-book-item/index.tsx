import React, { useState } from "react";
import { handleFetchBooks, handleFetchDeletedBooks } from "../../store/actions";
import { useDispatch } from "react-redux";
import { IconButton, Dialog, DialogContent, Button } from "@mui/material";
import { Undo, Delete } from "@mui/icons-material";
import { BookApi } from "../../api";
import "./style.css";
const DeletedBookItem = ({ book, openSnackBar }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [enableDelete, setEnableDelete] = useState(false);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeAnchor = () => {
    setAnchorEl(null);
  };

  const handleUndoBook = async (e) => {
    const res = await BookApi("restoreBook", book._id);
    if (res.status === 200) {
      dispatch(handleFetchBooks(null));
      dispatch(handleFetchDeletedBooks(null));
      openSnackBar("success");
    }
  };

  const handleHardDeleteBook = async (e) => {
    const res = await BookApi("hardDeleteBook", book._id);
    if (res.status === 200) {
      dispatch(handleFetchBooks(null));
      dispatch(handleFetchDeletedBooks(null));
    }
  };

  const renderDeleteConfirmDialog = () => (
    <Dialog
      open={isOpenDeleteDialog}
      onClose={(e) => setIsOpenDeleteDialog(false)}
    >
      <DialogContent>
        <p>
          Sách sẽ bị <b>xóa vĩnh viễn</b>, tiếp tục xóa?
        </p>
        <div className="group-button">
          <Button onClick={(e) => setIsOpenDeleteDialog(false)}>Hủy</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleHardDeleteBook}
          >
            Xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className="book-item" onMouseEnter={(e) => setEnableDelete(true)}>
        {enableDelete && (
          <div
            className="delete-area"
            onMouseLeave={(e) => setEnableDelete(false)}
          >
            <IconButton
              size="large"
              color="error"
              sx={{ color: "#ff2d2d" }}
              onClick={(e) => setIsOpenDeleteDialog(true)}
            >
              <Delete />
            </IconButton>
            <IconButton
              size="large"
              sx={{ color: "#a2ff28" }}
              onClick={handleUndoBook}
            >
              <Undo />
            </IconButton>
          </div>
        )}
        <img src={book.cover} className="book-cover" alt={book.name} />
        <p>{book.name}</p>
      </div>
      {renderDeleteConfirmDialog()}
    </>
  );
};

export default DeletedBookItem;
