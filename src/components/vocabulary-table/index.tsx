import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Dialog,
} from "@mui/material";
import FlashCardCarousel from "../flash-card-carousel";
import "./style.css";
const vocabularyTable = ({ listVocabulary }) => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const numberOfRow = 2;
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="vocabulary-table-container">
        <div className="header">
          <h3>{listVocabulary.bookName}</h3>
          <Button variant="contained" onClick={handleOpenDialog}>
            Review
          </Button>
        </div>
        <TableContainer sx={{ maxHeight: "330px" }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow sx={{ position: "relative" }}>
                <TableCell sx={{ fontWeight: "600" }}>Từ vựng</TableCell>
                <TableCell sx={{ fontWeight: "600" }} align="right">
                  Ý nghĩa
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="vocabulary-body" sx={{ width: "100%" }}>
              {listVocabulary.list
                .slice(page * numberOfRow, (page + 1) * numberOfRow)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: "45%" }}>
                      {row.text}
                    </TableCell>
                    <TableCell align="right" sx={{ width: "45%" }}>
                      {row.meaning}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage=""
          component="div"
          count={listVocabulary.list.length}
          rowsPerPage={numberOfRow}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          rowsPerPageOptions={[]}
        />
      </div>
      <Dialog
        sx={{ background: "transparent" }}
        open={open}
        onClose={handleClose}
      >
        <FlashCardCarousel vocabularyList={listVocabulary.list} />
      </Dialog>
    </>
  );
};

export default vocabularyTable;
