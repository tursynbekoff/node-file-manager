import fs from 'fs';

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    if (files) {
      console.error('file already exists');
    }
    return null;
  } catch {
    console.error('error operation failed');
  }
};

const add = async (pathToFile) => {
  
  if (pathToFile.length === 0) {
    console.error('no path given to file!')
  }

  try {
    // await isFileExist(pathToFile);
    fs.appendFile(`${pathToFile}`, '', function (err) {
      if (err) throw err;
    })
  } catch (err) {
    console.error(`add: ${err}`);
  }
}

export { add }