const fs = require('fs/promises');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../db');

const readData = async (fileName) => {
  const filePath = path.join(dbPath, fileName);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

const writeData = async (fileName, data) => {
  const filePath = path.join(dbPath, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { readData, writeData };