const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const deepmerge = require('deepmerge');

/**
 * Función pura que parsea un string YAML a objeto JS.
 * @param {string} content 
 * @returns {object}
 */
const parseYaml = (content) => YAML.parse(content);

/**
 * Función pura que convierte objeto JS a string YAML.
 * @param {object} obj 
 * @returns {string}
 */
const toYamlString = (obj) => YAML.stringify(obj);

/**
 * Función pura que realiza merge profundo de array de objetos.
 * @param {object[]} objs 
 * @returns {object}
 */
const mergeObjects = (objs) => objs.reduce((acc, curr) => deepmerge(acc, curr), {});

/**
 * Función IO que lee un archivo y devuelve su contenido descifrado o plano.
 * @param {string} filePath 
 * @returns {string} contenido en texto
 */
const readFileContent = (filePath) => {
  const ext = path.extname(filePath);
  if (ext === '.gpg' || ext === '.enc') {
    console.log(`🔐 Descifrando ${filePath}`);
    return execSync(`gpg --decrypt ${filePath}`, { encoding: 'utf8' });
  } else {
    return fs.readFileSync(filePath, 'utf8');
  }
};

/**
 * Función IO que lee y parsea varios archivos YAML (descifrando si toca).
 * @param {string[]} paths 
 * @returns {object[]} array de objetos JS
 */
const readAndParseYamls = (paths) => paths.map(filePath => parseYaml(readFileContent(filePath)));

// Uso principal:

const paths = [
  'config/base.yaml',
  'config/override.yaml',
  'config/secrets.yaml' // O usa el archivo gpg que generaste
];

const yamls = readAndParseYamls(paths);
const merged = mergeObjects(yamls);
const resultYaml = toYamlString(merged);

console.log('🧪 Resultado final:');
console.log(resultYaml);
