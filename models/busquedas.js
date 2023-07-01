import axios from "axios";
class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "Buenos Aires"];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMadbox() {
    return {
      access_token:
        "pk.eyJ1IjoiZGF2aWRjYXN0YWduZXRvYSIsImEiOiJjbGprMnNrbDcwZjY1M2RwZDR0bzRodDJ1In0.zAAConVptOSYuvlh56uDDQ",
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
      console.log(response.data);
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
export { Busquedas };
