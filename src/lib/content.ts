// All copy and data lifted verbatim from the design reference.
// Do not paraphrase or re-order — these are the client's own claims about his work.

export type Shot = { src: string; caption: string; ratio: string }
export type Spec = { k: string; v: string }

export type Work = {
  id: string
  n: string
  title: string
  kind: string
  year: string
  tag: string
  role: string
  peek?: { src: string; caption: string; ratio: string }
  shots?: Shot[]
  bullets: string[]
  specs: Spec[]
}

export const WORKS: Work[] = [
  {
    id: 'hostfully', n: '01', title: 'Hostfully integrated marketing', kind: 'Brand + social', year: '2023–26', tag: 'BRAND + SOCIAL',
    role: 'Solo marketing lead · brand, social, review, partner',
    peek: { src: '/img/u24.png', caption: 'Integrations campaign', ratio: '1' },
    shots: [
      { src: '/img/u22.png', caption: 'Partner integration launch', ratio: '1' },
      { src: '/img/u29.png', caption: 'Feature promo · Devices', ratio: '1' },
      { src: '/img/u31.png', caption: '10-year anniversary', ratio: '1' },
      { src: '/img/u25.png', caption: 'Webinar promotion', ratio: '1' },
      { src: '/img/u27.png', caption: 'Customer success story', ratio: '1' },
      { src: '/img/u30.png', caption: 'Customer success story', ratio: '1' },
      { src: '/img/u20.png', caption: 'Conference sponsorship', ratio: '1' },
      { src: '/img/u21.png', caption: 'Direct booking site banner', ratio: '1' },
    ],
    bullets: [
      'Professionalized social media channels, including LinkedIn, Instagram, X.',
      'Increased review platform traffic by 200% across Trustpilot, G2, and Capterra.',
      'Increased followers by 235% and impressions by 120% across LinkedIn, Facebook, Instagram, X, and YouTube.',
      'Increased partner marketing efforts, creating projects with companies, including Marriott Homes & Villas, Airbnb, Expedia, and others.',
    ],
    specs: [
      { k: 'Channels', v: '7 owned' },
      { k: 'Review platforms', v: 'G2 · Trustpilot · Capterra' },
      { k: 'Stack', v: 'Salesforce' },
      { k: 'Partners', v: 'Marriott · Airbnb · Expedia' },
    ],
  },
  {
    id: 'hoard', n: '02', title: 'The Hoard fan platform', kind: 'UX + product', year: '2026', tag: 'UX + PRODUCT',
    role: 'Concept · architecture · UX/UI · build',
    peek: { src: '/img/u40.png', caption: 'The Hoard', ratio: '1/2' },
    shots: [
      { src: '/img/u40.png', caption: 'Launch screen', ratio: '1/2' },
      { src: '/img/u28.png', caption: 'On the wire · feed', ratio: '1/2' },
      { src: '/img/u34.png', caption: 'Collector profile', ratio: '1/2' },
      { src: '/img/u39.png', caption: 'Live market check', ratio: '1/2' },
      { src: '/img/u36.png', caption: 'Tournament directory', ratio: '1/2' },
      { src: '/img/u38.png', caption: 'Picks', ratio: '1/2' },
      { src: '/img/u37.png', caption: 'Ticket builder', ratio: '1/2' },
      { src: '/img/u33.png', caption: 'Vault post', ratio: '1/2' },
    ],
    bullets: [
      'The full concept, architecture, and design process were handled solely by me, including implementing a marketplace and building a proprietary pricing tool by hand.',
      'Full UX and UI design process done in Figma, Visual Studio Code, Vercel, and Supabase.',
    ],
    specs: [
      { k: 'Scope', v: 'Solo' },
      { k: 'Surface', v: 'Web app' },
      { k: 'Stack', v: 'Figma · VS Code · Vercel · Supabase' },
      { k: 'Built', v: 'Marketplace + pricing tool' },
    ],
  },
  {
    id: 'vineland', n: '03', title: 'Vineland Estates Winery', kind: 'Photography', year: '2022', tag: 'PHOTOGRAPHY',
    role: 'Food photography · campaign production',
    peek: { src: '/img/u04.jpg', caption: 'Vineland Estates', ratio: '1' },
    shots: [
      { src: '/img/u04.jpg', caption: 'Seasonal menu', ratio: '1' },
      { src: '/img/u05.jpg', caption: 'Dessert course', ratio: '1' },
      { src: '/img/u07.jpg', caption: 'Main course', ratio: '1' },
      { src: '/img/u10.jpg', caption: 'Plated starter', ratio: '1' },
      { src: '/img/u08.jpg', caption: 'Summer event series', ratio: '1' },
      { src: '/img/u06.jpg', caption: 'Celebration service', ratio: '1' },
      { src: '/img/u09.jpg', caption: 'Tasting flight', ratio: '1' },
    ],
    bullets: [
      'Produced two unique campaigns for the vineyards’ summer event series and seasonal menu.',
      'Photo assets used on the property for flyers, posters, and decorative photography.',
    ],
    specs: [
      { k: 'Campaigns', v: '2' },
      { k: 'Output', v: 'Flyers · posters · decor' },
      { k: 'Discipline', v: 'Photography' },
    ],
  },
  {
    id: 'pretty', n: '04', title: 'Pretty Apparel', kind: 'Launch campaign', year: '2022', tag: 'CAMPAIGN + VIDEO',
    role: 'Launch campaign · influencer management',
    peek: { src: '/img/u02.jpg', caption: 'Pretty Apparel', ratio: '4/5' },
    shots: [
      { src: '/img/u02.jpg', caption: 'Conservation Club crewneck', ratio: '4/5' },
      { src: '/img/u03.jpg', caption: 'Conservation Club crewneck', ratio: '4/5' },
    ],
    bullets: [
      'Launch campaign sold out collection in 72-hours, as well as pulling 50000+ website visitors on day one.',
      'Campaign participation by 20+ high-profile fashion and culture influencers.',
      'Featured on CBC Street Cents.',
    ],
    specs: [
      { k: 'Sell-out', v: '72 hours' },
      { k: 'Day-one visits', v: '50,000+' },
      { k: 'Influencers', v: '20+' },
      { k: 'Press', v: 'CBC Street Cents' },
    ],
  },
  {
    id: 'crane', n: '05', title: 'Crane Apparel — concept to completion', kind: 'Video production', year: '2021', tag: 'CAMPAIGN + VIDEO',
    role: 'Concept · shoot · edit',
    bullets: [
      'Working with Crane Apparel, I produced a found footage-style campaign ad focusing on the fine details of their SS apparel line. This was done using a Blackmagic Pocket Cinema Camera and edited in Adobe After Effects and Premiere.',
      'Music was provided by a local artist selected by Crane Apparel.',
      'This was in conjunction with their Foot Locker Canada campaign.',
    ],
    specs: [
      { k: 'Camera', v: 'Blackmagic Pocket Cinema' },
      { k: 'Post', v: 'After Effects · Premiere' },
      { k: 'Tie-in', v: 'Foot Locker Canada' },
    ],
  },
]

