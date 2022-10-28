import { connect } from "react-redux";
import MenuPopup from "./component";
import { stateType } from "../../../store";
const mapStatesToProps = (state: stateType) => {
  return {
    readMode: state.viewArea.readMode,
  };
};

const actionCreator = {};
export default connect(mapStatesToProps, actionCreator)(MenuPopup);
