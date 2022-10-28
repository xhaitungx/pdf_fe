import { connect } from "react-redux";
import { handleFetchBookNotes } from "../../store/actions";
import PDFReader from "./component";
import { stateType } from "../../store";

const mapStateToProps = (state: stateType) => {
  return {
    bookNotes: state.viewArea.bookNotes,
  };
};
const actionCreator = {
  handleFetchBookNotes,
};
export default connect(mapStateToProps, actionCreator)(PDFReader);
