import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar"; // Adjusted path based on typical structure
import axios from "axios";
import { UserContext } from "../Providers/userContext";

// Helper component to re-center map when facilities change
const MapUpdater = ({ facilities }) => {
  const map = useMap();
  useEffect(() => {
    if (facilities.length > 0) {
      map.setView([facilities[0].Latitude, facilities[0].Longitude], 12);
    }
  }, [facilities, map]);
  return null;
};

const HealthcareSearch = () => {
  const { userData } = useContext(UserContext);
  const [category, setCategory] = useState("hospital");
  const [facilities, setFacilities] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  const locationObj = userData?.City || ""; // Added optional chaining safety
  console.log(locationObj);
  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/hospitals`, {
          params: {
            location: locationObj._id, // Ensure this contains the City ID, NOT the name "New York"
          },
        });
        setHospitalData(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    if (hospitalData) {
      setFacilities(
        hospitalData.filter(
          (facility) => facility.Facility_Type.toLowerCase() === category
        )
      );
    } else {
      setFacilities([]);
    }
  }, [category, hospitalData]);

  return (
    <div className="min-h-screen bg-[#f6f6ef] flex flex-col">
      <Navbar />

      {/* Main Content Container 
          Mobile: Vertical Stack (Map Top, List Bottom)
          Desktop: Horizontal Row (List Left, Map Right) 
          Height: 100vh minus Navbar height (approx 64px) to prevent double scroll
      */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-[#F5E8D0] font-sans border-t border-gray-400">
        {/* Sidebar / List Section 
            Mobile: Order 2 (Bottom), Half height
            Desktop: Order 1 (Left), Full height, 1/4 width
        */}
        <div className="w-full md:w-1/4 h-1/2 md:h-full bg-[#f6f6ef] shadow-xl flex flex-col border-r border-gray-300 order-2 md:order-1 z-10">
          {/* Sticky Header for List */}
          <div className="p-4 md:p-8 pb-2 md:pb-4 bg-[#f6f6ef] sticky top-0 z-20 border-b border-gray-200">
            <h1 className="text-xl md:text-2xl font-bold text-[#815b37] tracking-wide drop-shadow-md mb-4">
              Find Healthcare
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                className={`flex-1 md:flex-none py-2 px-3 rounded-lg text-white text-sm md:text-md font-semibold shadow-md transition-all duration-300 ${
                  category === "hospital"
                    ? "bg-[#9d7850]"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                onClick={() => setCategory("hospital")}
              >
                Hospitals
              </button>
              <button
                className={`flex-1 md:flex-none py-2 px-3 rounded-lg text-white text-sm md:text-md font-semibold shadow-md transition-all duration-300 ${
                  category === "clinic"
                    ? "bg-[#8A6E50]"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                onClick={() => setCategory("clinic")}
              >
                Clinics
              </button>
              <button
                className={`flex-1 md:flex-none py-2 px-3 rounded-lg text-white text-sm md:text-md font-semibold shadow-md transition-all duration-300 ${
                  category === "pharmacy"
                    ? "bg-[#8A6E50]"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                onClick={() => setCategory("pharmacy")}
              >
                Pharmacies
              </button>
            </div>
          </div>

          {/* Scrollable List */}
          <ul className="flex-1 overflow-y-auto p-4 md:p-8 pt-0">
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <li
                  key={facility._id}
                  className="py-3 border-b border-gray-300 hover:bg-amber-50 cursor-pointer transition-colors px-2 rounded"
                >
                  <div className="font-medium text-[#4A3B2D]">
                    {facility.Name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {facility.Rating} ⭐ • {facility.Timings}
                  </div>
                </li>
              ))
            ) : (
              <div className="py-4 text-gray-500 text-center">
                No facilities found in this category.
              </div>
            )}
          </ul>
        </div>

        {/* Map Section 
            Mobile: Order 1 (Top), Half height
            Desktop: Order 2 (Right), Full height, 3/4 width
        */}
        <div className="w-full md:w-3/4 h-1/2 md:h-full relative order-1 md:order-2">
          <MapContainer
            center={[40.7128, -74.006]}
            zoom={10}
            className="h-full w-full md:rounded-l-3xl overflow-hidden z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater facilities={facilities} />
            {facilities.map((facility) => (
              <Marker
                key={facility._id}
                position={[facility.Latitude, facility.Longitude]}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent={false} // Changed to false so map isn't cluttered
                >
                  {facility.Name}
                </Tooltip>
                <Popup>
                  <div className="p-2 md:p-4 text-[#4A3B2D] min-w-[200px]">
                    <h2 className="text-md md:text-lg font-bold mb-2 border-b pb-1 border-gray-300">
                      {facility.Name}
                    </h2>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Location:</strong> {facility.Location}
                      </p>
                      <p>
                        <strong>Contact:</strong> {facility.Contact}
                      </p>
                      <p>
                        <strong>Hours:</strong> {facility.Timings}
                      </p>
                      <p>
                        <strong>Rating:</strong> {facility.Rating} ⭐
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthcareSearch;
