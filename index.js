import "colors";
import { leerInput } from "./helpers/inquirer.js";
// import inquirer from "inquirer";
// import * as fs from "fs";
// import readline from "readline";
// import { v4 as uuidv4 } from 'uuid';

console.clear();
const main = async () => {
  const text = await leerInput('Hi: ');
  console.log(text);
};

main();
