import fs from 'fs';
import zlib from 'zlib';

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    return null;
  } catch {
    console.error('no such file');
  }
};

const decompress = async (arr) => {

  let file = null;
  let path = null;
  if (!arr[0] || arr[0].length === 0) {
    console.error('no file path given')
  } else {
    file = arr[0];
  }
  if (!arr[1] || arr[1].length === 0) {
    console.error('no decompress path given')
  } else {
    path = arr[1];
  }
  
  try {
    const unzip = zlib.createUnzip();
    const read = fs.createReadStream(file);
    const write = fs.createWriteStream(`${path}/unziped.txt`);
    read.pipe(unzip).pipe(write);
  } catch (err) {
    console.error(`decompress: ${err}`);
  }
}

export { decompress }