import React from "react";
import { VocabularyListProps, VocabularyListStates } from "./interface";
import VocabularyTable from "../../components/vocabulary-table";
import Loading from "../../components/loading";
import { VocabulariesApi } from "../../api";
import "./style.css";
class VocabularyList extends React.Component<
  VocabularyListProps,
  VocabularyListStates
> {
  constructor(props: VocabularyListProps) {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.vocabularies) {
      const result = await VocabulariesApi("getVocabularies");
      this.props.handleFetchVocabularies(result.vocabularies);
    }
  }

  render() {
    return (
      <>
      {!this.props.vocabularies &&  <Loading /> }
        {this.props.vocabularies && this.props.vocabularies.length > 0 && (
          <div className="vocabulary-list-container container">
            {this.props.vocabularies
              .filter((listVocabulary) => listVocabulary.list.length > 0)
              .map((listVocabulary) => (
                <VocabularyTable listVocabulary={listVocabulary} key={listVocabulary._id} />
              ))}
          </div>
        ) }
        {this.props.vocabularies && this.props.vocabularies.length === 0 && (
          <h1 className="empty-text">Chưa có từ vựng nào được thêm vào</h1>
        ) }
      </>
    );
  }
}

export default VocabularyList;
