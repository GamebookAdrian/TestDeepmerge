# merge-yaml-sop

Project to combine multiple YAML files into one, with support for encrypted files using GPG and compatible with SOP (Same-Origin Policy).

---

## Description

This small Node.js script allows reading several YAML files, including GPG-encrypted ones (`.gpg`), decrypting them, and deeply merging their content using the `deepmerge` library. Ideal for managing configurations in secure environments that require secret encryption.

---

## Features

- Reads regular and encrypted YAML files (`.gpg` or `.enc`).
- Automatic file decryption using GPG (you must have the private key configured).
- Deep merge of multiple YAML files into a single object.
- Outputs the final result in readable YAML format.

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

3. Make sure your GPG private key is imported into your system:

```bash
gpg --list-secret-keys
```

---

## Usage

Edit the array in `merge-yaml-sop.js` to specify the YAML files you want to combine. It can include regular `.yaml` files and encrypted `.gpg` files.

Run the script:

```bash
node merge-yaml-sop.js
```

You will see the merge result printed to the console in YAML format.

---

## Notes on GPG and Encryption

- To encrypt a secrets file and use it with the script, you can run:

```bash
gpg --encrypt -r your_email@domain.com -o config/secrets.yaml.gpg config/secrets.yaml
```

- If your private key has a passphrase, make sure `gpg-agent` is configured to avoid decryption failures in non-interactive mode.

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
