# sanity-plugin-internationalized-array-v3

## Installation

```
npm install --save sanity-plugin-internationalized-array-v3
```

or

```
yarn add sanity-plugin-internationalized-array-v3
```

## Usage
Add it as a plugin in sanity.config.ts (or .js):

```
 import {createConfig} from 'sanity'
 import {myPlugin} from 'sanity-plugin-internationalized-array-v3'

 export const createConfig({
     /...
     plugins: [
         myPlugin({})
     ]
 })
```
## License

MIT © Simeon Griggs
See LICENSE