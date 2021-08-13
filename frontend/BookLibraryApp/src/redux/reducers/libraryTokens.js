import {INCREMENT_TOKEN, DECREMENT_TOKEN} from '../constants';

const libraryTokens = (state = 3, action) => {
  switch (action.type) {
    case INCREMENT_TOKEN:
      return state;

    default:
      return state;
  }
};

export default libraryTokens;
