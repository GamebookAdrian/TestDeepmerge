# merge-yaml-sop

Proyecto para combinar múltiples archivos YAML en uno solo, con soporte para archivos cifrados usando GPG y compatible con SOP (Same-Origin Policy).

---

## Descripción

Este pequeño script en Node.js permite leer varios archivos YAML, incluyendo archivos cifrados con GPG (`.gpg`), descifrarlos, y hacer un merge profundo de su contenido usando la librería `deepmerge`. Ideal para manejar configuraciones en entornos seguros que requieren cifrado de secretos.

---

## Características

- Lectura de archivos YAML normales y cifrados (`.gpg` o `.enc`).
- Descifrado automático de archivos usando GPG (debes tener la clave privada configurada).
- Merge profundo de varios archivos YAML en un solo objeto.
- Exporta el resultado final en formato YAML legible.

---

## Requisitos

- Node.js v16 o superior (por soporte a sintaxis moderna).
- GPG instalado y configurado con tus claves pública y privada.
- `gpg-agent` y `pinentry` para descifrado sin interacción (opcional pero recomendado).

---

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu_usuario/merge-yaml-sop.git
cd merge-yaml-sop
```

2. Instala dependencias:

```bash
npm install
```

3. Asegúrate de tener tu clave GPG privada importada en tu sistema:

```bash
gpg --list-secret-keys
```

---

## Uso

Edita el array en `merge-yaml-sop.js` para indicar los archivos YAML que quieres combinar. Puede incluir archivos `.yaml` normales y `.gpg` cifrados.

Ejecuta el script:

```bash
node merge-yaml-sop.js
```

Verás el resultado del merge en consola en formato YAML.

---

## Notas sobre GPG y cifrado

- Para cifrar un archivo de secretos y usarlo con el script, puedes hacer:

```bash
gpg --encrypt -r tu_email@dominio.com -o config/secrets.yaml.gpg config/secrets.yaml
```

- Si tu clave privada tiene passphrase, asegúrate de tener configurado `gpg-agent` para evitar fallos de descifrado en modo no interactivo.

---

## Dependencias

- [yaml](https://www.npmjs.com/package/yaml)
- [deepmerge](https://www.npmjs.com/package/deepmerge)

---

## Licencia

MIT License

---

## Autor

Adrian Bejarano  
https://gamebook.studio  
adrian.bejarano@gamebook.studio
