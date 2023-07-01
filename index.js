import "colors";
import { inquirerMenu, leerInput, pause } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
// import inquirer from "inquirer";
// import * as fs from "fs";
// import readline from "readline";
// import { v4 as uuidv4 } from 'uuid';

console.clear();
const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const lugar = await leerInput("Ciudad: ");
        await busquedas.ciudad(lugar)

        console.log(lugar);
        // await fetch('https://api.openweathermap.org/data/2.5/weather?q=Ciudad&appid=APIKEY')

        // Buscar Lugares

        // Seleccionar lugar

        // Clima

        // Mostrar resultados
        console.log("\nInformacion de la cuidad\n");
        console.log("Cuidad: ");
        console.log("Latitud: ");
        console.log("Longitud: ");
        console.log("Temperatura: ");
        console.log("Mínima: ");
        console.log("Máxima: ");
        break;
    }
    console.log({ opt });

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
