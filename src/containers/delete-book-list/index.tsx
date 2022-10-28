import DeleteBookList from "./component";
import { connect } from "react-redux";
import { stateType } from "../../store";
import { handleFetchDeletedBooks } from "../../store/actions";
const mapStateToProps = (state: stateType) => {
  return {
    deletedBooks: state.manager.deletedBooks,
  };
};

const actionCreator = {
  handleFetchDeletedBooks,
};
export default connect(mapStateToProps, actionCreator)(DeleteBookList);
