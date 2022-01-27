import clinics from '../globalState/clinics';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    clinics,
});

export default rootReducer;
