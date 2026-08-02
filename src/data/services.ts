export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  price: string;
  icon: string;
  tagline: string;
  description: string;
  sectionTitle: string;
  sectionSubtitle: string;
  features: ServiceFeature[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'copywriting',
    name: 'Copywriting',
    price: '$50-200/hr',
    icon: '🔍',
    tagline: 'Compelling, results-driven content that engages your audience and drives conversions.',
    description: 'Compelling content for your website, marketing materials, ad copy, blog posts, and sales pages that resonate with your audience and drive action.',
    sectionTitle: 'Copywriting That Converts',
    sectionSubtitle: 'From persuasive web copy to engaging blog content, I create words that work for your business.',
    features: [
      { title: 'Website Content', description: 'Landing pages, product descriptions, and full website copy optimized for engagement and SEO.' },
      { title: 'Blog Posts & Articles', description: 'Thought leadership content, how-to articles, and industry insights that attract and retain readers.' },
      { title: 'Ad Copy', description: 'High-converting ads for Google, Facebook, LinkedIn, and other platforms.' },
      { title: 'Email Campaigns', description: 'Newsletters, drip sequences, and promotional emails that drive opens and clicks.' },
      { title: 'Sales Pages', description: 'Long-form sales copy designed to convert visitors into customers.' },
      { title: 'Social Media Captions', description: 'Engaging, on-brand captions tailored for each social platform.' },
    ],
    ctaTitle: 'Need Words That Sell?',
    ctaText: 'Let\'s craft compelling copy that drives results for your business. Free consultation available.',
    ctaButton: 'Get a Free Quote',
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    price: '$25-150/hr',
    icon: '🎨',
    tagline: 'Visual design that makes your brand stand out and connects with your audience.',
    description: 'Visual design services including logos, social media graphics, presentations, branding, and marketing materials that elevate your brand.',
    sectionTitle: 'Design Solutions',
    sectionSubtitle: 'From brand identity to social media graphics, I create visuals that communicate your message effectively.',
    features: [
      { title: 'Logo & Brand Design', description: 'Custom logo design, brand guidelines, color palettes, and complete brand identity.' },
      { title: 'Social Media Graphics', description: 'Custom posts, stories, covers, and promotional graphics for all social platforms.' },
      { title: 'Presentation Design', description: 'Professional PowerPoint & Keynote presentations for pitches, training, and meetings.' },
      { title: 'Marketing Materials', description: 'Brochures, flyers, business cards, banners, and print-ready designs.' },
      { title: 'Infographic Design', description: 'Data visualization and infographics that transform complex info into clear visuals.' },
      { title: 'Web Graphics', description: 'Hero images, icons, thumbnails, and custom illustrations for your website.' },
    ],
    ctaTitle: 'Ready to Elevate Your Brand?',
    ctaText: 'Let\'s create stunning visuals that make your brand memorable. Free design consultation available.',
    ctaButton: 'Get a Free Quote',
  },
  {
    slug: 'social-media',
    name: 'Social Media Management',
    price: '$30-100/hr',
    icon: '📱',
    tagline: 'Grow your audience and engage your community with strategic, results-driven social media management.',
    description: 'Complete social media management: content creation, scheduling, analytics reporting, community engagement, and strategy development.',
    sectionTitle: 'Full-Service Social Media Management',
    sectionSubtitle: 'Everything you need to build a strong social media presence and grow your brand.',
    features: [
      { title: 'Content Creation', description: 'Engaging posts, captions, and visual content tailored to your brand voice and audience.' },
      { title: 'Scheduling', description: 'Strategic content scheduling using industry tools for optimal posting times and consistency.' },
      { title: 'Analytics & Reporting', description: 'Monthly performance reports showing growth, engagement, and insights to refine your strategy.' },
      { title: 'Community Engagement', description: 'Responding to comments, messages, and building relationships with your followers.' },
      { title: 'Social Strategy', description: 'Platform-specific strategies to grow your audience, boost engagement, and achieve your goals.' },
      { title: 'Ad Campaigns', description: 'Paid social media campaign setup, management, and optimization for maximum ROI.' },
    ],
    ctaTitle: 'Stop Scrolling Past Your Competition',
    ctaText: 'Let\'s build a social media presence that attracts followers, sparks engagement, and drives growth.',
    ctaButton: 'Schedule a Strategy Session',
  },
  {
    slug: 'data-entry',
    name: 'Data Entry & Analysis',
    price: '$20-50/hr',
    icon: '📊',
    tagline: 'Precise data entry and actionable analysis so you can make confident business decisions.',
    description: 'Accurate data entry, spreadsheet formatting, CRM updates, and data analysis to help you make informed business decisions.',
    sectionTitle: 'Accurate Data Services',
    sectionSubtitle: 'From clean data entry to insightful analysis, I help you unlock the value in your information.',
    features: [
      { title: 'Data Entry', description: 'Accurate data entry into spreadsheets, CRMs, databases, and online platforms with 99.9% accuracy guarantee.' },
      { title: 'Spreadsheet Management', description: 'Excel & Google Sheets formatting, formulas, pivot tables, and advanced functions for clean, functional data.' },
      { title: 'CRM Data Updates', description: 'CRM data cleanup, deduplication, entry, and ongoing maintenance for Salesforce, HubSpot, and more.' },
      { title: 'Data Cleaning', description: 'Removing duplicates, correcting errors, standardizing formats, and organizing messy data for clarity.' },
      { title: 'Basic Data Analysis', description: 'Sales reports, trend analysis, customer segmentation, and performance metrics to inform your strategy.' },
      { title: 'Data Migration', description: 'Secure transfer of data between systems, platforms, and formats with full verification.' },
    ],
    ctaTitle: 'Let\'s Organize Your Data',
    ctaText: 'Clean, accurate data entry and analysis that saves you time and supports better decision-making.',
    ctaButton: 'Get a Free Quote',
  },
  {
    slug: 'content-updates',
    name: 'Website Content Updates',
    price: '$25-75/hr',
    icon: '🎤',
    tagline: 'Keep your website fresh, relevant, and optimized with reliable content management and updates.',
    description: 'Website content updates including CMS edits, blog posting, SEO optimization, page updates, and ongoing site maintenance.',
    sectionTitle: 'Website Maintenance & Updates',
    sectionSubtitle: 'From routine content updates to SEO optimization, I keep your website current and performing its best.',
    features: [
      { title: 'CMS Updates', description: 'Content updates on WordPress, Squarespace, Webflow, and other CMS platforms — fast, accurate, and secure.' },
      { title: 'Blog Posting', description: 'Publish, format, and optimize blog posts with proper headings, tags, images, and internal links.' },
      { title: 'SEO Optimization', description: 'On-page SEO updates including meta tags, headings, alt text, schema, and keyword optimization.' },
      { title: 'Page Edits', description: 'Fixes, corrections, content additions, layout adjustments, and any site changes you need.' },
      { title: 'Site Migration Support', description: 'Content export/import and verification during website migrations or platform changes.' },
      { title: 'Ongoing Maintenance', description: 'Retainers available for regular updates, content publishing, and site monitoring.' },
    ],
    ctaTitle: 'Outsource Your Website Updates',
    ctaText: 'Focus on running your business while I keep your website fresh, accurate, and optimized.',
    ctaButton: 'Get a Free Quote',
  },
  {
    slug: 'customer-service',
    name: 'Customer Service Chat',
    price: '$15-30/hr',
    icon: '💬',
    tagline: 'Friendly, responsive live chat support that keeps your customers satisfied and your business running smoothly.',
    description: 'Professional live chat support for your customers — handling inquiries, answering questions, and resolving issues promptly.',
    sectionTitle: 'Dedicated Chat Support',
    sectionSubtitle: 'Professional, on-brand live chat support for your customers — inquiries handled promptly, issues resolved effectively.',
    features: [
      { title: 'Live Chat Support', description: 'Real-time chat support during your business hours — answering questions and engaging visitors.' },
      { title: 'Inquiry Handling', description: 'Prompt, friendly responses to general inquiries, product questions, and sales leads.' },
      { title: 'Issue Resolution', description: 'Troubleshooting, problem-solving, and complaint handling with clear documentation and follow-up.' },
      { title: 'Order Management', description: 'Order inquiries, payment questions, shipping updates, returns, and exchanges handled professionally.' },
      { title: 'Multi-Platform Support', description: 'Support across website chat, Facebook Messenger, WhatsApp, and other chat platforms.' },
      { title: 'After-Hours Coverage', description: 'Extend your support hours with weekend and evening coverage options available.' },
    ],
    ctaTitle: 'Supercharge Your Customer Support',
    ctaText: 'Provide fast, friendly support that turns customers into advocates. Starts at just $15/hr.',
    ctaButton: 'Get a Free Quote',
  },
];

export const SERVICES_EMAIL = 'hello@jamescowxservices.com';

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
