import os from 'os';
import { up } from './commands/up.js';
import { walk } from './commands/ls.js';
import { cd } from './commands/cd.js';
import { cat } from './commands/cat.js';
import { add } from './commands/add.js';
import { rn } from './commands/rn.js';
import { cp } from './commands/cp.js';
import { mv } from './commands/mv.js';
import { rm } from './commands/rm.js';
import { hash } from './commands/hash.js';
import { compress } from './commands/compress.js';
import { decompress } from './commands/decompress.js';

const fileManager = () => {

  const args = process.argv;

  const startIndex = args.findIndex((e) => {
      return e.includes('--');
  })
  
  const arr = args.slice(startIndex, args.length);
  const userName = arr[1].split("=")[1];
  
  console.log(`Welcome to the File Manager, ${userName} \r\n`);
  console.log(`You are currently in path  ${os.homedir()}`);

  process.on('SIGINT', () => {
    console.log(`\n Thank you for using File Manager, ${userName}, goodbye!`)
    process.exit(0);
  })

  const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    
    if (chunkStringified.includes('.exit')) {
      console.log(`Thank you for using File Manager, ${userName}, goodbye! \n`)
      process.exit(0);
    } else if (chunkStringified.includes('up')) {
      up();
    } else if (chunkStringified.includes('ls')) {
      walk(process.cwd(), function(err, results) {
        if (err) throw err;
        console.table(results);
      })
    } else if (chunkStringified.includes('cd')) {
      const pathDir = chunkStringified.slice(3,-1);    
      cd(pathDir);
    } else if (chunkStringified.includes('cat')) {
      const pathToFile = chunkStringified.slice(4,-1);
      cat(pathToFile); 
    } else if (chunkStringified.includes('add')) {
      const fileName = chunkStringified.slice(4,-1);
      add(fileName);
    } else if (chunkStringified.includes('rn') && chunkStringified[0] === 'r') {
      const renameComandArr = chunkStringified.slice(3, -1).split(' ');
      rn(renameComandArr);
    } 
    else if (chunkStringified.includes('cp') && chunkStringified[0] === 'c') {
      const copyComandArr = chunkStringified.slice(3, -1).split(' ');
      cp(copyComandArr);
    } 
    else if (chunkStringified.includes('mv')) {
      const moveComandArr = chunkStringified.slice(3, -1).split(' ');
      mv(moveComandArr);
    } else if (chunkStringified.includes('rm')) {
      const deleteComandArr = chunkStringified.slice(3, -1).split(' ');
      rm(deleteComandArr);
    } else if (chunkStringified.includes('os --EOL')) {
      console.log(os.EOL);
    } else if (chunkStringified.includes('os --cpus')) {
      console.log(os.cpus())
    } else if (chunkStringified.includes('os --homedir')) {
      console.log(os.homedir());
    } else if (chunkStringified.includes('os --username') && chunkStringified.slice(5, 13) === 'username') {
      console.log(os.userInfo().username);
    } else if (chunkStringified.includes('os --architecture')) {
      console.log(os.arch());
    } else if (chunkStringified.includes('hash')) {
      const hashFile = chunkStringified.slice(5, -1).split(' ')[0];
      hash(hashFile);
    } else if (chunkStringified.includes('compress ') && chunkStringified[0][0] === 'c') {
      const arr = chunkStringified.slice(9, -1).split(' ');
      compress(arr);
    } else if (chunkStringified.includes('decompress ')) {
      const arr = chunkStringified.slice(11, -1).split(' ');
      decompress(arr);
    } else {
      console.log('Invalid input');
    }

    console.log(`You are currently in path  ${process.cwd()}`)
  };

  process.stdin.on('data', echoInput);

  console.log(args[0])

};

fileManager();