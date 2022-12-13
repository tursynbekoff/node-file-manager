const cd = (pathDir) => {
  
  if (pathDir.length === 0) {
    console.error('no path given')
  }

  try {
    process.chdir(`${pathDir}`)
  } catch (err) {
    console.error(`chdir: ${err}`);
  }
}

export { cd }