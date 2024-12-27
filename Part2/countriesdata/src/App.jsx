import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CountryData from "./components/CountryData";
function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const FilterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const Context = () => {
    if (FilterCountries.length > 10) {
      return <p className="search">Too many matches, specify another filter</p>;
    } else if (FilterCountries.length === 1) {
      return (
        <div>
          <CountryData country={FilterCountries[0]} />
        </div>
      );
    } else if (FilterCountries.length < 10) {
      return (
        <div className="all-countries">
          {FilterCountries.map((country, index) => (
            <div>
              <p className="">{country.name.common}</p>
              <button
                onClick={() => setSearchQuery(country.name.common)}
                className="btn-show"
              >
                Show{" "}
              </button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h1>Counries Data</h1>
      {/* SerachBar */}
      <div className="search">
        <label htmlFor="search">Find Countries</label>
        <input
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Show Countries */}
      <Context />
    </div>
  );
}

export default App;
