import VocabularyModel from "../../model/Vocabulary";
export interface VocabularyListProps {
  vocabularies: VocabularyModel[];
  handleFetchVocabularies: (payload: VocabularyModel[]) => void;
}

export interface VocabularyListStates {}
