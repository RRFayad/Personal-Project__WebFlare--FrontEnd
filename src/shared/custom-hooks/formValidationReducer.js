const formValidationReducer = (state, action) => {
  switch (action.type) {
    case 'VALIDATE_INPUT':
      return {
        ...state,
        [action.payload]: true,
      };
    case 'INVALIDATE_INPUT':
      return {
        ...state,
        [action.payload]: false,
      };
    case 'SET_FORM_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default formValidationReducer;
