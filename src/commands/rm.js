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

const rm = async (deleteComandArr) => {
  let filePath = null;

  if (!deleteComandArr[0] || deleteComandArr[0].length === 0) {
    console.error('no file path given')
  } else {
    filePath = deleteComandArr[0];
  }

  try {
    deleteFile(filePath);
  } catch (err) {
    console.error(`rename: ${err}`);
  }

}

export { rm }