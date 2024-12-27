import React from "react";

const CountryData = ({ country }) => {
  console.log(country);
  return (
    <div className="country">
      {/* Name */}
      <h1 className="country-name">{country.name.common}</h1>
      {/* Capital */}
      <p className="country-capital">
        Capital: <span>{country.capital}</span>
      </p>
      <p className="country-capital">
        Area: <span>{country.area}</span>
      </p>
      {/* Languages */}
      <div className="languages">
        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      </div>
      {/* Flag */}
      <div>
        <img src={country.flags.png} alt="flag" />
      </div>
    </div>
  );
};

export default CountryData;