export const CHIPS = ['All', 'Brand + social', 'UX + product', 'Campaign + video', 'Photography'] as const
export type Chip = (typeof CHIPS)[number]

export const NAV = [
  { label: '01 Work', id: 'work' },
  { label: '02 Video', id: 'motion' },
  { label: '03 Case studies', id: 'case' },
  { label: '04 About', id: 'about' },
  { label: '05 History', id: 'history' },
  { label: '06 Contact', id: 'contact' },
]

export const FILMS = [
  { yid: 'BikEFG9Uj0A', href: 'https://www.youtube.com/watch?v=BikEFG9Uj0A', label: 'Hostfully', meta: 'YouTube' },
  { yid: 'v32QY_wsNFA', href: 'https://www.youtube.com/watch?v=v32QY_wsNFA', label: 'Hostfully', meta: 'YouTube' },
  { yid: '-acuEG5PTHg', href: 'https://www.youtube.com/watch?v=-acuEG5PTHg', label: 'Hostfully', meta: 'YouTube' },
  { yid: 'R7aTsR6Vyy0', href: 'https://www.youtube.com/watch?v=R7aTsR6Vyy0', label: 'Hostfully', meta: 'YouTube' },
  { yid: '156ERPy7Fis', href: 'https://www.youtube.com/shorts/156ERPy7Fis', label: 'Hostfully', meta: 'YouTube Short' },
  { yid: 'X1q4oyWp04M', href: 'https://www.youtube.com/shorts/X1q4oyWp04M', label: 'Hostfully', meta: 'YouTube Short' },
]

export const REELS = [
  { handle: '@hostfully_', href: 'https://www.instagram.com/hostfully_/reel/DSSds_TgJNc/?hl=en' },
  { handle: '@your_devon_escape', href: 'https://www.instagram.com/your_devon_escape/reel/DT-f_2RiCC3/' },
  { handle: '@hostfully_', href: 'https://www.instagram.com/hostfully_/reel/DPq_AZmk4Ij/?hl=en' },
  { handle: '@hostfully_', href: 'https://www.instagram.com/hostfully_/reel/DPfWyseEjn6/?hl=en' },
  { handle: '@hostfully_', href: 'https://www.instagram.com/hostfully_/reel/DPP169BDj4C/?hl=en' },
  { handle: '@hostfully_', href: 'https://www.instagram.com/hostfully_/reel/DPPyYN7FFTK/?hl=en' },
  { handle: '@hostfully_', href: 'https://www.instagram.com/hostfully_/reel/DPkYkxtDtEs/?hl=en' },
]

export const HERO_STRIP = [
  { src: '/img/u00.jpg', caption: 'AI Hackathon Series', year: '2025' },
  { src: '/img/u27.png', caption: 'Customer success story', year: '2026' },
  { src: '/img/u04.jpg', caption: 'Vineland Estates', year: '2022' },
  { src: '/img/u02.jpg', caption: 'Pretty Apparel', year: '2022' },
]

