import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { apiRoute } from "../utils/apiRoute";

export default function SearchLocation() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching locations from:', apiRoute.getLocations);
    fetch(apiRoute.getLocations)
      .then((res) => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Response data:', data);
        if (data.success) {
          setLocations(data.data);
          setFilteredLocations(data.data);
        } else {
          setError(data.error || "Failed to fetch locations");
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError("Error fetching data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = locations.filter((loc) =>
      loc.title.toLowerCase().includes(term)
    );
    setFilteredLocations(filtered);
  };

  if (loading) return <p>Loading locations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* 🔍 Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search locations..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 📦 Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((loc) => (
            <Card
              key={loc.id}
              id={loc.id}
              location={loc.title}
              numerator={loc.total_rating}
              denominator={loc.num_ratings}
              reviews={loc.num_ratings}
              scene={`http://localhost/Bhramanapp/Backend/${loc.image_path}`}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">No matching locations found.</p>
        )}
      </div>
    </div>
  );
}
