const color = require("colors");

const bold = color.bold;

const fs = require("fs");

const process = require("process");

const fsMethod_Input = process.argv[2];
const fileName_Input = process.argv[3];
const textContent_Input = process.argv[4];

switch (fsMethod_Input) {
  case "create":
    createNewTextFile(fileName_Input);
    break;
  case "read":
    readTextFile(fileName_Input);
    break;
  case "append":
    appendTextInTextFile(fileName_Input, textContent_Input);
    break;
  case "delete":
    deleteTextFile(fileName_Input);
    break;
  case "rename":
    renameFileName(fileName_Input, textContent_Input);
    break;
  case "list":
    listAllFiles(fileName_Input);
    break;
  default:
    modifyOprationNotDefineConsole(
      "\nInvalid file operation. Please provide valid operation (create, read, append, delete , rename , list)\n"
    );
    break;
}

function createNewTextFile(fileName) {
  fs.writeFile(fileName, "", (err) => {
    if (err) {
      modifyErrorMsgConsole(err);
    } else {
      modifyResultMsgConsole(`\nCreated ${fileName} file \n`);
    }
  });
}

function readTextFile(fileName) {
  fs.readFile(fileName, "utf-8", (err, result) => {
    if (err) {
      modifyErrorMsgConsole(err);
    } else {
      modifyResultMsgConsole(`\n${result}\n`);
    }
  });
}

function appendTextInTextFile(fileName, textContent) {
  fs.appendFile(fileName, `\n${textContent}`, (err) => {
    if (err) {
      modifyErrorMsgConsole(err);
    } else {
      modifyResultMsgConsole(`\nText are Append on ${fileName} file\n`);
    }
  });
}

function deleteTextFile(fileName) {
  fs.unlink(fileName, (err) => {
    if (err) {
      modifyErrorMsgConsole(err);
    } else {
      modifyResultMsgConsole(`\n${fileName} file are deleted\n`);
    }
  });
}

function renameFileName(fileName, newFileName) {
  fs.rename(fileName, newFileName, (err) => {
    if (err) {
      modifyErrorMsgConsole(err);
    } else {
      modifyResultMsgConsole(`\nRenamed ${fileName} to ${newFileName}\n`);
    }
  });
}

function listAllFiles(path) {
  fs.readdir(path, (err, files) => {
    if (err) {
      modifyErrorMsgConsole(err);
    } else {
      files.forEach((file, index) => {
        modifyResultMsgConsole(`${index + 1}. ${file}`);
      });
    }
  });
}

function modifyOprationNotDefineConsole(msg) {
  console.log(bold(color.blue(msg)));
}

function modifyErrorMsgConsole(msg) {
  console.log(bold(color.red(`\n${msg}\n`)));
}

function modifyResultMsgConsole(msg) {
  console.log(bold(color.green(`\n${msg}\n`)));
}
