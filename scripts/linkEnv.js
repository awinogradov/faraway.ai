/* eslint-disable no-console */
const path = require('path');
const logSymbols = require('log-symbols');
const fsExtra = require('fs-extra');

const configs = ['projects/functions/src/configs'];

if (!process.env.NODE_ENV) {
  throw new Error(`${logSymbols.error} NODE_ENV must be specified!`);
}

configs.forEach(configPath => {
  const currentEnvConfPath = path.resolve(process.cwd(), configPath, `${process.env.NODE_ENV}.ts`);
  const symlinkPath = path.resolve(process.cwd(), configPath, 'index.ts');

  if (fsExtra.existsSync(symlinkPath)) {
    console.log(logSymbols.warning, `Symlink for ${process.env.NODE_ENV} already exists ${symlinkPath}.`);
    fsExtra.removeSync(symlinkPath);
  }

  if (!fsExtra.existsSync(currentEnvConfPath)) {
    throw new Error(`${logSymbols.error} Config for ${process.env.NODE_ENV} doesn't exists!`);
  }

  fsExtra.ensureSymlinkSync(currentEnvConfPath, symlinkPath);
  console.log(logSymbols.success, `${process.env.NODE_ENV} linked successfully to ${currentEnvConfPath}!`);
});
