import BookList from "./component";
import { connect } from "react-redux";
import { stateType } from "../../store";
import { handleFetchBooks } from "../../store/actions";
const mapStateToProps = (state: stateType) => {
  return {
    books: state.manager.books,
  };
};

const actionCreator = {
  handleFetchBooks,
};
export default connect(mapStateToProps, actionCreator)(BookList);
