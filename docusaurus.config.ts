import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Divvi Docs',
  tagline: 'Documentation for building with Divvi',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.divvi.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'divvixyz', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: ({ versionDocsDirPath, docPath }) => {
            if (docPath.startsWith('hooks/')) {
              return `https://github.com/divvi-xyz/hooks/edit/main/${versionDocsDirPath}/${docPath.replace(
                /^hooks\//,
                '',
              )}`
            } else if (docPath.startsWith('mobile-framework/divvi-mobile/')) {
              return `https://github.com/divvi-xyz/divvi-mobile/edit/main/${versionDocsDirPath}/${docPath.replace(
                /^mobile-framework\/divvi-mobile\//,
                '',
              )}`
            }
            return `https://github.com/divvi-xyz/docs/edit/main/${versionDocsDirPath}/${docPath}`
          },
          // The default is /docs, but we don't have anything other content but docs.
          routeBasePath: '/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function (context, options) {
      return {
        name: 'webpack-configuration-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              // This is needed for our submodules docs to work correctly with Docusaurus.
              // Setting this to `false` doesn't mean it doesn't follow symlinks, it means it doesn't fully resolve them
              // which is the default and doesn't work with our submodule symlink setup.
              // See https://github.com/facebook/docusaurus/issues/3272
              symlinks: false,
            },
          }
        },
      }
    },
  ],

  themeConfig: {
    navbar: {
      title: 'Divvi Docs',
      logo: {
        alt: 'Divvi Logo',
        src: 'img/divvi-icon.svg',
      },
      items: [
        {
          href: 'https://github.com/divvixyz/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/EaxZDhMuDn',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/letsdivvi',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/letsdivvi',
            },
            {
              label: 'Code of Conduct',
              href: '/community-code-of-conduct',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/divvixyz',
            },
            {
              label: 'Builder Camp Terms',
              href: 'https://divvi.xyz/terms',
            },
            {
              label: 'Privacy Policy',
              href: 'https://valora.xyz/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Divvi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
