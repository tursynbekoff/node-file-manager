import fs from 'fs';
import crypto from 'crypto';

const isFileExist = async (pathToFile) => {
  try {
    const files = await fs.readdir(pathToFile);

    return null;
  } catch {
    console.error('no such file');
  }
};

const hash = async (hashFile) => {
  
  if (hashFile.length === 0) {
    console.error('no path given to file!')
  }

  try {
    fs.readFile( hashFile , 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(crypto.createHash('sha256').update(data).digest('hex'));
    });
  } catch (err) {
    console.error(`cat: ${err}`);
  }
}

export { hash }