const { execSync } = require('child_process');  // Importa execSync para ejecutar comandos shell sincronamente
const fs = require('fs');                        
const path = require('path');                    
const YAML = require('yaml');                    // Librería para parsear y serializar YAML
const deepmerge = require('deepmerge');          // Librería para hacer merge profundo entre objetos JS

// Función para leer un archivo YAML, que puede estar cifrado (.gpg/.enc) o en texto plano
function readYaml(pathStr) {
  const ext = path.extname(pathStr);             // Obtiene la extensión del archivo (ej: '.gpg', '.yaml')

  let content;

  // Si el archivo está cifrado (.gpg o .enc), se descifra con GPG antes de leerlo
  if (ext === '.gpg' || ext === '.enc') {
    console.log(`🔐 Descifrando ${pathStr}`);
    // Ejecuta el comando gpg para descifrar y devuelve el contenido en texto plano
    content = execSync(`gpg --decrypt ${pathStr}`, { encoding: 'utf8' });
  } else {
    // Si no está cifrado, lee el archivo directamente en texto
    content = fs.readFileSync(pathStr, 'utf8');
  }

  // Parsea el contenido YAML a objeto JavaScript y lo devuelve
  return YAML.parse(content);
}

// Función que recibe un array de rutas a archivos YAML y los combina en un solo objeto
function mergeYamlFiles(paths) {
  // Lee y parsea cada archivo YAML (descifra si es necesario)
  const yamls = paths.map(readYaml);

  // Usa deepmerge para combinar todos los objetos en uno solo (merge profundo)
  return yamls.reduce((acc, curr) => deepmerge(acc, curr), {});
}

// Ejemplo de uso: merge de 3 archivos (2 YAML planos + 1 cifrado)
const result = mergeYamlFiles([
  'config/base.yaml',
  'config/override.yaml',
  'config/secrets.yaml' // O usa el archivo gpg que generaste
]);

console.log('🧪 Resultado final:');
// Convierte el objeto resultante de vuelta a YAML para mostrarlo por consola
console.log(YAML.stringify(result));
