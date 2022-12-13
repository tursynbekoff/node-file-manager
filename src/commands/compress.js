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

const compress = async (arr) => {

  let file = null;
  let path = null;
  if (!arr[0] || arr[0].length === 0) {
    console.error('no file path given')
  } else {
    file = arr[0];
  }
  if (!arr[1] || arr[1].length === 0) {
    console.error('no compress path given')
  } else {
    path = arr[1];
  }
  
  try {
    const gzip = zlib.createGzip();
    const read = fs.createReadStream(file);
    const write = fs.createWriteStream(`${path}/archive.gz`);
    read.pipe(gzip).pipe(write);
  } catch (err) {
    console.error(`compress: ${err}`);
  }
}

export { compress }