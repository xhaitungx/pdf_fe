import React from "react";
import Book from "../../model/Book";
import { BookApi } from "../../api";
import DeletedBookItem from "../../components/deleted-book-item";
import Loading from "../../components/loading";
import { DeletedBookListProps, DeletedBookListStates } from "./interface";
import SnackBar from "../../components/snack-bar";
import "./style.css";
class DeletedBookList extends React.Component<
  DeletedBookListProps,
  DeletedBookListStates
> {
  constructor(props: DeletedBookListProps) {
    super(props);
    this.state = {
      alertType: "success",
      openSnackbar: false,
    };
    this.setAlertType = this.setAlertType.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  setAlertType = (type: string) => {
    this.setState({
      alertType: type,
      openSnackbar: true,
    });
  };

  handleCloseSnackbar = (type: string) => {
    this.setState({
      openSnackbar: false,
    });
  };

  async componentDidMount() {
    if (!this.props.deletedBooks) {
      const res = await BookApi("getDeletedBooksList");
      if (res.status === 200)
        this.props.handleFetchDeletedBooks(res.data.books);
    }
  }

  async componentDidUpdate() {
    if (!this.props.deletedBooks) {
      const res = await BookApi("getDeletedBooksList");
      if (res.status === 200) {
        this.props.handleFetchDeletedBooks(res.data.books);
      }
    }
  }

  render() {
    return (
      <>
        <div className="deleted-book-list-heading" style={{ color: "white" }}>
        </div>
        {!this.props.deletedBooks && <Loading />}
        {this.props.deletedBooks && this.props.deletedBooks.length > 0 && (
          <div className="book-list-container container">
            {this.props.deletedBooks.map((book: Book) => (
              <DeletedBookItem
                book={book}
                openSnackBar={this.setAlertType}
                key={book._id}
              />
            ))}
          </div>
        )}
        {this.props.deletedBooks && this.props.deletedBooks.length === 0 && (
          <div>
            <h1 className="empty-text">Chưa có sách nào được xóa</h1>
          </div>
        )}
        <SnackBar
          open={this.state.openSnackbar}
          handleClose={this.handleCloseSnackbar}
          type={this.state.alertType}
          message="Sách đã được phục hồi"
        />
      </>
    );
  }
}

export default DeletedBookList;
