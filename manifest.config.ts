import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  permissions: ['scripting', 'tabs'],
  host_permissions: ['https://learn.microsoft.com/*'],
  background: {
    service_worker: 'src/background/index.ts',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
     },
    // default_popup: 'src/popup/index.html',
  },
  content_scripts: [{
    js: ['src/content/contentScript.ts'],
    matches: ['https://learn.microsoft.com/*'],
  }],
})
