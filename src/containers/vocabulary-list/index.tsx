import VocabularyList from "./component";
import { connect } from "react-redux";
import { stateType } from "../../store";
import { handleFetchVocabularies } from "../../store/actions";

const mapStateToProps = (state: stateType) => {
  return {
    vocabularies: state.manager.vocabularies,
  };
};

const actionCreator = {
  handleFetchVocabularies,
};
export default connect(mapStateToProps, actionCreator)(VocabularyList);
