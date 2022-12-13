import fs from 'fs';

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    return null;
  } catch {
    console.error('error operation failed');
  }
};

const rn = async (renameComandArr) => {
  const oldName = renameComandArr[0];
  const newName = renameComandArr[1];
  
  if (oldName.length === 0) {
    console.error('no path given to file!')
  }

  try {
    await isFileExist(oldName);
    fs.rename( oldName, newName, (err) => {
      console.log(err)
    })
  } catch (err) {
    console.error(`remove: ${err}`);
  }
}

export { rn }