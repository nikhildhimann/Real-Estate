export const siteConfig = {
  brandName: "Stackron Real Estate Solutions",
  tagline: "Trusted real estate solutions from Mohali, serving clients worldwide.",
  logoText: "Stackron Real Estate",
  phone: "+91 94644 02648",
  whatsapp: "919464402648",
  email: "nikhilstackron@gmail.com",
  address: "Mohali, Punjab, India (Serving Worldwide)",
  mapLocation: "Mohali, Punjab, India",
  siteUrl: "https://stackron.vercel.app/",
  heroTitle: "Find Your Dream Home with Confidence",
  heroSubtitle:
    "Buy, sell, or rent premium properties with expert guidance and verified listings.",
  currency: "AUD",
  businessHours: "Mon-Sat 10am to 7pm IST",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  seoTitle: "Stackron Real Estate Solutions | Find Your Dream Home with Confidence",
  seoDescription:
    "Buy, sell, or rent properties with verified listings and expert real estate guidance from Stackron.",
  footerCredit: "Designed & Developed by Stackron",
} as const;

export type SiteConfig = typeof siteConfig;
