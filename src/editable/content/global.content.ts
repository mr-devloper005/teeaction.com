import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: 'Premium discovery for people who love saving great finds.',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    topbar: {
      
    },
    primaryLinks: [
      // { label: 'Services', href: '/#services' },
      { label: 'Process', href: '/#process' },
      { label: 'Results', href: '/#results' },
      { label: 'Contact', href: '/contact' },
    ],
    sectionLinks: [
      // { label: 'Services', href: '/#services' },
      // { label: 'Process', href: '/#process' },
      // { label: 'Results', href: '/#results' },
      // { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get Started', href: '/create' },
      secondary: { label: 'Search', href: '/search' },
    },
  },
  footer: {
    tagline: 'Curated stories, saved links, and discovery-led browsing.',
    description:
      'teeaction.com is designed for readers who like to collect useful pages, revisit standout finds, and browse every section through a cleaner premium interface.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Articles', href: '/article' },
          { label: 'Images', href: '/image' },
          { label: 'Profiles', href: '/profile' },
        ],
      },
      {
        title: 'Discover',
        links: [
          { label: 'Listings', href: '/listing' },
          { label: 'Documents', href: '/pdf' },
          { label: 'Comments', href: '/comments' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Create', href: '/create' },
        ],
      },
    ],
    bottomNote: 'Browse clearly. Save intentionally. Return often.',
  },
  commonLabels: {
    readMore: 'Open post',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