export const LOGOS = [
  { src: '/img/logo-hostfully.png', alt: 'Hostfully' },
  { src: '/img/logo-shopify.png', alt: 'Shopify' },
  { src: '/img/logo-hostaway.png', alt: 'Hostaway', tall: true },
  { src: '/img/logo-airbnb.png', alt: 'Airbnb', tall: true },
  { src: '/img/logo-booking.png', alt: 'Booking.com' },
  { src: '/img/logo-vrbo.png', alt: 'Vrbo' },
  { src: '/img/logo-homesvillas.png', alt: 'Marriott Homes & Villas' },
  { src: '/img/logo-google.png', alt: 'Google' },
  { src: '/img/logo-stripe.png', alt: 'Stripe' },
  { src: '/img/logo-quickbooks.png', alt: 'Intuit QuickBooks' },
  { src: '/img/logo-boostly.png', alt: 'Boostly' },
]

export const BRAND_NAMES = [
  'Universal Music Canada', 'Warner Music Canada', 'Community 54', 'Expedia',
  'Vineland Estates', 'Crane Apparel', 'CBC Street Cents',
]

export const RATINGS = [
  { platform: 'Trustpilot', score: '4.8', volume: '341 reviews' },
  { platform: 'Capterra', score: '4.5', volume: '63 reviews' },
  { platform: 'G2', score: '4.2', volume: '235 reviews · 83% positive' },
  { platform: 'Facebook', score: '96%', volume: '72 reviews recommend' },
]

export const CAPS = [
  'Email & lifecycle marketing', 'Audience segmentation', 'A/B testing', 'Campaign analytics',
  'Organic social strategy', 'Partner & co-marketing', 'Community building', 'Event production',
  'Review & reputation management', 'Salesforce', 'Zoho', 'HubSpot', 'G2', 'Trustpilot',
  'Photoshop', 'Illustrator', 'Figma', 'Canva', 'Premiere Pro', 'Final Cut Pro',
  'DaVinci Resolve', 'Pro Tools', 'Adobe Audition', 'Logic Pro', 'HTML & CSS', 'Photography',
  'Prompt engineering', 'Workflow automation',
]

// The resume figures — the only authoritative set.
export const STATS = [
  { count: 235, pre: '+', post: '%', final: '+235%', label: 'Followers' },
  { count: 120, pre: '+', post: '%', final: '+120%', label: 'Impressions' },
  { count: 200, pre: '+', post: '%', final: '+200%', label: 'Review platform traffic' },
  { count: 72, pre: '$', post: 'K/mo', final: '$72K/mo', label: 'Revenue generated from G2 leads' },
]

export type Role = { dates: string; span: string; title: string; org: string; bullets: string[] }

export const ROLES: Role[] = [
  {
    dates: 'Jan 2025 — May 2026', span: '1 yr 5 mos',
    title: 'Integrated Marketing Manager', org: 'Hostfully · Toronto, ON · Remote',
    bullets: [
      'Managed Hostfully’s digital brand across social media platforms and email, increasing followers by 235% and impressions by 120%.',
      'Managed Hostfully’s review platform, driving organic reviews and increasing industry reputation.',
      'Increase review traffic of G2 and Trustpilot by 200%+.',
      'Partner relationship management and marketing collaborations for various short-term rental and travel-focused companies.',
      'Content production, including Graphic Design, Video production, Digital events, and Copywriting.',
      'Event production in both Canada and the United States.',
    ],
  },
  {
    dates: 'Dec 2023 — Present', span: '2 yrs 9 mos',
    title: 'Partner Marketing Specialist and Social Media + Community Marketing Manager', org: 'Hostfully · Toronto, ON · Remote',
    bullets: [
      'Review generation via organic and paid campaigns via multiple platforms, including but not limited to G2, Trustpilot, and Capterra.',
      'Social media content generation and community management via platforms like Facebook, LinkedIn, Instagram, and X (formerly Twitter).',
      'Lead generation via customer communities and review platforms.',
      'Liaison between different B2B Short Term Vacation Rental companies to increase marketing value for both parties.',
      'Managing internal projects with varying team sizes ranging from review generation to content creation, internal event planning, and presentations.',
      'Broker, produce, and maintain media projects between Hostfully business partners, clients, and industry influencers.',
    ],
  },
  {
    dates: 'Apr 2020 — Present', span: '6 yrs 5 mos',
    title: 'Founder / Creative Director', org: 'Pretty Perfect Media · Toronto, ON',
    bullets: [
      'Founder and lead Creative Director, specializing in content creation and event production.',
      'Produced content for independent sports leagues throughout the GTA.',
      'Merchandise and content production for influencers ranging from 15,000 to 1 million social followers.',
      'Partnered with Warner Music Canada and Universal Music Canada for events.',
      '‘A Lovely Day Party’ — a day party and culture event celebrating two years — sold out in one week and four days, with catering and alcohol services provided by Pretty Perfect Media.',
    ],
  },
  {
    dates: 'Oct 2022 — Jan 2024', span: '1 yr 4 mos',
    title: 'Technical Support Specialist', org: 'Hostaway · Toronto, ON',
    bullets: [
      'Managed concurrent merchant support workloads while troubleshooting platform issues and feeding insights back into product and content teams.',
      'Built internal initiatives to lift community engagement and reduce churn signals surfacing through the support layer.',
      'Designed and implemented an internal client review production plan to capture more inbound social proof.',
    ],
  },
  {
    dates: 'Jun 2021 — Jun 2022', span: '1 yr 1 mo',
    title: 'Support Advisor', org: 'Shopify · Toronto, ON',
    bullets: [
      'Live channel support for incoming client requests.',
      'Technical content writing on software and software partners.',
      'Internal training for incoming staff.',
    ],
  },
  {
    dates: 'Aug 2017 — Apr 2019', span: '1 yr 9 mos',
    title: 'Storefront Manager and Social Media Manager', org: 'Community 54 · Toronto, ON',
    bullets: [
      'Spent two years helping build the brands of Community 54 along with multiple independent Toronto fashion, food, and alcohol brands for brand activations and line releases.',
      'Gained skills in e-commerce and SEO development.',
    ],
  },
]

