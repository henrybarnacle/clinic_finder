import { listService, coordsService, detailService }  from '../../service/listService';
import { positionKey } from '../../config/keys';

const globalRoot = 'app/clinics/';

// Constants
export const GET_CLINICS = `${globalRoot}GET_CLINICS`;
export const SELECT_CLINIC  = `${globalRoot}SELECT_CLINIC`;
export const ON_SEARCH = `${globalRoot}ON_SEARCH`;
export const ADD_BOOKMARK = `${globalRoot}ADD_BOOKMARK`;
export const REMOVE_BOOKMARK = `${globalRoot}REMOVE_BOOKMARK`;
export const ON_LOADING = `${globalRoot}ON_LOADING`;

export const initialState = {
    list: [],
    selectedClinic: {name: '', NPI:' ', description: '', address: '', coords: '', detail:''},
    searchTerm: '',
    bookmarked: [],
    loading: false
    };

  const clearSearchResults = {data:[[],[],[],[]] };

// Reducer
  export default function reducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CLINICS:
        return { ...state, list: payload.data[3] }

      case SELECT_CLINIC:
          return { ...state, selectedClinic: payload, loading: false }

      case ON_SEARCH:
            return { ...state, searchTerm: payload }
      
      case ADD_BOOKMARK:
        return { ...state,  bookmarked: [...state.bookmarked, state.selectedClinic]}

      case REMOVE_BOOKMARK:
        const filteredBookmarked = state.bookmarked.filter(bookmark => bookmark.NPI !== state.selectedClinic.NPI);
        return {...state, bookmarked: filteredBookmarked }

      case ON_LOADING:
        return { ...state,  loading: payload}

      default:
        return state;
    }
  };

 // Action Creators
export const getClinics = (searchTerm) => async dispatch => {
  if (!searchTerm || searchTerm.length === 0) {
    dispatch({ type: GET_CLINICS, payload: clearSearchResults});
  } else {
    const response = await listService.get(searchTerm);
    dispatch({ type: GET_CLINICS, payload: response });
  }
};
export const selectClinic = (item) => async dispatch => {
  const response = await coordsService.get(`forward?access_key=${positionKey}`, {params: {query: item[3]}});
  const detail = await detailService.get(`/lookupNPI/${item[1]}`);
  dispatch({type: SELECT_CLINIC, payload: {
    name: item[0], 
    NPI: item[1], 
    description: item[2],
    address: item[3], 
    coords: response,
    detail: detail
  }});
};
export const onSearch = (term) => ({
  type: ON_SEARCH,
  payload: term,
})
export const addBookmark = () => ({
  type: ADD_BOOKMARK,
  payload: null,
})
export const removeBookmark = () => ({
  type: REMOVE_BOOKMARK,
  payload: null,
})
export const onLoading = () => ({
  type: ON_LOADING,
  payload: true,
})

