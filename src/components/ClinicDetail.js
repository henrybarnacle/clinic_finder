import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl'; 
import { addBookmark, removeBookmark } from '../globalState/clinics';

export const ClinicDetail = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

 useEffect(() => {
     if (props.selected.coords.data) {
        updateMap();
    }
  },[props.selected]);

  const updateMap = () => {
    let clinicCoords = props.selected.coords.data.data[0];
    if (clinicCoords.latitude && clinicCoords.longitude) {
        const lng = clinicCoords.longitude;
        const lat = clinicCoords.latitude;
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 13
        });
        const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    }
  }
  const formatAddress = () => {
    const addressDetails = props.selected.address.split(',').map((line, index) => {
        return <div key={index}>{line}</div>
    });
    return (
        <div>
        <h6>Location</h6>
            <div>
                <div>{props.selected.name}</div>
                <div>{addressDetails}</div>
            </div>
        </div>
    )
  }
  const formatPhone = () => {
      if (props.selected.detail && props.selected.detail.data) {
        const phoneNumber =  props.selected.detail.data.results[0].addresses[0].telephone_number;
        return (
            <div>
                <h6>Phone</h6>
                <div>{phoneNumber}</div>
            </div>
        )
      }
}
const formatDescription= () => {
    if (props.selected.detail && props.selected.detail.data) {
      const description =  props.selected.detail.data.results[0].taxonomies[0].desc;
      return (
          <div>
              <h6>Specialties</h6>
              <div>{description}</div>
          </div>
      )
    }
}
const isBookmarked = () => {
    if (props.bookmarked.some(item => (item.NPI === props.selected.NPI))) {
        return <i onClick={props.removeBookmark} className="bi bi-bookmark-check-fill"></i>;
    } else {
       return <i onClick={props.addBookmark} className="bi bi-bookmark-check"></i>;
    }
}
    return (
        <div>
            <div className={`${!props.loading ? "visually-hidden" : "display-spinner"}`}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className={`${props.loading ? "visually-hidden" : ""}`}>
                <div>
                    <div className="bookmark">
                        {isBookmarked()} 
                    </div>
                    <h2>{props.selected.name}</h2>
                    <h6 className="description-heading">{props.selected.description}</h6>
                </div>
                <hr></hr>
                <div>
                    <div className="detail-contact">{formatDescription()}</div>
                    <div className="detail-contact">{formatPhone()}</div>
                    <div className="detail-address">{formatAddress()}</div>
                    <div ref={mapContainer} className="map-container" />
                </div>
            </div>
        </div>
        
    );
}
const mapStateToProps = (state) => {
    return { selected: state.clinics.selectedClinic, bookmarked: state.clinics.bookmarked, loading: state.clinics.loading };
};
const mapDispatchToProps = {
    addBookmark,
    removeBookmark
  };
const ClinicDetailRedux = connect(mapStateToProps, mapDispatchToProps)(ClinicDetail);
  
export default ClinicDetailRedux;