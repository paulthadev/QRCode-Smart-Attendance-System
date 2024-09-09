/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const MapModal = ({ onClose, selectedLocation, setSelectedLocation }) => {
  // Custom component to handle map click and update selected location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const location = e.latlng;
        setSelectedLocation(location); // Store selected location coordinates
      },
    });

    return selectedLocation ? (
      <Marker position={selectedLocation}>
        <Popup>
          Latitude: {selectedLocation.lat.toFixed(4)}
          <br />
          Longitude: {selectedLocation.lng.toFixed(4)}
        </Popup>
      </Marker>
    ) : null;
  };

  useEffect(() => {
    // Fix the default icon issue with Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <dialog open className="modal">
      <div className="modal-box modal-bottom sm:modal-middle w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">FUTA Map!</h3>

        <div className="relative top-0 left-0 w-full h-[550px]">
          <MapContainer
            center={[7.3056, 5.1357]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* LocationMarker component handles map clicks and updates the selected location */}
            <LocationMarker />
          </MapContainer>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MapModal;
