import fs from 'fs';

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    return null;
  } catch {
    console.error('no such file');
  }
};

const cat = async (pathToFile) => {
  
  if (pathToFile.length === 0) {
    console.error('no path given to file!')
  }

  try {
    // await isFileExist(pathToFile);

    fs.createReadStream(`${pathToFile}`, 'utf-8')
    .pipe(process.stdout);
  } catch (err) {
    console.error(`cat: ${err}`);
  }
}

export { cat }