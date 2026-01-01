# 🚀 Next.js Website Setup Guide

## Quick Start

This is a complete Next.js 14 website for **Upbringing Technologies** built with modern technologies.

### Installation Steps

1. **Install Dependencies**

   First, you need to install the Next.js dependencies. You have two options:

   **Option A: Use the new package file (Recommended)**
   ```bash
   cd UpBringing-Website-main/UpBringing-Website-main
   cp package-next.json package.json
   npm install
   ```

   **Option B: Merge dependencies**
   ```bash
   cd UpBringing-Website-main/UpBringing-Website-main
   npm install next@^14.2.0 react@^18.3.1 react-dom@^18.3.1 framer-motion@^11.0.0 lucide-react@^0.487.0
   npm install -D @types/node@^20.10.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 autoprefixer@^10.4.19 postcss@^8.4.38 tailwindcss@^3.4.1 typescript@^5.3.3
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page (all sections)
│   └── globals.css         # Global Tailwind styles
└── components/
    ├── Header.tsx          # Sticky navigation
    ├── HeroSection.tsx     # Hero with animations
    ├── ProductsSection.tsx # Products grid
    ├── IndustriesSection.tsx # Industries served
    ├── WhyChooseUsSection.tsx # Trust features
    ├── AboutUsSection.tsx  # Company info
    ├── CTASection.tsx      # Call to action
    └── Footer.tsx          # Footer with links
```

## ✨ Features Implemented

✅ **Header**
- Sticky navigation on scroll
- Mobile-responsive hamburger menu
- Top bar with contact info and social links
- Smooth hover animations
- "Get in Touch" CTA button

✅ **Hero Section**
- Full-width hero with gradient background
- Animated background patterns
- Framer Motion animations
- Two CTA buttons (View Products, Contact Experts)
- Trust badge
- Scroll indicator

✅ **Products Section**
- Grid layout (responsive: 1/2/3 columns)
- 5 product categories with icons
- Hover animations and transitions
- Clickable cards with links

✅ **Industries Section**
- 6 industries with icons
- Responsive grid (2/3/6 columns)
- Hover effects

✅ **Why Choose Us**
- 5 trust-building features
- Icon-based cards
- Professional descriptions

✅ **About Us**
- Company overview
- Mission, Vision, Values
- Professional content

✅ **CTA Section**
- High-contrast banner
- Gradient background
- Call to action button

✅ **Footer**
- Logo and description
- Product links
- Company links
- Support links
- Contact information
- Social media icons
- Copyright

## 🎨 Design Features

- **Color Scheme**: Industrial Red (#DC2626) as primary
- **Typography**: Inter font (via Next.js)
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels, semantic HTML

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** (Icons)

## 📝 Next Steps

1. **Add More Pages**:
   - `/products` - Products listing page
   - `/solutions` - Solutions page
   - `/industries` - Industries detail page
   - `/about` - Extended about page
   - `/contact` - Contact form page
   - `/resources` - Resources/blog page

2. **Enhance SEO**:
   - Add more metadata
   - Create sitemap.xml
   - Add robots.txt
   - Implement structured data

3. **Add Functionality**:
   - Contact form with validation
   - Product filtering/search
   - Blog system
   - Newsletter signup

4. **Performance**:
   - Optimize images
   - Add loading states
   - Implement lazy loading

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Options

- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Connect repository
- **Google Cloud Run**: Use Docker
- **Azure Static Web Apps**: Connect repo

## 📞 Support

For questions or issues, contact:
- Email: beckerupb@gmail.com
- Phone: +91 9763088881

---

**Built with ❤️ for Upbringing Technologies**

