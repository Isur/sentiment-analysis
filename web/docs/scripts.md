# Scripts description
## Testing / Code check / Types
Tests
```json
"test": "jest --coverage",
"test:watch": "jest --coverage --watch",
```
Testing types
```json
"typecheck": "tsc --noEmit",
```
Linter with fix.
```json
"lint": "eslint ./src --ext .jsx --ext .tsx --ext .js --ext .ts --fix --ignore-path .gitignore --cache",
"linter-no-warning": "eslint --max-warnings 0 --ext .js --ext .jsx --ext .ts --ext .tsx --ignore-path .gitignore ./src",
```
## Run app for development
```json
"dev": "rimraf ./dist && webpack --config webpack/server.dev.babel.js",
```

## Production
```json
"build": "npm run build:clean && npm run build:server && npm run build:client",
"build:clean": "rm -rf build/",
"build:server": "webpack --config ./webpack/server.babel.js",
"build:client": "webpack --config ./webpack/client.babel.js",
"dockerbuild": "npm run build:server &&  npm run build:client",
"start": "cd ./build && node server.js",
```

## Contribution
Husky is included and before each commit will run linter, typecheck and tests
```json
"precommit": "npm run linter-no-warning && npm run typecheck && npm run test"
```
