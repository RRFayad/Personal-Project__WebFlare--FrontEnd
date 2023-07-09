export const filtersInitializer = {
  typeFilter: [],
  searchFilter: '',
  priceFilter: {
    min: 0,
    max: Infinity,
  },
  profitFilter: {
    min: 0,
    max: Infinity,
  },
  userFilter: {
    id: null,
  },
};

export const filtersReducer = (state, action) => {
  if (action.type === 'SET_TYPE_FILTER') {
    // payload: {filter, filterNewState}
    return action.payload.filterNewState
      ? { ...state, typeFilter: [...state.typeFilter, action.payload.filter] }
      : {
          ...state,
          typeFilter: [...state.typeFilter].filter(
            (typeFilter) => typeFilter !== action.payload.filter
          ),
        };
  }
  if (action.type === 'SET_SEARCH_FILTER') {
    // payload: {value}
    return {
      ...state,
      searchFilter: action.payload.value.toLowerCase().trim(),
    };
  }
  if (action.type === 'SET_PRICE_FILTER') {
    // payload: {minValue, maxValue}
    return {
      ...state,
      priceFilter: {
        min: action.payload.minValue,
        max: action.payload.maxValue,
      },
    };
  }
  if (action.type === 'SET_PROFIT_FILTER') {
    // payload: {minValue, maxValue}
    return {
      ...state,
      profitFilter: {
        min: action.payload.minValue,
        max: action.payload.maxValue,
      },
    };
  }
  if (action.type === 'SET_USER_FILTER') {
    // payload: {id}
    return {
      ...state,
      userFilter: { id: action.payload.id },
    };
  }
  if (action.type === 'CLEAR_FILTER') {
    return filtersInitializer;
  }
  return state;
};
