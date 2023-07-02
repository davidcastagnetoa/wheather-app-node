import "colors";
import clear from "clear";
import {
  chooseIntruction,
  inquirerMenu,
  leerInput,
  listadoLugares,
  pause,
} from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

// import inquirer from "inquirer";
// import * as fs from "fs";
// import readline from "readline";
// import { v4 as uuidv4 } from 'uuid';

clear();
const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: ");

        // await fetch('https://api.openweathermap.org/data/2.5/weather?q=Ciudad&appid=APIKEY')

        // Buscar Lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar lugar
        const id = await listadoLugares(lugares);
        const lugarSeleccionado = lugares.find((l) => l.id === id);
        // Cancelar Instruccion
        if (id == 0) {
          break;
        }

        // Clima

        // Mostrar resultados
        console.log("\nInformacion de la cuidad\n".brightBlue);
        console.log(`${`Ciudad: `.brightWhite} ${lugarSeleccionado.nombre.brightGreen}`);
        console.log(`${`Latitud: `.brightWhite} ${lugarSeleccionado.latitud.toString().yellow}`);
        console.log(`${`Longitud: `.brightWhite} ${lugarSeleccionado.longitud.toString().yellow}`);
        console.log(`${`Temperatura: `.brightWhite} ${lugarSeleccionado.temp}`);
        console.log(`${`Mínima: `.brightWhite} ${lugarSeleccionado.min}`);
        console.log(`${`Máxima: `.brightWhite} ${lugarSeleccionado.max}`);
        break;
    }
    console.log({ opt });

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