export const EDUCATION = [
  { k: 'Program', v: 'Music management and studio post-production' },
  { k: 'Institution', v: 'Metalworks Institute' },
  { k: 'Year', v: '2019' },
  { k: 'GPA', v: '4.0' },
]

export const ABOUT_PARAGRAPHS = [
  'I’m a marketing specialist and creative director based out of Mississauga, Canada. For over 8 years, I have cultivated skills in customer communication, design, video, and studio production, as well as team and influencer management.',
  'These skills were developed through studying at Metalworks Institute as well as working with multiple creators, small businesses, and corporations, including Shopify, Universal Music Canada, Hostfully, Community 54, among others. From the travel industry to the music industry, storytelling that connects has always been and continues to be my passion.',
]

export const PAST_EXPERIENCE = [
  'Studied at Metalworks Institute in Business and Audio Engineering.',
  'Trained internally at Shopify in customer systems and the development of internal marketing documents.',
  'Developed an integrated marketing plan at Hostfully (SaaS), increasing their social media following by 235% and impressions by 120% in a 12-month period.',
  'Trained in CRM tools of Salesforce, Hubspot, and others across industries.',
]

export const PRESENT_SKILLS = [
  'Trained in design and production tools, including Photoshop, Illustrator, Audition, Premiere, Pro Tools, Figma, Canva, and Photopea, among others.',
  'Managed multiple organizations spanning projects as well as single-team projects as a team lead in customer communications, marketing, and customer retention.',
  'UX design and UI research across one web app and two mobile app projects with full back-end functionality, database structuring, and implementing payment processing systems.',
]

export const BEST_FIT = [
  'Integrated or lifecycle marketing roles at SaaS and consumer brands.',
  'Brand and content functions that need one operator across strategy, production and reporting.',
  'Teams where marketing, support and product signals have to talk to each other.',
]

export const HERO_LEDE =
  'Marketing specialist and creative director. Eight years of customer communication, design, video and studio production — most recently running an entire marketing function solo at a short-term-rental SaaS.'

export const CONTACT = {
  email: 'rc.chizanga@gmail.com',
  phone: '(437) 441-9955',
  phoneHref: 'tel:+14374419955',
  location: 'Mississauga, ON · Canada',
  resume: '/Raymond-Chizanga-Resume-2026.pdf',
}

export type Panel = {
  label: string
  lede: string
  groups: { label: string; items: string[] }[]
  close: string
}

export type Study = {
  id: string
  label: string
  title: string
  sub: string
  meta: Spec[]
  images: { src: string; caption: string; year: string; ratio: string }[]
  figLabel: string
  figNote: string
  hasRatings: boolean
  hasLinks: boolean
  stats?: { platform: string; score: string; volume: string }[]
  statsNote?: string
  flow: { n: string; label: string }[]
  links: { label: string; href: string }[]
  skills: string[]
  panels: Panel[]
}

