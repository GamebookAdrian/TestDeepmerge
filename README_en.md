# merge-yaml-sop

Project to merge multiple YAML files into a single one, with support for encrypted files using GPG and compatible with SOP (Same-Origin Policy).

---

## Description

This small Node.js script allows reading multiple YAML files, including GPG-encrypted files (`.gpg`), decrypting them, and deeply merging their content using the `deepmerge` library. Ideal for managing configurations in secure environments requiring encryption of secrets.

Additionally, the main logic is implemented following pure functional programming principles, clearly separating pure logic (parsing, merging, serialization) from input/output (file reading and decryption).

---

## Features

- Reads normal and encrypted YAML files (`.gpg` or `.enc`).
- Automatic decryption of files using GPG (you must have the private key configured).
- Deep merge of multiple YAML files into a single object.
- Outputs the final result in readable YAML format.
- Code separated into pure functions and IO functions for easier testing and maintenance.

---

## Requirements

- Node.js v16 or higher (for modern syntax support).
- GPG installed and configured with your public and private keys.
- `gpg-agent` and `pinentry` for non-interactive decryption (optional but recommended).

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your_username/merge-yaml-sop.git
cd merge-yaml-sop
```

2. Install dependencies:

```bash
npm install
```

3. Make sure your GPG private key is imported in your system:

```bash
gpg --list-secret-keys
```

---

## Usage

Edit the array in `merge-yaml-sop.js` to specify the YAML files you want to combine. It can include normal `.yaml` files and encrypted `.gpg` files.

Run the script:

```bash
node merge-yaml-sop.js
```

You will see the merged output in YAML format printed to the console.

---

## Notes on GPG and Encryption

- To encrypt a secrets file and use it with the script, you can run:

```bash
gpg --encrypt -r your_email@domain.com -o config/secrets.yaml.gpg config/secrets.yaml
```

- If your private key has a passphrase, make sure you have `gpg-agent` configured to avoid decryption failures in non-interactive mode.

---

## Code Structure

The project is organized into pure functions and IO functions to maintain clean design:

- `parseYaml(content: string): object` — Pure function to parse YAML.
- `toYamlString(obj: object): string` — Pure function to serialize to YAML.
- `mergeObjects(objs: object[]): object` — Pure function to deeply merge objects.
- `readFileContent(path: string): string` — IO function to read or decrypt a file.
- `readAndParseYamls(paths: string[]): object[]` — IO function to read and parse multiple files.

---

## Dependencies

- [yaml](https://www.npmjs.com/package/yaml)
- [deepmerge](https://www.npmjs.com/package/deepmerge)

---

## License

MIT License

---

## Author

Adrian Bejarano  
https://gamebook.studio  
adrian.bejarano@gamebook.studio
