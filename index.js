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

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: ");

        // Buscar Lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar lugar
        const id = await listadoLugares(lugares);
        const lugarSeleccionado = lugares.find((l) => l.id === id);

        // Cancelar Instruccion
        if (id == 0) {
          continue;
        }

        // Clima
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.latitud,
          lugarSeleccionado.longitud
        );

        // Guardar en DB
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        // Mostrar resultados
        console.log("\nInformacion de la cuidad\n".brightBlue);
        console.log(`${`Ciudad: `.brightWhite} ${lugarSeleccionado.nombre}`);
        console.log(`${`Latitud: `.brightWhite} ${lugarSeleccionado.latitud.toString().yellow}`);
        console.log(`${`Longitud: `.brightWhite} ${lugarSeleccionado.longitud.toString().yellow}`);
        console.log(
          `${`Clima: `.brightWhite} ${
            capitalizeFirstLetter(clima.description.toString()).brightCyan
          }`
        );
        console.log(`${`Temperatura: `.brightWhite} ${clima.average_temp.toString().yellow}`);
        console.log(`${`Máxima: `.brightWhite} ${clima.max_temp.toString().red}`);
        console.log(`${`Mínima: `.brightWhite} ${clima.min_temp.toString().cyan}`);
        console.log(`${`Humedad: `.brightWhite} ${clima.humidity.toString()}\n`);
        break;

      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.brightWhite;
          console.log(`${idx} ${lugar}`);
        });
    }
    // console.log({ opt });

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
