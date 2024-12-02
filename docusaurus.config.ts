import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Mobile Stack Docs',
  tagline: 'Documentation for building with Mobile Stack',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.mobilestack.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mobilestack-xyz', // Usually your GitHub org/user name.
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
              return `https://github.com/mobilestack-xyz/hooks/edit/main/${versionDocsDirPath}/${docPath.replace(
                /^hooks\//,
                '',
              )}`
            }
            return `https://github.com/mobilestack-xyz/docs/edit/main/${versionDocsDirPath}/${docPath}`
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
      title: 'Mobile Stack Docs',
      logo: {
        alt: 'Mobile Stack Logo',
        src: 'img/mobile-stack-icon.svg',
      },
      items: [
        {
          href: 'https://github.com/mobilestack-xyz/docs',
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
              href: 'https://valoraapp.co/discord',
            },
            {
              label: 'Twitter',
              href: 'https://www.twitter.com/valoraApp',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mobilestack-xyz',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Valora Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
