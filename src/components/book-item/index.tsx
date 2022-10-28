import React, { useState } from "react";
import {Link} from "react-router-dom";
import { handleFetchBooks, handleFetchDeletedBooks } from "../../store/actions";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import { BookApi } from "../../api";
import "./style.css";
const BookItem = ({ book, openSnackBar }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [inputValue, setInputValue] = useState(book.name);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeAnchor = () => {
    setAnchorEl(null);
  };

  const handleUpdateBook = async (e) => {
    closeAnchor();
    const result = BookApi("updateBook", book._id, { name: inputValue });
    dispatch(handleFetchBooks(null));
  };

  const handleDeleteBook = async (e) => {
    const res = await BookApi("softDeleteBook", book._id);
    if (res.status === 200) {
      dispatch(handleFetchBooks(null));
      dispatch(handleFetchDeletedBooks(null));
      openSnackBar("success");
    }
  };

  const renderUpdateDialog = () => (
    <Dialog
      open={isOpenUpdateDialog}
      onClose={(e) => setIsOpenUpdateDialog(false)}
    >
      <DialogContent>
        <TextField
          placeholder="Tên sách"
          onChange={(e) => setInputValue(e.target.value)}
          defaultValue={inputValue}
        />
        <div className="group-button">
          <Button onClick={(e) => setIsOpenUpdateDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleUpdateBook}>
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderDeleteConfirmDialog = () => (
    <Dialog
      open={isOpenDeleteDialog}
      onClose={(e) => setIsOpenDeleteDialog(false)}
    >
      <DialogContent>
        <p>
          Sách sẽ được chuyển vào <b>thùng rác</b>, bạn có chắc chứ?
        </p>
        <div className="group-button">
          <Button
            onClick={(e) => {
              setIsOpenDeleteDialog(false);
            }}
          >
            Hủy
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteBook}>
            Xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderMenuButton = () => (
    <div className="menu-button">
      <IconButton size="small" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeAnchor}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e) => {
            closeAnchor();
            setIsOpenUpdateDialog(true);
          }}
        >
          <Edit /> Chỉnh sửa
        </MenuItem>
        <MenuItem
          sx={{ color: "red" }}
          onClick={(e) => {
            closeAnchor();
            setIsOpenDeleteDialog(true);
          }}
        >
          <Delete /> Xóa sách
        </MenuItem>
      </Menu>
    </div>
  );
  return (
    <>
      <div className="book-item">
        {renderMenuButton()}
        <Link to={`/pdf-reader?bookId=${book._id}`}>
          <img src={book.cover} className="book-cover" alt={book.name} />
          <p>{book.name}</p>
        </Link>
      </div>
      {renderUpdateDialog()}
      {renderDeleteConfirmDialog()}
    </>
  );
};

export default BookItem;
