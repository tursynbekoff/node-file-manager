import fs from 'fs';
import path from 'path';

const walk = function(dir, done) {

  const orderedList = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, orderedList);

    list.forEach(function(file) {
      const fileName = path.resolve(dir, file);
      fs.stat(fileName, function(err, stat) {
        if (stat.isDirectory()) {
          orderedList.push({'Name': file, 'Type': 'Directory'});
          if (!--pending) done(null, orderedList);
        }
      });
    });

    list.forEach(function(file) {
      const fileName = path.resolve(dir, file);
      fs.stat(fileName, function(err, stat) {
        if (!stat.isDirectory()) {
          orderedList.push({'Name': file, 'Type': 'File'});
          if (!--pending) done(null, orderedList);
        }
      });
    });

  });
};

export { walk }