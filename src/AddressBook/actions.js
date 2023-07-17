import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";

export const updateSearchPhrase = newPhrase =>
(dispatch, getState, { httpApi }) => {
    dispatch(
      searchActions.updateSearchPhraseStart({ newPhrase }),
    );
    httpApi.getFirst5MatchingContacts({ namePart: newPhrase })
      .then(({ data }) => {
        const matchingContacts = data.map(contact => ({
          id: contact.id,
          value: contact.name,
        }));
        // TODO something is wrong here
        console.log('matchingContacts',matchingContacts)
        dispatch(
          searchActions.updateSearchPhraseSuccess({ matchingContacts }),
        );
      })
      .catch((err) => {
        // TODO something is missing here
        dispatch(
          searchActions.updateSearchPhraseFailure(),
        );
      });
};

export const selectMatchingContact = selectedMatchingContact =>
  (dispatch, getState, { httpApi, dataCache }) => {

    // TODO something is missing here
    const getContactDetails = ({ id }) => {
      return httpApi
          .getContact({ contactId: id })
          .then(({ data }) => ({
            id: data.id,
            name: data.name,
            phone: data.phone,
            addressLines: data.addressLines,
          }));
    };

    dispatch(
      searchActions.selectMatchingContact({ selectedMatchingContact }),
    );

    dispatch(
      contactDetailsActions.fetchContactDetailsStart(),
    );

    const isDataAvailableInDataCache = dataCache.load({key: selectedMatchingContact.id}) || false;

    if(isDataAvailableInDataCache) {
      dispatch(
        contactDetailsActions.fetchContactDetailsSuccess({
          contactDetails: isDataAvailableInDataCache
        })
      )
      return;
    }

    getContactDetails({ id: selectedMatchingContact.id })
      .then((contactDetails) => {
        console.log('api called')
        // TODO something is missing here
        dataCache.store({
          key: selectedMatchingContact.id,
          value: contactDetails
        });
        // TODO something is wrong here
        dispatch(
          contactDetailsActions.fetchContactDetailsSuccess({
            contactDetails: contactDetails
          }),
        );
      })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure(),
        );
      });
};
