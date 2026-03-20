import { ChevronDown, Clock, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ──────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────
const menuCategories = [
  {
    icon: "☕",
    title: "Hot Beverages",
    items: ["Tea", "Lemon Tea", "Masala Tea", "Coffee"],
  },
  {
    icon: "🥤",
    title: "Cold Beverages",
    items: ["Cold Coffee", "Mojito", "Soft Drinks", "Lassi"],
  },
  {
    icon: "🥛",
    title: "Shakes",
    items: ["Mango Shake", "Banana Shake", "Oreo Shake", "Kitkat Shake"],
  },
  {
    icon: "🍮",
    title: "Desserts",
    items: ["Gulab Jamun", "Rasgulla", "Ice Cream", "Ras Malai"],
  },
  {
    icon: "🍽️",
    title: "Thali",
    items: [
      { name: "Regular Thali", price: "₹100" },
      { name: "Super Thali", price: "₹250" },
      { name: "Maa Annapurna Thali", price: "₹550" },
    ],
    isThali: true,
  },
];

const galleryItems = [
  {
    src: "/assets/generated/gallery-paratha.dim_800x600.jpg",
    caption: "Freshly Made Parathas",
  },
  {
    src: "/assets/generated/gallery-desserts.dim_800x600.jpg",
    caption: "Traditional Desserts",
  },
  {
    src: "/assets/generated/gallery-shakes.dim_800x600.jpg",
    caption: "Refreshing Shakes",
  },
  {
    src: "/assets/generated/gallery-interior.dim_800x600.jpg",
    caption: "Our Cozy Dining Space",
  },
];

const reviews = [
  {
    text: "The thali here is absolutely divine! Fresh rotis, flavorful dal, and the most delicious sweets. Reminds me of home-cooked food. Highly recommended!",
    name: "Ramesh Sharma",
    stars: 5,
    title: "Regular Customer",
  },
  {
    text: "Best cold coffee and shakes in the area! The staff is so welcoming and the ambience is perfect for family dining. We visit every weekend.",
    name: "Priya Meena",
    stars: 5,
    title: "Food Enthusiast",
  },
  {
    text: "Tried the Maa Annapurna Thali and it was a royal feast! Generous portions, authentic flavors, and very reasonable prices. Will definitely come back.",
    name: "Vikram Singh",
    stars: 5,
    title: "Travel Blogger",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mb-4">
        {children}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gold" />
        <span className="text-gold text-xl">✦</span>
        <div className="h-px w-16 bg-gold" />
      </div>
    </div>
  );
}

type ThaliItem = { name: string; price: string };
type MenuCategory = {
  icon: string;
  title: string;
  items: string[] | ThaliItem[];
  isThali?: boolean;
};

// ──────────────────────────────────────────────
// App
// ──────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-cream font-inter">
      {/* ── NAVBAR ─────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F1E4]/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Brand */}
            <a
              href="#home"
              className="flex flex-col leading-tight"
              data-ocid="nav.link"
            >
              <span className="font-playfair font-bold text-lg md:text-xl text-gold">
                Maa Annapurna
              </span>
              <span
                className={`text-xs font-inter tracking-wider ${
                  scrolled ? "text-dark-brown" : "text-[#F7F2E8]"
                }`}
              >
                Hotel Vidhya Palace
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                    scrolled ? "text-dark-brown" : "text-[#F7F2E8]"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:7300490409"
                className="ml-2 px-4 py-2 rounded-full bg-gold text-dark-brown text-sm font-semibold tracking-wide hover:bg-gold-dark transition-colors"
                data-ocid="nav.primary_button"
              >
                Call Now
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-dark-brown" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#F7F1E4] border-t border-tan shadow-lg"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-dark-brown text-sm font-medium py-3 px-3 rounded-lg hover:bg-cream-dark hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="tel:7300490409"
                  className="mt-2 px-4 py-3 rounded-full bg-gold text-dark-brown text-sm font-semibold text-center"
                  data-ocid="nav.primary_button"
                >
                  📞 Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ───────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-food.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,10,5,0.65) 0%, rgba(12,6,3,0.78) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold font-inter text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              Welcome to
            </p>
            <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Authentic Taste of India
              <br />
              <span className="text-gold">at Maa Annapurna Restaurant</span>
            </h1>
            <p className="text-[#F7F2E8] text-base md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Freshly prepared meals, beverages, desserts and traditional thali.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 bg-gold text-dark-brown font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-gold-light transition-all duration-300 shadow-gold hover:shadow-lg hover:-translate-y-0.5"
                data-ocid="hero.primary_button"
              >
                View Menu
              </a>
              <a
                href="tel:7300490409"
                className="w-full sm:w-auto px-8 py-4 border-2 border-gold text-gold font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-dark-brown transition-all duration-300"
                data-ocid="hero.secondary_button"
              >
                📞 Call Now
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── ABOUT ──────────────────────────────── */}
      <section id="about" className="bg-cream py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold font-inter text-sm tracking-[0.25em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-dark-brown mb-6">
              A Home Away From Home
            </h2>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-gold" />
              <span className="text-gold text-xl">✦</span>
              <div className="h-px w-16 bg-gold" />
            </div>
            <p className="text-dark-brown/80 text-base md:text-lg leading-relaxed">
              Welcome to{" "}
              <strong className="text-dark-brown">
                Maa Annapurna Restaurant (Hotel Vidhya Palace)
              </strong>{" "}
              — your home for authentic Indian cuisine near Merta Road,
              Rajasthan. We serve freshly prepared meals, refreshing beverages,
              creamy shakes, traditional desserts, and wholesome thali options
              in a warm, family-friendly atmosphere. Every dish is crafted with
              love and the finest ingredients, bringing you the true flavors of
              India.
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "15+", label: "Menu Items" },
                { num: "5★", label: "Guest Rating" },
                { num: "7AM", label: "Opens Daily" },
                { num: "100%", label: "Fresh & Hygienic" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/60 rounded-2xl p-5 border border-tan"
                >
                  <p className="font-playfair text-2xl font-bold text-gold">
                    {stat.num}
                  </p>
                  <p className="text-dark-brown/70 text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MENU HIGHLIGHTS ────────────────────── */}
      <section id="menu" className="bg-cream-dark py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>Explore Our Menu</SectionHeading>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(menuCategories as MenuCategory[]).map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white/70 rounded-2xl border-2 border-tan hover:border-gold p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-default"
                data-ocid={`menu.item.${i + 1}`}
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-playfair text-xl font-bold text-dark-brown mb-4">
                  {cat.title}
                </h3>
                <div className="h-px bg-tan mb-4" />
                <ul className="space-y-2">
                  {cat.isThali
                    ? (cat.items as ThaliItem[]).map((item) => (
                        <li
                          key={item.name}
                          className="flex justify-between items-center"
                        >
                          <span className="text-dark-brown/80 text-sm">
                            {item.name}
                          </span>
                          <span className="text-gold font-semibold text-sm">
                            {item.price}
                          </span>
                        </li>
                      ))
                    : (cat.items as string[]).map((item) => (
                        <li
                          key={item}
                          className="text-dark-brown/80 text-sm flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────── */}
      <section id="gallery" className="bg-cream py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>A Visual Feast</SectionHeading>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {galleryItems.map((img, i) => (
              <motion.div
                key={img.caption}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-card border border-tan"
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-10 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-playfair text-lg font-semibold">
                    {img.caption}
                  </p>
                </div>
                <div className="bg-[#F7F1E4] px-4 py-2 border-t border-tan">
                  <p className="text-dark-brown text-sm font-medium text-center">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────── */}
      <section id="reviews" className="bg-cream-dark py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>What Our Guests Say</SectionHeading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white/70 rounded-2xl border border-tan p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                data-ocid={`reviews.item.${i + 1}`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: star rating index is stable
                    <Star key={j} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-dark-brown/80 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-tan">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair font-bold text-gold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark-brown text-sm">
                      {review.name}
                    </p>
                    <p className="text-dark-brown/60 text-xs">{review.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────── */}
      <section id="contact" className="bg-dark-brown py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold font-inter text-sm tracking-[0.25em] uppercase mb-3">
              Find Us
            </p>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#F7F2E8] mb-2">
              Maa Annapurna Restaurant
            </h2>
            <p className="text-gold font-inter text-lg mb-8">
              Hotel Vidhya Palace
            </p>

            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-16 bg-gold/50" />
              <span className="text-gold text-xl">✦</span>
              <div className="h-px w-16 bg-gold/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gold/30 bg-white/5">
                <Phone size={24} className="text-gold" />
                <div>
                  <p className="text-[#F7F2E8] font-medium">7300490409</p>
                  <p className="text-[#F7F2E8] font-medium">7300490410</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gold/30 bg-white/5">
                <MapPin size={24} className="text-gold" />
                <p className="text-[#F7F2E8] text-center">
                  Near Merta Road, Rajasthan
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gold/30 bg-white/5">
                <Clock size={24} className="text-gold" />
                <div className="text-center">
                  <p className="text-[#F7F2E8] font-medium">Open Daily</p>
                  <p className="text-gold text-sm">7:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7300490409"
                className="px-8 py-4 bg-gold text-dark-brown font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-gold-light transition-all duration-300 shadow-gold hover:-translate-y-0.5"
                data-ocid="contact.primary_button"
              >
                📞 Call Now
              </a>
              <a
                href="https://www.google.com/maps/search/Merta+Road+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-gold text-gold font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-dark-brown transition-all duration-300"
                data-ocid="contact.secondary_button"
              >
                📍 Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer className="bg-[#150E08] py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-playfair text-gold text-lg font-semibold mb-1">
            Maa Annapurna Restaurant
          </p>
          <p className="text-[#F7F2E8]/60 text-sm mb-3">
            Near Merta Road, Rajasthan
          </p>
          <div className="h-px w-24 bg-gold/30 mx-auto mb-4" />
          <p className="text-[#F7F2E8]/50 text-xs">
            © {new Date().getFullYear()} Maa Annapurna Restaurant (Hotel Vidhya
            Palace). All rights reserved.
          </p>
          <p className="text-[#F7F2E8]/30 text-xs mt-2">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/50 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
