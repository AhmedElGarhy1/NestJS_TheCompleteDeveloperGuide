import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';
// import { DataSource, getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {
    // nothing happend
  }
});
global.afterEach(async () => {
  // getConnection()
});
