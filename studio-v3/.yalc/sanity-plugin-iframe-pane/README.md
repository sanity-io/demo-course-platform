# sanity-plugin-iframe-pane

> NOTE
> This is for the Studio v3 version of the plugin

Display any URL in a View Pane, along with helpful buttons to Copy the URL or open in a new tab.

Accepts either a string or an async function to resolve a URL based on the current document.

![Iframe View Pane](https://user-images.githubusercontent.com/9684022/144389599-496e1e50-62a7-4d5c-903a-889885eb8aab.png)

## Installation

```
npm install --save sanity-plugin-iframe-pane-v3
```

or

```
yarn add sanity-plugin-iframe-pane-v3
```

This is designed to be used as a [Component inside of a View](https://www.sanity.io/docs/structure-builder-reference#c0c8284844b7).

```js
// ./src/deskStructure.js
import Iframe from 'sanity-plugin-iframe-pane'

// ...all other list items

S.view
  .component(Iframe)
  .options({
    // Required: Accepts an async function
    url: (doc) => resolveProductionUrl(doc),
    // OR a string
    url: `https://sanity.io`,
    // Optional: Set the default size
    defaultSize: `mobile`, // default `desktop`
    // Optional: Add a reload button, or reload on new document revisions
    reload: {
      button: true, // default `undefined`
      revision: true, // default `undefined`
    },
  })
  .title('Preview')
```

## License

MIT © Simeon Griggs
See LICENSE
