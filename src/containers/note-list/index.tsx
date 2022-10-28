import { connect } from "react-redux";
import { stateType } from "../../store";
import { handleFetchNotes } from "../../store/actions";
import NoteList from "./component";
const mapStatesToProps = (state: stateType) => {
  return {
    notes: state.manager.notes,
  };
};

const actionCreators = {
  handleFetchNotes,
};

export default connect(mapStatesToProps, actionCreators)(NoteList);
