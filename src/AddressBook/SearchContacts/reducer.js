import {
  UPDATE_SEARCH_PHRASE__FAILURE,
  UPDATE_SEARCH_PHRASE__START,
  UPDATE_SEARCH_PHRASE__SUCCESS,
  SELECT_MATCHING_CONTACT
} from "./actions";

const initialState = {
  phrase: "",
  matchingContacts: [],
  searchFailure: false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case UPDATE_SEARCH_PHRASE__START:
      return {
        ...state,
        phrase: payload.newPhrase,
        searchFailure: false,
      };

    case UPDATE_SEARCH_PHRASE__SUCCESS:
      return {
        ...state,
        matchingContacts: payload.matchingContacts,
        searchFailure: false,
      };

    // TODO something is wrong here
    case UPDATE_SEARCH_PHRASE__FAILURE:
      return {
        ...state,
        searchFailure: true,
      };

    // TODO something is wrong here
    case SELECT_MATCHING_CONTACT:
      return {
        ...state,
        phrase: payload.selectedMatchingContact.value,
        matchingContacts: []
      };
    default:
      return state;

  }
};

export default reducer;