import "normalize.css";
import "./App.css";

import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

import Message from "./components/Message";
import AnimatedCircles from "./components/AnimatedCircles";
import Loadding from "./components/Loadding";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [loadding, setLoadding] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoadding(true);

    /* Verification */
    if (!/[a-zA-Z]+/.test(query)) {
      alert("Set a valid country name!");
      return;
    } else if (query.length === 0) return;

    const res = await fetchWeather(query);
    // console.log(res);
    setWeather(res);
    setQuery("");
    setLoadding(false);
  };

  return (
    <>
      <h1>Quick weather</h1>
      <form className="form">
        <input
          className="form__input"
          type="text"
          placeholder="London..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" onClick={search} className="form__btn">
          <span>Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 form__icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>

      {loadding ? (
        <Loadding />
      ) : (
        weather && (
          <div className="card">
            {weather && weather.err ? (
              <Message msg="We couldn't find that location, please try again"></Message>
            ) : (
              <>
                <div className="card__head">
                  <h2 className="card__name">{weather.name}</h2>
                  <sup className="card__country">{weather.sys.country}</sup>
                </div>
                <div className="card__temp">
                  {Math.round(weather.main.temp)}&deg;C
                </div>
                <div className="card__description">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                  <p className="card__desc">{weather.weather[0].description}</p>
                </div>
              </>
            )}
          </div>
        )
      )}

      <AnimatedCircles />
    </>
  );
};

export default App;
