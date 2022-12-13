import fs from 'fs';

function deleteFile (file) {
  fs.unlink(file, function (err) {
      if (err) {
          console.error(err.toString());
      } else {
          console.warn(file + ' deleted');
      }
  });
}

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    return null;
  } catch {
    console.error('error operation failed');
  }
};

const mv = async (moveComandArr) => {
  let filePath = null;
  let fileMovePath = null;

  if (!moveComandArr[0] || moveComandArr[0].length === 0) {
    console.error('no file path given')
  } else {
    filePath = moveComandArr[0];
  }
  if (!moveComandArr[1] || moveComandArr[1].length === 0) {
    console.error('no move path given')
  } else {
    fileMovePath = moveComandArr[1];
  }


  try {
    const firstChar = filePath.indexOf('.');
    const fileExtension = filePath.slice(firstChar);
    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(`${fileMovePath}/movedFile${fileExtension}`);
  
    inputStream.pipe(outputStream).once("close", function () {
      inputStream.destroy(); 
      deleteFile(filePath);
    });
    outputStream.on('finish', () => {
      console.log(`You have successfully created a ${filePath} copy. The new file name is ${fileMovePath}.`);
    })
  } catch (err) {
    console.error(`move: ${err}`);
  }
}

export { mv }