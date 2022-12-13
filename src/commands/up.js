const up = () => {
  process.chdir('..');
  console.log(process.cwd());
}

export { up }