export const STUDIES: Study[] = [
  {
    id: 'ai',
    label: 'AI Hackathon Series',
    title: 'Hostfully AI Hackathon Series',
    sub: 'Turning emerging technology into customer education, ecosystem adoption, and expansion opportunities.',
    meta: [
      { k: 'Company', v: 'Hostfully' },
      { k: 'Industry', v: 'B2B SaaS / Short-Term Rental Technology' },
      { k: 'Focus', v: 'Customer Marketing · Partner Marketing · Customer Education · Expansion' },
    ],
    images: [
      { src: '/img/u00.jpg', caption: 'Part 1 announcement', year: 'May 2025', ratio: '1' },
      { src: '/img/u01.jpg', caption: 'Partner and expert line-up', year: 'May 2025', ratio: '1' },
    ],
    figLabel: 'Session structure',
    figNote: 'Useful to customers, commercially relevant to Hostfully',
    hasRatings: false,
    hasLinks: true,
    flow: [
      { n: '01', label: 'Customer challenge' },
      { n: '02', label: 'Practical application' },
      { n: '03', label: 'Expert education' },
      { n: '04', label: 'Relevant technology solution' },
    ],
    links: [
      { label: 'AI Hackathon Series — Part 1', href: 'https://app.livestorm.co/hostfully/hostfullys-ai-hackathon-series' },
      { label: 'AI Hackathon Series — Part 2', href: 'https://app.livestorm.co/hostfully/hostfullys-ai-hackathon-series-part-2?utm_source=Livestorm+company+page' },
      { label: 'Campaign post on LinkedIn', href: 'https://lnkd.in/p/grT9eq4J' },
      { label: 'Campaign reel on Instagram', href: 'https://www.instagram.com/reels/DJFxRpjvwpm/' },
    ],
    skills: ['Customer Lifecycle Marketing', 'Customer Education', 'Partner Marketing', 'Cross-Sell Strategy', 'Webinar Production', 'Campaign Strategy', 'B2B SaaS Marketing', 'Cross-Functional Leadership', 'Partner Management', 'Content Strategy', 'Sales Alignment', 'Customer Success Collaboration', 'Remote Event Production'],
    panels: [
      {
        label: 'Opportunity',
        lede: 'As generative AI accelerated across the short-term rental industry, Hostfully’s customer community was trying to answer a practical question: was AI simply the industry’s latest hype cycle, or could it meaningfully improve the way property managers operated their businesses?',
        groups: [{ label: '', items: [
          'Hostfully was well positioned to answer that question. The company had an established customer base, an ecosystem of specialized technology partners, and internal Customer Success professionals with direct knowledge of how operators were beginning to use these tools.',
          'The opportunity was to turn that expertise into a customer marketing program that could educate users while creating greater awareness and adoption of solutions available through Hostfully’s partner ecosystem.',
        ] }],
        close: '',
      },
      {
        label: 'Strategy',
        lede: 'I developed the campaign around business outcomes rather than AI itself. Instead of producing broad thought-leadership content about artificial intelligence, I worked with partners and internal subject-matter experts to identify practical applications relevant to Hostfully customers.',
        groups: [{ label: 'Programming focused on questions operators were already asking', items: [
          'Where can AI eliminate repetitive operational work?',
          'How can it improve guest communication?',
          'Can it reduce administrative workload?',
          'Can it improve marketing and direct-booking performance?',
          'Which tools are actually useful for property managers?',
          'Where does automation create genuine business value?',
        ] }],
        close: 'This created an education-first framework where relevant commercial solutions could be introduced naturally within the customer learning experience.',
      },
      {
        label: 'Development',
        lede: 'I owned the coordination and production of the initiative across internal teams and external partners. I worked directly with technology partners to select webinar topics, define useful educational angles, coordinate participation, and prepare sessions around concrete customer use cases.',
        groups: [{ label: 'Internally, I collaborated with', items: [
          'Partnerships to identify relevant marketplace solutions and participating companies',
          'Customer Success to incorporate practical expertise from team members familiar with different technologies and customer workflows',
          'Sales to align educational programming with opportunities to introduce additional solutions to existing customers',
        ] }],
        close: 'I also developed the customer-facing messaging supporting the campaign, including webinar descriptions and social promotional copy.',
      },
      {
        label: 'Execution',
        lede: 'The series was produced and hosted remotely using Hostfully’s webinar platform.',
        groups: [{ label: '', items: [
          'I coordinated the participating companies and internal contributors, managed the programming, supported speakers through the production process, and brought the individual sessions together under a consistent campaign narrative.',
          'The result was not a collection of disconnected vendor presentations. Each session connected customer challenge, practical application, expert education, and relevant technology solution.',
        ] }],
        close: 'That structure allowed the campaign to remain genuinely useful to customers while simultaneously supporting partner exposure and commercial discovery.',
      },
      {
        label: 'Expansion',
        lede: 'A central objective was to demonstrate that customer education and revenue generation did not have to be competing priorities. Instead of leading with an upsell, Hostfully could first help customers understand a business problem and then introduce a solution capable of addressing it.',
        groups: [{ label: 'The campaign supported several objectives simultaneously', items: [
          'Customer education',
          'Product and partner discovery',
          'Marketplace visibility',
          'Cross-sell and upsell opportunities',
          'Customer engagement',
          'Partner activation',
          'Sales enablement',
          'Customer Success engagement',
          'Hostfully’s position as a trusted industry resource',
        ] }],
        close: 'This approach made expansion part of the educational journey rather than a separate sales interaction.',
      },
      {
        label: 'Impact',
        lede: 'The campaign generated sufficient customer interest to expand into an additional installment featuring new partners, new subject-matter experts, and additional AI use cases.',
        groups: [{ label: '', items: [
          'The continued programming validated the underlying insight: Hostfully’s customers were interested in AI when the conversation focused on practical business outcomes rather than technology hype.',
          'The AI Hackathon Series transformed a rapidly emerging industry topic into a multi-functional customer growth initiative.',
          'It gave customers practical education, provided technology partners with qualified exposure to an existing SaaS customer base, created opportunities for Sales and Customer Success to introduce relevant solutions, and reinforced Hostfully’s role as more than a software provider.',
        ] }],
        close: 'Understand what customers are trying to accomplish, educate them around the problem, and make the commercial solution the logical next step.',
      },
    ],
  },
  {
    id: 'advocacy',
    label: 'Customer Advocacy Program',
    title: 'Customer Advocacy & Review Growth Program',
    sub: 'Building a measurable customer advocacy engine across G2, Capterra, Trustpilot, and Facebook.',
    meta: [
      { k: 'Company', v: 'Hostfully' },
      { k: 'Industry', v: 'B2B SaaS / Short-Term Rental Technology' },
      { k: 'Focus', v: 'Customer Advocacy · Reputation Growth · AEO · Lifecycle Marketing' },
    ],
    images: [
      { src: '/img/u16.jpg', caption: 'Customer advocacy asset', year: '2026', ratio: '4/5' },
      { src: '/img/u19.jpg', caption: 'Customer advocacy asset', year: '2026', ratio: '4/5' },
    ],
    figLabel: 'Advocacy lifecycle',
    figNote: 'Review generation as an active growth channel',
    hasRatings: true,
    hasLinks: false,
    stats: RATINGS,
    statsNote: 'Hostfully review platform standing · captured August 2026',
    flow: [
      { n: '01', label: 'Successful customer interaction' },
      { n: '02', label: 'Advocacy opportunity' },
      { n: '03', label: 'Targeted review request' },
      { n: '04', label: 'Third-party validation' },
      { n: '05', label: 'Stronger discovery and consideration' },
    ],
    links: [],
    skills: ['Customer Advocacy', 'Reputation Management', 'Lifecycle Marketing', 'Answer Engine Optimization', 'Cross-Functional Activation', 'Campaign Reporting', 'G2', 'Capterra', 'Trustpilot', 'Customer Success Collaboration', 'Sales Enablement'],
    panels: [
      {
        label: 'Opportunity',
        lede: 'Hostfully had a strong base of customers interacting regularly with its Customer Success and Technical Support teams, but many of those positive customer experiences ended within private support channels.',
        groups: [{ label: '', items: [
          'At the same time, third-party review platforms had become increasingly important throughout the SaaS buying journey.',
          'Prospective customers were using platforms such as G2, Capterra, Trustpilot, and Facebook to validate software decisions, compare providers, and assess customer satisfaction before entering Hostfully’s sales funnel.',
        ] }],
        close: 'There was an opportunity to systematically convert positive customer experiences into visible, credible, third-party advocacy.',
      },
      {
        label: 'Strategy',
        lede: 'I developed a structured review-generation program that connected Marketing with the two internal teams closest to customer sentiment: Customer Success and Technical Support.',
        groups: [{ label: '', items: [
          'Rather than relying on periodic mass requests for reviews, I created a more controlled campaign process that could be tracked, managed, optimized, and reported.',
        ] }],
        close: 'This allowed review generation to become an active growth channel rather than an occasional reputation-management exercise.',
      },
      {
        label: 'Activation',
        lede: 'Customer Success and Technical Support were central to the program because they had direct visibility into customer satisfaction. I coordinated with both teams to identify opportunities for advocacy and created custom messaging that could be used to request reviews in a way that felt appropriate to the customer relationship.',
        groups: [{ label: 'The program created tighter alignment between traditionally separate functions', items: [
          'Marketing provided campaign strategy, messaging, tracking, and reporting',
          'Customer Success contributed relationship context and customer knowledge',
          'Technical Support provided access to customers following successfully resolved interactions',
        ] }],
        close: 'Together, those teams created a repeatable pathway from customer success to public advocacy.',
      },
      {
        label: 'Platforms',
        lede: 'I managed campaigns across four independent platforms, which helped Hostfully build a broader and more resilient third-party reputation footprint.',
        groups: [{ label: '', items: [
          'G2 — strengthening Hostfully’s presence within one of the most influential B2B software research and comparison environments.',
          'Capterra — increasing customer validation where prospective buyers actively compare property management software and evaluate purchase options.',
          'Trustpilot — building broader brand credibility and strengthening Hostfully’s public reputation outside category-specific software marketplaces.',
          'Facebook — expanding accessible social proof within a channel where customers, prospects, and industry participants already interacted with the brand.',
        ] }],
        close: '',
      },
      {
        label: 'Management',
        lede: 'I managed the program from messaging through performance reporting, which made the initiative measurable at both the campaign and platform level.',
        groups: [{ label: 'Responsibilities', items: [
          'Developing custom review-request copy',
          'Coordinating campaign activity with Customer Success and Technical Support',
          'Managing review requests across multiple platforms',
          'Tracking campaign activity and responses',
          'Monitoring changes in review volume and ratings',
          'Comparing platform performance',
          'Reporting results internally',
          'Refining outreach based on campaign performance',
        ] }],
        close: '',
      },
      {
        label: 'Search & AEO',
        lede: 'The value of the program extended beyond star ratings. Review platforms create highly structured, independent signals about a company’s products, customer experience, positioning, and reputation.',
        groups: [{ label: '', items: [
          'Increasing the volume and quality of Hostfully’s third-party customer feedback strengthened the company’s presence across traditional search results while also increasing the amount of authoritative customer sentiment available to answer engines and AI-assisted discovery tools.',
        ] }],
        close: 'The campaign therefore contributed to both reputation management and discoverability.',
      },
      {
        label: 'Impact',
        lede: 'The initiative turned an existing strength, satisfied customers, into a measurable acquisition and reputation asset. Rather than treating customer advocacy as something that happened organically after a positive experience, Hostfully could intentionally activate it, measure it, and connect it back to business performance.',
        groups: [{ label: 'Improved review-platform performance contributed to', items: [
          'Greater credibility during software consideration',
          'Stronger public perception',
          'Increased visibility on software comparison platforms',
          'Improved organic and answer-engine discoverability',
          'Additional referral traffic',
          'Increased revenue originating from review-platform channels',
        ] }],
        close: 'Better customer experiences lead to more customer advocacy, stronger market credibility, greater discovery, and more commercial opportunities. It demonstrated how Customer Marketing can create value well beyond retention by turning successful customer relationships into assets that influence prospects throughout the buying journey.',
      },
    ],
  },
  {
    id: 'anniversary',
    label: '10th Anniversary Campaign',
    title: 'Hostfully 10th Anniversary Global Growth Campaign',
    sub: 'Transforming a company milestone into a 10-week integrated campaign generating 400K+ impressions, 200+ opportunities, and global customer engagement.',
    meta: [
      { k: 'Company', v: 'Hostfully' },
      { k: 'Industry', v: 'B2B SaaS / Short-Term Rental Technology' },
      { k: 'Focus', v: 'Integrated Marketing · Customer Marketing · Demand Generation · Brand · Advocacy & Partner Marketing' },
    ],
    images: [
      { src: '/img/u31.png', caption: 'A decade of success', year: '2026', ratio: '1' },
      { src: '/img/u30.png', caption: 'Customer highlight', year: '2026', ratio: '1' },
    ],
    figLabel: 'Campaign architecture',
    figNote: 'Brand storytelling designed as demand generation',
    hasRatings: true,
    hasLinks: false,
    stats: [
      { platform: 'Impressions', score: '400K+', volume: 'Across 10 weeks' },
      { platform: 'Engagement', score: '42%', volume: 'Campaign content' },
      { platform: 'Traffic', score: '+85%', volume: 'To owned properties' },
      { platform: 'Opportunities', score: '200+', volume: 'Generated' },
      { platform: 'Webinar', score: '300+', volume: 'Attendees' },
      { platform: 'Giveaway', score: '500', volume: 'Entries' },
      { platform: 'Languages', score: '4', volume: 'Activated' },
      { platform: 'Duration', score: '10 wks', volume: 'Coordinated activity' },
    ],
    statsNote: 'Campaign performance at a glance · 10-week period',
    flow: [
      { n: '01', label: 'Company milestone' },
      { n: '02', label: 'Customer, team and partner voices' },
      { n: '03', label: '10-week countdown' },
      { n: '04', label: 'Global localization' },
      { n: '05', label: 'Measurable pipeline' },
    ],
    links: [],
    skills: ['Integrated Marketing', 'Customer Marketing', 'Demand Generation', 'Brand Strategy', 'Partner Marketing', 'Campaign Localization', 'Executive Communications', 'Webinar Production', 'Cross-Functional Leadership', 'Customer Advocacy', 'Promotional Strategy', 'Campaign Reporting'],
    panels: [
      {
        label: 'Opportunity',
        lede: 'Hostfully’s 10th anniversary presented an opportunity to do considerably more than celebrate a company milestone. After a decade in the short-term rental technology market, Hostfully had accumulated something valuable: customers with meaningful success stories, an international workforce, an established partner ecosystem, experienced functional leaders, and executives who could speak directly to the company’s evolution.',
        groups: [{ label: 'The campaign was built around four objectives', items: [
          'Celebrate Hostfully’s first decade through customers, employees, partners, and leadership',
          'Increase brand visibility and digital traffic',
          'Generate new leads and commercial opportunities',
          'Use Hostfully’s international team to expand the campaign beyond an English-only audience',
        ] }],
        close: 'I developed the anniversary into a 10-week integrated global marketing campaign designed to turn those assets into sustained market attention, customer engagement, and measurable pipeline activity.',
      },
      {
        label: 'Strategy',
        lede: 'Rather than concentrate the anniversary around a single announcement, I structured it as a 10-week countdown.',
        groups: [{ label: 'Each phase introduced another part of the Hostfully story through', items: [
          'Customer advocacy',
          'Executive thought leadership',
          'Team-generated content',
          'Live programming',
          'Partner co-marketing',
          'Promotional activation',
          'International localization',
        ] }],
        close: 'This created multiple entry points into the campaign and allowed Hostfully to maintain momentum over several weeks rather than relying on the short attention cycle of a conventional anniversary post.',
      },
      {
        label: 'Leadership',
        lede: 'I personally organized the campaign across Hostfully’s internal teams, leadership, customers, and external partners. Because contributors came from throughout the organization, the project required coordination well beyond the Marketing function.',
        groups: [{ label: 'I managed the moving parts across', items: [
          'Executive Leadership — coordinated executives for social content highlighting Hostfully’s history, expertise, and perspective on the industry.',
          'Functional Teams — integrated content and expertise from departments across Hostfully into the countdown.',
          'Team Leads — organized a customer-facing anniversary webinar bringing together company leaders and their respective areas of expertise.',
          'Customers — developed customer highlights and produced new testimonial content that positioned customers as part of Hostfully’s decade-long story.',
          'Technology & Industry Partners — coordinated co-promotional campaigns that expanded distribution through Hostfully’s broader partner ecosystem.',
          'International Teams — worked with native speakers within Hostfully’s global workforce to extend campaign visibility across four languages.',
        ] }],
        close: 'I managed these workstreams under one campaign calendar and messaging strategy while maintaining the ongoing 10-week publishing cadence.',
      },
      {
        label: 'Localization',
        lede: 'Hostfully served an international market, so I wanted the anniversary campaign to reflect the company as it actually operated.',
        groups: [{ label: '', items: [
          'Rather than simply machine-translating English campaign material, I activated members of Hostfully’s international teams to communicate in their native languages.',
          'This expanded the campaign across four languages, allowing Hostfully to reach international audiences through people who understood both the language and the market context.',
        ] }],
        close: 'The approach gave a global campaign greater local authenticity while maintaining one unified anniversary narrative.',
      },
      {
        label: 'Advocacy',
        lede: 'Customers became one of the central voices of the campaign. I created customer highlights and coordinated the production of new testimonial material specifically for social distribution.',
        groups: [{ label: 'This content simultaneously supported', items: [
          'Customer advocacy',
          'Social proof',
          'Brand credibility',
          'Prospect consideration',
          'Sales enablement',
          'Customer recognition',
        ] }],
        close: 'Instead of Hostfully simply telling the market what it had accomplished during its first decade, customers could demonstrate the company’s impact through their own experiences.',
      },
      {
        label: 'Activation',
        lede: 'Three mechanics gave the campaign live engagement and reach beyond owned channels.',
        groups: [{ label: '', items: [
          'I organized an anniversary webinar featuring Hostfully team leads, creating an opportunity for customers and prospects to engage directly with the expertise inside the organization. The webinar attracted 300+ attendees.',
          'To create an additional acquisition and engagement mechanism, the campaign included a cash giveaway. The promotion generated 500 entries, and was integrated into the broader anniversary program rather than functioning as an isolated promotion.',
          'I also coordinated co-promotions with Hostfully’s partners. Partner participation extended campaign reach outside Hostfully’s owned channels while reinforcing the company’s position within a larger technology ecosystem.',
        ] }],
        close: 'The programming reinforced Hostfully’s position as an organization with expertise extending across the broader short-term-rental ecosystem, rather than simply a software vendor.',
      },
      {
        label: 'Results',
        lede: 'The 10th anniversary became more than a brand campaign. By coordinating Marketing, executives, functional leaders, international teams, customers, and external partners around one campaign architecture, I transformed a corporate milestone into a measurable brand, customer, and demand-generation program.',
        groups: [{ label: '', items: [
          'Sustained cross-channel distribution created more than 400K impressions throughout the campaign period.',
          'Campaign content achieved a 42% engagement rate, demonstrating that the increased reach translated into meaningful audience interaction rather than impressions alone.',
          'The campaign contributed to an 85% increase in traffic, converting brand activity into measurable movement toward Hostfully’s owned digital properties.',
          'The campaign generated 200+ opportunities, connecting the anniversary initiative directly to Hostfully’s growth pipeline.',
        ] }],
        close: 'A strong company story can generate measurable business outcomes when content, customer advocacy, leadership, partnerships, localization, engagement mechanics, and conversion strategy are designed as one integrated campaign.',
      },
    ],
  },
]

// Design-time options, not UI.
export const OPTIONS = {
  introSequence: true,
  cursorPeek: true,
  animateCounters: true,
  openFirstProject: true,
  shotsPerProject: 8,
  availability: 'Open to full-time roles',
}

export const AVAILABILITY_NOTE =
  'Open to full-time integrated marketing roles. Fastest route is email.'
