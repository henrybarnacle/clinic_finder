import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClinics, selectClinic, onSearch, onLoading } from '../globalState/clinics';

export const ClinicSearch = (props) => {

    useEffect(() => {  
        const timeoutId = setTimeout(() => {
            props.getClinics(props.searchTerm);
        }, 500);
        return () => {
          clearTimeout(timeoutId);
        };
      }, [props.searchTerm]);

    const userSearch = (e) => {
        props.onSearch(e.target.value);
    }
    const onSelectClinic = (clinic) => {
        props.onLoading();
        props.selectClinic(clinic);
    }
    const showClinicList = () => {
        return props.list.map(clinic => {
            return (
                <li key={clinic[1]} onClick={() => {onSelectClinic(clinic)}}>
                    <Link to="/detail">{clinic[0]}</Link><span>- {clinic[2]}</span>
                </li>
            ); 
        })
    }
    const onViewBookmarkedClinic = (clinic) => {
        props.onLoading();
        const selectClinic = [clinic.name, clinic.NPI, clinic.description, clinic.address];
        onSelectClinic(selectClinic);
    }
    const showBookmarked = () => {
        return props.bookmarked.map((clinic, index) => {
            return (
                <li key={index} onClick={() => {onViewBookmarkedClinic(clinic)}} className="list-group-item">
                    <Link to="/detail">{clinic.name}</Link><span>- {clinic.description}</span>
                </li>
            ); 
        })
    }
    return (
        <div className="row g-2">
            <div className="typeahead-dropdown col-6">
                <input type="text" placeholder="Find providers and services.." defaultValue={props.searchTerm} onChange={(e) => {userSearch(e)}}></input>
                <ul className={props.list.length === 0 ? "hide-list" : ""}>{showClinicList()}</ul>
            </div>
            <div className="col-6">
                <ul className="list-group display-bookmarked">
                    {showBookmarked()}
                </ul>
            </div>

        </div>
    );
}
const mapStateToProps = (state) => {
    return { 
            list: state.clinics.list, 
            searchTerm: state.clinics.searchTerm,
            bookmarked: state.clinics.bookmarked
        };
};
const mapDispatchToProps = {
    getClinics,
    selectClinic,
    onSearch,
    onLoading
  };
const ClinicSearchRedux = connect(mapStateToProps, mapDispatchToProps)(ClinicSearch);
  
export default ClinicSearchRedux;


