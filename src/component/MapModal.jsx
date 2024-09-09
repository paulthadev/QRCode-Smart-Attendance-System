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
import axios from "axios";
import L from "leaflet";

const MapModal = ({
  onClose,
  selectedLocationCordinate,
  setSelectedLocationCordinate,
  selectedLocationName,
  setSelectedLocationName,
}) => {
  // Function to reverse geocode the coordinates into a readable address
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const address = response.data.display_name;
      setSelectedLocationName(address);
    } catch (error) {
      console.error("Error with reverse geocoding:", error);
    }
  };

  // Custom component to handle map click and update selected location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const location = e.latlng;
        setSelectedLocationCordinate(location); // Store selected location coordinates

        // Call reverse geocode function to get the address
        reverseGeocode(location.lat, location.lng);
      },
    });

    return selectedLocationCordinate ? (
      <Marker position={selectedLocationCordinate}>
        <Popup>
          Latitude: {selectedLocationCordinate.lat.toFixed(4)}
          <br />
          Longitude: {selectedLocationCordinate.lng.toFixed(4)}
          <br />
          {selectedLocationName && <span>{selectedLocationName}</span>}
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
        <p className="font-bold text-center text-lg sm:text-sm pb-2">
          Map of Federal University of Technology, Akure.
        </p>

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
