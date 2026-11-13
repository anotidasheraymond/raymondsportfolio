// Every page of durhamfcc.org: the DOGHAIR-branded before/after slides from the client's
// Before-After Portfolio (Side by Side/DogHair Branding/Above the Fold - Desktop), then the six pages the
// rebuild added (Social Kit/DogHair Branding/New Pages). Re-rendered from the live site 2026-10-28.

/** The carousel frame: the before/after slide shape; new-page slides show their top within it. */
export const DFCC_SLIDE_ASPECT = '3310 / 1817'

export type DfccSlide = { src: string; thumb: string; caption: string; aspect: string; kind: 'before-after' | 'new' }

export const DFCC_BEFORE_AFTER: DfccSlide[] = [
  { src: '/img/dfcc/01-home.webp', thumb: '/img/dfcc/01-home-thumb.webp', caption: 'Home', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/02-about-us.webp', thumb: '/img/dfcc/02-about-us-thumb.webp', caption: 'About Us', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/03-meet-our-board.webp', thumb: '/img/dfcc/03-meet-our-board-thumb.webp', caption: 'Meet Our Board', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/04-contact.webp', thumb: '/img/dfcc/04-contact-thumb.webp', caption: 'Contact', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/05-together-we-are.webp', thumb: '/img/dfcc/05-together-we-are-thumb.webp', caption: 'Together We Are', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/06-student-and-family-advocate.webp', thumb: '/img/dfcc/06-student-and-family-advocate-thumb.webp', caption: 'Student and Family Advocate', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/07-pamoja-family-outreach.webp', thumb: '/img/dfcc/07-pamoja-family-outreach-thumb.webp', caption: 'Pamoja Family Outreach', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/08-cultural-care-legal-clinic.webp', thumb: '/img/dfcc/08-cultural-care-legal-clinic-thumb.webp', caption: 'Cultural Care Legal Clinic', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/09-youth-hub.webp', thumb: '/img/dfcc/09-youth-hub-thumb.webp', caption: 'Youth Hub', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/10-sponsorships.webp', thumb: '/img/dfcc/10-sponsorships-thumb.webp', caption: 'Sponsorships', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/11-work-with-us.webp', thumb: '/img/dfcc/11-work-with-us-thumb.webp', caption: 'Work With Us', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/12-donate.webp', thumb: '/img/dfcc/12-donate-thumb.webp', caption: 'Donate', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/13-volunteer.webp', thumb: '/img/dfcc/13-volunteer-thumb.webp', caption: 'Volunteer', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/14-events.webp', thumb: '/img/dfcc/14-events-thumb.webp', caption: 'Events', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/15-events-calendar.webp', thumb: '/img/dfcc/15-events-calendar-thumb.webp', caption: 'Events Calendar', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/16-videos-and-media.webp', thumb: '/img/dfcc/16-videos-and-media-thumb.webp', caption: 'Videos and Media', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/17-media.webp', thumb: '/img/dfcc/17-media-thumb.webp', caption: 'Media', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/18-afro-caribbean-food-baskets.webp', thumb: '/img/dfcc/18-afro-caribbean-food-baskets-thumb.webp', caption: 'Afro Caribbean Food Baskets', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/19-afro-caribbean-food-baskets-2025.webp', thumb: '/img/dfcc/19-afro-caribbean-food-baskets-2025-thumb.webp', caption: 'Afro Caribbean Food Baskets 2025', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/20-black-joy-holiday-market-2025.webp', thumb: '/img/dfcc/20-black-joy-holiday-market-2025-thumb.webp', caption: 'Black Joy Holiday Market 2025', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/21-take-action.webp', thumb: '/img/dfcc/21-take-action-thumb.webp', caption: 'Take Action', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/22-surveys.webp', thumb: '/img/dfcc/22-surveys-thumb.webp', caption: 'Surveys', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/23-resources.webp', thumb: '/img/dfcc/23-resources-thumb.webp', caption: 'Resources', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/24-auditions.webp', thumb: '/img/dfcc/24-auditions-thumb.webp', caption: 'Auditions', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/25-youth-services.webp', thumb: '/img/dfcc/25-youth-services-thumb.webp', caption: 'Youth Services', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/26-vendor-application.webp', thumb: '/img/dfcc/26-vendor-application-thumb.webp', caption: 'Vendor Application', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/27-become-a-member.webp', thumb: '/img/dfcc/27-become-a-member-thumb.webp', caption: 'Become a Member', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/28-sponsorship-decks.webp', thumb: '/img/dfcc/28-sponsorship-decks-thumb.webp', caption: 'Sponsorship Decks', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/29-sponsorship-deck-acfb.webp', thumb: '/img/dfcc/29-sponsorship-deck-acfb-thumb.webp', caption: 'Sponsorship Deck - ACFB', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/30-sponsorship-deck-bjhm.webp', thumb: '/img/dfcc/30-sponsorship-deck-bjhm-thumb.webp', caption: 'Sponsorship Deck - BJHM', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/31-sponsorship-deck-mini-moguls.webp', thumb: '/img/dfcc/31-sponsorship-deck-mini-moguls-thumb.webp', caption: 'Sponsorship Deck - Mini Moguls', aspect: '3310 / 1817', kind: 'before-after' },
  { src: '/img/dfcc/32-all-services.webp', thumb: '/img/dfcc/32-all-services-thumb.webp', caption: 'All Services', aspect: '1740 / 1756', kind: 'new' },
  { src: '/img/dfcc/33-r-3-4-success.webp', thumb: '/img/dfcc/33-r-3-4-success-thumb.webp', caption: 'R(3) 4 Success', aspect: '1740 / 1725', kind: 'new' },
  { src: '/img/dfcc/34-skills-for-success.webp', thumb: '/img/dfcc/34-skills-for-success-thumb.webp', caption: 'Skills for Success', aspect: '1740 / 1761', kind: 'new' },
  { src: '/img/dfcc/35-parents-hub.webp', thumb: '/img/dfcc/35-parents-hub-thumb.webp', caption: 'Parents Hub', aspect: '1740 / 1687', kind: 'new' },
  { src: '/img/dfcc/36-seniors-hub.webp', thumb: '/img/dfcc/36-seniors-hub-thumb.webp', caption: 'Seniors Hub', aspect: '1740 / 1745', kind: 'new' },
  { src: '/img/dfcc/37-venue-booking.webp', thumb: '/img/dfcc/37-venue-booking-thumb.webp', caption: 'Venue Booking', aspect: '1740 / 1750', kind: 'new' },
]
