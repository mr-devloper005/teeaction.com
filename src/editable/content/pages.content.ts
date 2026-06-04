import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium discovery for social bookmark lovers',
      description: 'Browse saved links, standout reads, visual finds, and structured resources through a polished discovery-first experience.',
      openGraphTitle: 'teeaction.com',
      openGraphDescription: 'A premium browsing experience for people who love saving and revisiting great finds.',
      keywords: ['social bookmarking', 'saved links', 'discovery site', 'premium archive'],
    },
    hero: {
      badge: 'Premium discovery platform',
      title: ['Find your next', 'favorite page with', 'curated precision.'],
      description:
        'teeaction.com brings saved resources, fresh articles, visual references, and useful directories into one premium browsing flow built for people who love collecting great links.',
      primaryCta: { label: 'Launch Your Collection', href: '/sbm' },
      secondaryCta: { label: 'Browse Fresh Picks', href: '/search' },
      searchPlaceholder: 'Search bookmarks, articles, listings, and collections',
    },
    intro: {
      badge: 'Why it works',
      title: 'A stronger browsing rhythm for saved pages and curated finds.',
      paragraphs: [
        'The redesigned surface makes it easier to move from one interesting page to the next without losing context.',
        'Clear cards, stronger hierarchy, and more intentional sections help visitors browse longer and return more often.',
        'Every active route still works from the same existing data while the presentation becomes more premium and memorable.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Premium marketing-style homepage with live content.',
        'Distinct card patterns across featured, compact, image-first, and editorial layouts.',
        'Search, archive, and detail pages tuned for cleaner scanning.',
        'Safer fallbacks for missing post fields and media.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See bookmarks', href: '/sbm' },
    },
    cta: {
      badge: 'Stay in the loop',
      title: 'Ready to browse smarter and save better finds?',
      description: 'Explore the newest collections, highlighted resources, and topic-led pages across the site.',
      primaryCta: { label: 'Explore the archive', href: '/search' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About teeaction.com',
    title: 'A more refined home for saved ideas, standout links, and useful discoveries.',
    description: `${slot4BrandConfig.siteName} is built for visitors who enjoy collecting strong resources and browsing them through a clean, premium visual rhythm.`,
    paragraphs: [
      'The experience is designed to make browsing feel intentional, not cluttered. Sections stay clear, cards stay readable, and every route keeps a confident editorial tone.',
      'Whether a visitor lands on a bookmark, article, image, listing, or profile, the site keeps the next useful discovery within reach.',
    ],
    values: [
      {
        title: 'Curated clarity',
        description: 'Pages use strong hierarchy, cleaner grouping, and structured detail blocks so useful content is easier to revisit.',
      },
      {
        title: 'Discovery momentum',
        description: 'Related posts, visual variety, and section-based browsing keep exploration moving without overwhelming the reader.',
      },
      {
        title: 'Premium feel',
        description: 'The interface leans into polished contrast, softer motion, and confident spacing for a more memorable public-facing experience.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: "Ready to scale your next collection? Let's talk.",
    description:
      'Use the form to share a project, ask about a post, or suggest a collection worth featuring. We keep the process straightforward and reader-focused.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search saved links, articles, visuals, profiles, and resources across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find saved pages, standout reads, and curated resources faster.',
      description: 'Search across every active section to uncover useful posts, collections, and references in one place.',
      placeholder: 'Search by keyword, category, title, or topic',
    },
    resultsTitle: 'Fresh discoveries',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Open the content workspace and draft a new post.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in to open the publishing workspace.',
      description: 'Use your account to draft new posts, organize details, and prepare content for the active sections of the site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create polished posts for every active section.',
      description: 'Choose a content type, add the essentials, and shape a clean post with summary, links, images, and body content.',
    },
    formTitle: 'Post details',
    submitLabel: 'Submit content',
    successTitle: 'Content saved to this browser successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your discovery workspace.',
      description: 'Login to manage drafts, browse saved sections, and continue building out your collections.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create one first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Create your account and start publishing with confidence.',
      description: 'Set up your account to open the publishing workspace, save your session, and submit content across supported sections.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Site',
    },
  },
} as const
