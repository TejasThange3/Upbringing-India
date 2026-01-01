'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react'
import logo from '@/assets/logo.png'

const footerLinks = {
  products: [
    { name: 'Vacuum Systems', href: '/products/vacuum-systems' },
    { name: 'Industrial Equipment', href: '/products/industrial-equipment' },
    { name: 'Automation Solutions', href: '/products/automation' },
    { name: 'Engineering Services', href: '/products/engineering-services' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Industries', href: '/industries' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Resources', href: '/resources' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'Support', href: '/support' },
    { name: 'Documentation', href: '/documentation' },
    { name: 'FAQ', href: '/faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-industrial-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src={logo}
                  alt="Upbringing Technologies Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-bold">UPBRINGING</div>
                <div className="text-xs text-gray-400">TECHNOLOGIES</div>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Engineering reliable industrial solutions with precision, innovation, 
              and unwavering commitment to excellence.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/upbringing-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/upbringing_technologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/upbringingtechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-400" />
              <a
                href="tel:+919763088881"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                +91 9763088881
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-400" />
              <a
                href="mailto:beckerupb@gmail.com"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                beckerupb@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">India</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Upbringing Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
