import "dotenv/config";
import axios from "axios";

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "Buenos Aires"];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMadbox() {
    return {
      access_token: process.env.MAPBOX_TOKEN,
      limit: 5,
      language: "es",
      proximity: "ip",
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
}
export { Busquedas };
