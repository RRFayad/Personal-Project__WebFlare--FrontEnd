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

export const homePageFiltersHandler = (businessesList, filters) => {
  let businesses = businessesList;

  // business type filter logic

  if (filters.typeFilter.length > 0) {
    businesses = businesses.filter((business) =>
      filters.typeFilter.includes(business.type)
    );
  }
  // business search filter logic
  if (filters.searchFilter !== '') {
    businesses = businesses.filter(
      (business) =>
        business.title.trim().toLowerCase().includes(filters.searchFilter) ||
        business.description
          .trim()
          .toLowerCase()
          .includes(filters.searchFilter) ||
        business.type.trim().toLowerCase().includes(filters.searchFilter)
    );
  }
  // business price filter logic
  if (filters.priceFilter.min > 0 || filters.priceFilter.max < Infinity) {
    businesses = businesses.filter(
      (business) =>
        business.askingPrice >= filters.priceFilter.min &&
        business.askingPrice <= filters.priceFilter.max
    );
  }
  // business profit filter logic
  if (filters.profitFilter.min > 0 || filters.profitFilter.max < Infinity) {
    businesses = businesses.filter(
      (business) =>
        business.monthlyProfit >= filters.profitFilter.min &&
        business.monthlyProfit <= filters.profitFilter.max
    );
  }
  // user filter logic
  if (filters.userFilter.id) {
    businesses = businesses.filter(
      (business) => business.owner !== filters.userFilter.id
    );
  }
  return businesses;
};
