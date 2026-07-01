import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Clew Docs',
  description: 'Documentation for Clew API and Clew CLI',
  base: '/docs/',
  outDir: '../docs',
  cleanUrls: false,
  themeConfig: {
    nav: [
      { text: 'Homepage', link: 'https://clew-code.org' },
      { text: 'API Docs', link: '/' },
      { text: 'CLI Docs', link: '/cli' },
      { text: 'GitHub', link: 'https://github.com/ClewCode/ClewCode' }
    ],
    sidebar: [
      {
        text: 'API Reference',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Authentication', link: '/#auth' },
          { text: 'Models', link: '/#models' },
          { text: 'Chat Completions', link: '/#chat' },
          { text: 'Image Generation', link: '/#images' },
          { text: 'Video Generation', link: '/#video' },
          { text: 'API Keys', link: '/#keys' },
          { text: 'Usage Tracking', link: '/#usage' },
          { text: 'Billing & Tiers', link: '/#billing' },
          { text: 'Telemetry', link: '/#telemetry' },
          { text: 'Webhooks', link: '/#webhooks' },
          { text: 'Plugins Marketplace', link: '/#plugins' },
          { text: 'Updates API', link: '/#updates' }
        ]
      },
      {
        text: 'CLI Reference',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/cli' },
          { text: 'Installation', link: '/cli#installation' },
          { text: 'First Run', link: '/cli#first-run' },
          { text: '29 Providers', link: '/cli#29-providers' },
          { text: 'Persistent Memory', link: '/cli#persistent-memory' },
          { text: 'LAN Peer Swarm', link: '/cli#lan-peer-swarm' },
          { text: 'Execution Layers', link: '/cli#execution-layers' },
          { text: 'Slash Commands', link: '/cli#slash-commands' },
          { text: 'Configuration', link: '/cli#configuration' }
        ]
      }
    ]
  }
})
