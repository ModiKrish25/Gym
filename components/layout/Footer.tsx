"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/data/content";
import { Instagram, Youtube, Twitter, ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0B0B0D] border-t border-[rgba(237,235,228,0.08)] pt-20 pb-12 text-[#8A8F98]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="font-display text-4xl font-extrabold uppercase text-[#EDEBE4] group-hover:text-[#D4FF3F] tracking-tight transition-colors">
                {BRAND.name}
              </span>
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F] inline-block" />
            </Link>
            <p className="font-mono uppercase text-[11px] tracking-[0.2em] text-[#D4FF3F] mb-3">
              &ldquo;One more rep // {BRAND.tagline}&rdquo;
            </p>
            <p className="text-sm max-w-sm leading-relaxed text-[#8A8F98] mb-6 font-body">
              A private training sanctuary built for serious progress. Data-backed
              coaching, Olympic-grade machinery, and disciplined recovery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GYM Instagram"
                className="w-9 h-9 rounded-[2px] border border-[rgba(237,235,228,0.12)] bg-[#17181B] flex items-center justify-center text-[#EDEBE4] hover:border-[#D4FF3F] hover:text-[#D4FF3F] transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GYM YouTube"
                className="w-9 h-9 rounded-[2px] border border-[rgba(237,235,228,0.12)] bg-[#17181B] flex items-center justify-center text-[#EDEBE4] hover:border-[#D4FF3F] hover:text-[#D4FF3F] transition-all duration-300"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GYM X / Twitter"
                className="w-9 h-9 rounded-[2px] border border-[rgba(237,235,228,0.12)] bg-[#17181B] flex items-center justify-center text-[#EDEBE4] hover:border-[#D4FF3F] hover:text-[#D4FF3F] transition-all duration-300"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#EDEBE4] mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-[#D4FF3F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-[#D4FF3F] transition-colors">
                  Disciplines
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-[#D4FF3F] transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-[#D4FF3F] transition-colors">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#D4FF3F] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#EDEBE4] mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="hover:text-[#D4FF3F] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing#faq" className="hover:text-[#D4FF3F] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50 font-mono text-xs">Careers (Hiring)</span>
              </li>
            </ul>

            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#EDEBE4] mt-8 mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="hover:text-[#D4FF3F] cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#D4FF3F] cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#EDEBE4] mb-3">
              The Dispatch
            </h4>
            <p className="text-xs leading-relaxed mb-4 text-[#8A8F98]">
              Weekly insights on biomechanics, metabolic training, and recovery protocols.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-[2px] bg-[#17181B] border border-[#D4FF3F]/50 text-xs text-[#EDEBE4] flex items-center gap-2 font-mono">
                <Check size={16} className="text-[#D4FF3F]" />
                <span>Subscribed to the Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.12)] text-sm text-[#EDEBE4] placeholder:text-[#8A8F98]/60 focus:border-[#D4FF3F] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-[2px] btn-volt text-xs flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="pt-8 border-t border-[rgba(237,235,228,0.08)] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#8A8F98] gap-4">
          <p>© 2026 GYM Elite Fitness Club. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>{BRAND.address}</span>
            <span>•</span>
            <span className="text-[#D4FF3F]">{BRAND.phone}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
