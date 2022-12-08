import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const fileManager = () => {

  const args = process.argv;

  const startIndex = args.findIndex((e) => {
      return e.includes('--');
  })
  
  const arr = args.slice(startIndex, args.length);
  const userName = arr[1].split("=")[1];

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  
  console.log(`Welcome to the File Manager, ${userName} \r\n`);
  console.log(`You are currently in path  ${process.cwd()}`);

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
      process.chdir('..');
      console.log(process.cwd())
    } else if (chunkStringified.includes('ls')) {
      var walk = function(dir, done) {
        var results = [];
        fs.readdir(dir, function(err, list) {
          if (err) return done(err);
          var pending = list.length;
          if (!pending) return done(null, results);
          list.forEach(function(file) {
            const fileName = path.resolve(dir, file);
            fs.stat(fileName, function(err, stat) {
              if (stat.isDirectory()) {
                results.push({'Name': file, 'Type': 'Directory'});
                if (!--pending) done(null, results);
              } else {
                results.push({'Name': file, 'Type': 'File'});
                if (!--pending) done(null, results);
              }
            });
          });
        });
      };

      walk(process.cwd(), function(err, results) {
        if (err) throw err;
        console.table(results);
      })
  
    } else {
      console.log('Invalid input');
    }

    console.log(`You are currently in path  ${process.cwd()}`)
    // process.stdout.write(`Received from master process: ${userName}\n`)
  };

  process.stdin.on('data', echoInput);

  console.log(args[0])

};

fileManager();