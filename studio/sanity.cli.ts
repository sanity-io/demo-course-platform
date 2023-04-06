import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineCliConfig({
  api: {
    projectId: '6h1mv88x',
    dataset: 'production-v3',
  },
  vite: (prev) => ({
    ...prev,
    plugins: [...prev.plugins, nodePolyfills()],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})
