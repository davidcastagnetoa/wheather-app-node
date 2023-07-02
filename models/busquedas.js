import "dotenv/config";
import axios from "axios";
import * as fs from "fs";

class Busquedas {
  historial = [""];
  dbPath = "./db/database.json";

  constructor() {
    // leer DB si existe
    this.leerDB();
  }

  get paramsMadbox() {
    return {
      access_token: process.env.MAPBOX_TOKEN,
      limit: 5,
      language: "es",
      proximity: "ip",
    };
  }
  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_APIKEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // Peticion HTTP
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMadbox,
      });
      const response = await intance.get();
      return response.data.features.map((lugar) => {
        return {
          id: lugar.id,
          nombre: lugar.place_name,
          longitud: lugar.center[0],
          latitud: lugar.center[1],
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });
      const response = await instance.get();
      const { weather, main, sys } = response.data;
      return {
        description: weather[0].description,
        min_temp: main.temp_min,
        max_temp: main.temp_max,
        average_temp: main.temp,
        country: sys.country,
        humidity: main.humidity,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async agregarHistorial(lugar = "") {
    // Prevenir duplicados
    if (this.historial.includes(lugar)) {
      return;
    }
    this.historial.unshift(lugar);

    // Guardar en DB maximo 5 resultados
    if (this.historial.length > 5) {
      this.historial.pop();
    }

    // Guardar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = { historial: this.historial };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    // Si el archivo no existe retornar
    if (!fs.existsSync(this.dbPath)) {
      return;
    }
    // Si existe leerlo y asignarlo a la propiedad historial de la clase.
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);
    this.historial = data.historial;
  }
}
export { Busquedas };
