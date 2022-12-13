import fs from 'fs';

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    return null;
  } catch {
    console.error('error operation failed');
  }
};

const cp = async (copyComandArr) => {
  let filePath = null;
  let fileCopyPath = null;
  if (!copyComandArr[0] || copyComandArr[0].length === 0) {
    console.error('no file path given')
  } else {
    filePath = copyComandArr[0];
  }
  if (!copyComandArr[1] || copyComandArr[1].length === 0) {
    console.error('no copy path given')
  } else {
    fileCopyPath = copyComandArr[1];
  }
  
  try {
    const firstChar = filePath.indexOf('.');
    const fileExtension = filePath.slice(firstChar);
    const inputStream = fs.createReadStream(filePath)
    const outputStream = fs.createWriteStream(`${fileCopyPath}/copiedFile${fileExtension}`);
    inputStream.pipe(outputStream)
    outputStream.on('finish', () => {
      console.log(`You have successfully created a ${filePath} copy. The new file name is ${fileCopyPath}.`);
    })
  } catch (err) {
    console.error(`cat: ${err}`);
  }
}

export { cp }