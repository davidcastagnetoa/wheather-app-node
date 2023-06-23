import "colors";
import inquirer from "inquirer";

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed task`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending task`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("╔════════════════════╗".green);
  console.log(`${"║".green}  Select an option  ${"║".green}`.white);
  console.log("╚════════════════════╝\n".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"enter".green} to continue`,
    },
  ];
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${indice}.- ${tarea.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "Cancel instruction",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Do you want to delete this task?",
      choices: choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
      default: false,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${indice}.- ${tarea.description}`,
      checked: tarea.completadoEn ? true : false, //
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select tasks",
      choices: choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
};

const chooseIntruction = async (message) => {
  const questionIntruction = [
    {
      type: "list",
      name: "chooseIntruction",
      value: "chooseIntruction",
      message,
      choices: [
        {
          value: "0",
          name: `${"1.".green} Cancel`,
        },
        {
          value: "1",
          name: `${"1.".green} Confirm`,
        },
      ],
    },
  ];
  const { chooseIntruction } = await inquirer.prompt(questionIntruction);
  return chooseIntruction;
};

export {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
  chooseIntruction,
};
