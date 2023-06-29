# MEAN Stack - Example

- 1. generate Angular app
``` 
ng new client --skip-git --skip-tests true --style scss --routing true
```

- 2. generate package json
``` 
npm init
```
accept defaults

- 3. add run client to npm to package.json(root)
``` 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "client": "npm run --prefix client start"
  },
```
- 4. add .gitignore
```
node_modules/
```
