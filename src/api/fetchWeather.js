import { helpHttp } from "../helpers/helpHttp";

const API_KEY = "f33a484cf794d08d0148764789aaba32";
const lang = navigator.language.slice(0, 2);

export const fetchWeather = async (query) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=${lang}`;

  const res = await helpHttp().get(URL);

  return res;
};
