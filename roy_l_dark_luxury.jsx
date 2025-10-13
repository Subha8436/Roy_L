import React, { useState, useEffect } from 'react';

// --- Global Content & Style Variables ---
const BRAND_NAME = "ROY_L";
const PRIMARY_COLOR = '#D4AF37'; // Gold
const BG_DARK = '#0B0B0B'; // Deep Black
const CONTRAST_WHITE = '#FFFFFF'; // Pure White

// Filigree SVG Pattern (subtle, tone-on-tone)
const FiligreePattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
            <pattern id="filigree" patternUnits="userSpaceOnUse" width="100" height="100">
                <path d="M 10 0 L 0 10 L 0 90 L 10 100 L 90 100 L 100 90 L 100 10 L 90 0 Z" fill="none" stroke={PRIMARY_COLOR} strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="3" fill={PRIMARY_COLOR} opacity="0.1" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#filigree)" />
    </svg>
);

// Helper for the simulated logo (replace with your actual SVG or Image)
const Logo = ({ className, size = '1.75rem' }) => (
    <div className={className} style={{ fontFamily: 'Playfair Display, serif', fontSize: size, letterSpacing: '0.1rem', color: PRIMARY_COLOR }}>
        {BRAND_NAME}
    </div>
);

// --- Component: Mobile Menu ---
const MobileMenu = ({ isOpen, toggleMenu }) => {
    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Menu', href: '#menu' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-95" onClick={toggleMenu}></div>

            {/* Menu Panel */}
            <div className={`absolute top-0 right-0 h-full w-64 p-8 transform transition-transform duration-300 ease-in-out`} style={{ backgroundColor: BG_DARK, color: CONTRAST_WHITE, transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 p-2 focus:outline-none focus:ring-2 rounded-full"
                    aria-label="Close menu"
                    style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, outlineColor: PRIMARY_COLOR }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="mt-12 space-y-6">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={toggleMenu}
                            className="block text-xl font-serif tracking-wider hover:text-opacity-80 transition duration-150"
                            style={{ color: CONTRAST_WHITE }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#reservations"
                        onClick={toggleMenu}
                        className="mt-8 block w-full py-3 text-center text-lg font-bold rounded-lg shadow-lg hover:opacity-90 transition duration-200"
                        style={{ backgroundColor: PRIMARY_COLOR, color: BG_DARK }}
                    >
                        Reserve a Table
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- Component: Header / Sticky Nav ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { label: 'Home', href: '#home', hiddenSm: true },
        { label: 'About', href: '#about' },
        { label: 'Menu', href: '#menu' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <header id="home" className="sticky top-0 z-30 shadow-2xl backdrop-blur-sm" style={{ backgroundColor: `${BG_DARK}D0` }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    <Logo className="flex-shrink-0" size="1.75rem" />

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-8 items-center">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`text-sm tracking-widest uppercase font-medium hover:text-opacity-70 transition duration-150 ${link.hiddenSm ? 'hidden xl:block' : ''}`}
                                style={{ color: CONTRAST_WHITE }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#reservations"
                            className="ml-6 px-6 py-2 text-sm font-bold uppercase rounded-full shadow-lg transform transition duration-300 hover:scale-[1.03]"
                            style={{ backgroundColor: PRIMARY_COLOR, color: BG_DARK, boxShadow: `0 4px 15px -3px ${PRIMARY_COLOR}60` }}
                        >
                            Reserve a Table
                        </a>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 focus:outline-none focus:ring-2 rounded-lg"
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                        style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, outlineColor: PRIMARY_COLOR }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </header>
            <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </>
    );
};

// --- Component: Hero Section ---
const Hero = () => (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden" style={{ backgroundColor: BG_DARK }}>
        <FiligreePattern />

        {/* Hero Content */}
        <div className="relative z-10 p-4 max-w-4xl">
            <div className="mb-8">
                <Logo size="4rem" className="mx-auto block sm:text-7xl lg:text-8xl" />
            </div>

            <h1 className="text-xl sm:text-3xl font-serif uppercase tracking-widest mb-6" style={{ color: PRIMARY_COLOR }}>
                Royal Taste. Family Warmth.
            </h1>

            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light" style={{ color: CONTRAST_WHITE }}>
                Discover a refined casual dining experience where gourmet flavors meet heartwarming hospitality. We blend fresh, seasonal ingredients with luxurious, elegant settings, making every visit a cherished family memory.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                    href="#reservations"
                    className="px-10 py-4 text-lg font-extrabold uppercase rounded-lg shadow-xl transform transition duration-300 hover:scale-[1.05] focus:outline-none focus:ring-4"
                    style={{ backgroundColor: PRIMARY_COLOR, color: BG_DARK, boxShadow: `0 8px 25px -5px ${PRIMARY_COLOR}80` }}
                >
                    Reserve a Table
                </a>
                <a
                    href="#menu"
                    className="px-10 py-4 text-lg font-extrabold uppercase rounded-lg border-2 transform transition duration-300 hover:bg-opacity-10 focus:outline-none focus:ring-4"
                    style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                >
                    View Menu
                </a>
            </div>
        </div>
    </section>
);

// --- Content Section Templates ---

// Section Wrapper
const Section = ({ id, title, children }) => (
    <section id={id} className="py-20 sm:py-24" style={{ backgroundColor: BG_DARK, color: CONTRAST_WHITE }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-4xl sm:text-5xl font-serif text-center mb-16" style={{ color: PRIMARY_COLOR }}>
                {title}
            </h2>
            {children}
        </div>
    </section>
);

// --- Component: About Section ---
const About = () => (
    <Section id="about" title="Our Story">
        <div className="max-w-4xl mx-auto space-y-8 text-lg font-light">
            <p>
                ROY\_L was founded on a simple yet profound vision: to create a dining space where the **elegance of luxury dining meets the genuine warmth of a family cafe**. We are dedicated to providing a refined casual experience that appeals to discerning palates while remaining welcoming to guests of all ages.
            </p>
            <p>
                Our culinary philosophy centers on **fresh, seasonal ingredients** sourced from trusted local producers. Every dish, from our signature Beef Wellington to our carefully crafted coffee, is prepared with meticulous attention to detail, ensuring a burst of authentic, gourmet flavor in every bite.
            </p>
            <p>
                More than just a restaurant, ROY\_L is a gathering place. We pride ourselves on **unparalleled hospitality and a cozy, yet opulent atmosphere**. Whether you're celebrating a milestone or simply enjoying a weeknight dinner, we invite you to settle in and make our family table yours.
            </p>
        </div>
    </Section>
);

// --- Component: Menu Highlights Section ---
const MenuHighlights = () => {
    const highlights = [
        { name: "Royal Beef Wellington", desc: "Tender fillet mignon, mushroom duxelles, prosciutto, flaky pastry.", price: "$45", icon: "🍴" },
        { name: "Golden Truffle Pasta", desc: "Handmade fettuccine, shaved black truffles, Parmesan-reggiano cream.", price: "$28", icon: "🍝" },
        { name: "Signature ROY_L Coffee Blend", desc: "Single-origin beans, house-roasted, perfectly balanced and rich.", price: "$6", icon: "☕" },
        { name: "Heirloom Tomato Salad", desc: "Fresh basil, buffalo mozzarella, aged balsamic glaze.", price: "$15", icon: "🥗" },
        { name: "Family Brunch Platter", desc: "Assortment of artisanal pastries, fresh fruit, and smoked salmon.", price: "$32", icon: "🥐" },
        { name: "Decadent Chocolate Lava Cake", desc: "Served with vanilla bean ice cream and raspberry coulis.", price: "$12", icon: "🍰" },
    ];

    const MenuCard = ({ name, desc, price, icon }) => (
        <div className="p-6 rounded-lg border border-opacity-20 transition duration-300 hover:shadow-2xl hover:border-opacity-50" style={{ borderColor: PRIMARY_COLOR, backgroundColor: BG_DARK }}>
            <div className="text-4xl mb-4" style={{ color: PRIMARY_COLOR }}>{icon}</div>
            <h3 className="text-2xl font-serif mb-2" style={{ color: PRIMARY_COLOR }}>{name}</h3>
            <p className="text-base font-light mb-4 text-gray-300">{desc}</p>
            <span className="text-xl font-bold tracking-wider" style={{ color: CONTRAST_WHITE }}>{price}</span>
        </div>
    );

    return (
        <Section id="menu" title="Menu Highlights">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {highlights.map((item, index) => <MenuCard key={index} {...item} />)}
            </div>
            <div className="text-center mt-12">
                <a
                    href="#" // Placeholder for external menu link
                    className="inline-block px-8 py-3 text-lg font-bold uppercase rounded-lg border-2 transform transition duration-300 hover:opacity-80"
                    style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                >
                    View Full Menu
                </a>
            </div>
        </Section>
    );
};

// --- Component: Testimonials Section ---
const StarRating = ({ rating }) => (
    <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.045a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.045a1 1 0 00-1.175 0l-2.817 2.045c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const Testimonials = () => {
    const testimonials = [
        { quote: "Absolutely stellar food and the most elegant atmosphere. Perfect for our anniversary!", name: "Sarah K.", rating: 5 },
        { quote: "The Royal Beef Wellington is a must-try. The service was impeccable, and the kids loved it too.", name: "David M.", rating: 5 },
        { quote: "A beautiful blend of fine dining and comfort. We now consider ROY\_L our favorite family spot.", name: "Jia L.", rating: 4 },
    ];

    const TestimonialCard = ({ quote, name, rating }) => (
        <div className="p-8 rounded-xl shadow-xl border border-opacity-10" style={{ backgroundColor: BG_DARK, borderColor: PRIMARY_COLOR }}>
            <StarRating rating={rating} />
            <p className="text-xl italic mb-6 font-serif leading-relaxed" style={{ color: CONTRAST_WHITE }}>"{quote}"</p>
            <p className="text-sm font-medium uppercase tracking-wider" style={{ color: PRIMARY_COLOR }}>— {name}</p>
        </div>
    );

    return (
        <Section id="testimonials" title="What Our Guests Say">
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, index) => <TestimonialCard key={index} {...t} />)}
            </div>
        </Section>
    );
};

// --- Component: Gallery Section ---
const Gallery = () => {
    const galleryItems = [
        { ratio: '3/2', alt: 'Warm cafe interior with soft lighting', keywords: 'warm cafe interior' },
        { ratio: '4/3', alt: 'Plated gourmet dish, Royal Beef Wellington', keywords: 'plated gourmet dishes' },
        { ratio: '3/4', alt: 'Family dining moment, laughing children', keywords: 'family dining moment' },
        { ratio: '16/9', alt: 'Barista preparing ROY_L blend coffee', keywords: 'barista coffee station' },
        { ratio: '1/1', alt: 'Table setting with gold cutlery and linen', keywords: 'luxury table setting' },
        { ratio: '5/4', alt: 'Exterior view of ROY_L restaurant at sunset', keywords: 'elegant restaurant facade' },
    ];

    // Placeholder image generation using placehold.co
    const getPlaceholderUrl = (ratio) => {
        const [w, h] = ratio.split('/').map(Number);
        const width = 600;
        const height = Math.round(width * (h / w));
        const bgColor = BG_DARK.replace('#', '');
        const textColor = PRIMARY_COLOR.replace('#', '');
        return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=ROY_L+(${w}x${h})`;
    };

    return (
        <Section id="gallery" title="Gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {galleryItems.map((item, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer">
                        {/* Note: In a real app, this would trigger a lightbox/modal */}
                        <img
                            src={getPlaceholderUrl(item.ratio)}
                            alt={item.alt}
                            className={`w-full h-auto object-cover`}
                            style={{ aspectRatio: item.ratio }}
                            loading="lazy"
                            // Suggested compressed output (e.g., JPEG, WEBP) for production
                            title={`Recommended: ${item.keywords} (Ratio: ${item.ratio})`}
                        />
                    </div>
                ))}
            </div>
            <p className="text-center text-sm mt-8 text-gray-500">
                (Clicking an image would typically open a full-screen lightbox. Placeholders used for demonstration.)
            </p>
        </Section>
    );
};

// --- Component: Reservations & CTA Section ---
const Reservations = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '', time: '', partySize: 2, gdprConsent: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple client-side validation
        if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.gdprConsent) {
            alert("Please fill in all required fields and accept the consent terms.");
            return;
        }
        // In a real application, this data would be sent to a backend/booking system
        console.log("Reservation Request Submitted:", formData);
        alert("Thank you! Your reservation request has been received (check console for details). We will contact you shortly to confirm.");
        setFormData({ name: '', phone: '', email: '', date: '', time: '', partySize: 2, gdprConsent: false });
    };

    const InputField = ({ label, name, type = 'text', required = false, min = null }) => (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-2 text-sm font-medium" style={{ color: PRIMARY_COLOR }}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                min={min}
                value={formData[name]}
                onChange={handleChange}
                className="p-3 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition duration-150"
                style={{ backgroundColor: BG_DARK, borderColor: PRIMARY_COLOR, color: CONTRAST_WHITE, outlineColor: PRIMARY_COLOR }}
            />
        </div>
    );

    return (
        <Section id="reservations" title="Book Your Royal Table">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Reservation Form */}
                <div className="p-8 rounded-xl shadow-2xl border border-opacity-30" style={{ backgroundColor: BG_DARK, borderColor: PRIMARY_COLOR }}>
                    <h3 className="text-3xl font-serif mb-6" style={{ color: CONTRAST_WHITE }}>Reservation Form</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField label="Full Name" name="name" required={true} />
                        <InputField label="Phone Number" name="phone" type="tel" required={true} />
                        <InputField label="Email Address (Optional)" name="email" type="email" />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Date" name="date" type="date" required={true} min={new Date().toISOString().split('T')[0]} />
                            <InputField label="Time" name="time" type="time" required={true} />
                        </div>
                        <InputField label="Party Size" name="partySize" type="number" required={true} min="1" />

                        <div className="pt-4">
                            <label className="flex items-center text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="gdprConsent"
                                    checked={formData.gdprConsent}
                                    onChange={handleChange}
                                    required
                                    className="h-4 w-4 rounded transition duration-150"
                                    style={{ backgroundColor: BG_DARK, borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                                />
                                <span className="ml-3 text-gray-300">
                                    I consent to ROY\_L contacting me regarding this reservation. <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 py-3 text-lg font-extrabold uppercase rounded-lg shadow-xl transform transition duration-300 hover:scale-[1.01] focus:outline-none focus:ring-4"
                            style={{ backgroundColor: PRIMARY_COLOR, color: BG_DARK, boxShadow: `0 4px 15px -3px ${PRIMARY_COLOR}80` }}
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>

                {/* Private Dining / Events CTA */}
                <div className="flex flex-col justify-between p-8 rounded-xl shadow-2xl border border-opacity-30" style={{ backgroundColor: BG_DARK, borderColor: PRIMARY_COLOR }}>
                    <div>
                        <h3 className="text-3xl font-serif mb-4" style={{ color: CONTRAST_WHITE }}>Private Dining & Events</h3>
                        <p className="text-gray-300 text-lg mb-6">
                            Host your next special occasion in our luxurious private event space. Perfect for intimate family celebrations or corporate gatherings.
                        </p>
                    </div>
                    <div>
                        <a
                            href="tel:+1234567890" // Placeholder phone number
                            className="text-2xl font-bold tracking-wider block mb-4 hover:opacity-80 transition duration-150"
                            style={{ color: PRIMARY_COLOR }}
                        >
                            Call Us: (123) 456-7890
                        </a>
                        <a
                            href="mailto:events@roylcafe.com" // Placeholder email
                            className="w-full py-3 text-lg font-bold uppercase rounded-lg border-2 text-center transform transition duration-300 hover:opacity-80"
                            style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                        >
                            Inquire About Events
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    );
};

// --- Component: Contact & Location Section ---
const ContactLocation = () => {
    const ContactItem = ({ icon, label, content, href }) => (
        <div className="flex items-start space-x-4">
            <span className="text-2xl" style={{ color: PRIMARY_COLOR }}>{icon}</span>
            <div>
                <p className="font-bold text-lg mb-1" style={{ color: CONTRAST_WHITE }}>{label}</p>
                {href ? (
                    <a href={href} className="text-gray-300 hover:text-opacity-70 transition duration-150">{content}</a>
                ) : (
                    <p className="text-gray-300">{content}</p>
                )}
            </div>
        </div>
    );

    return (
        <Section id="contact" title="Location & Hours">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Details */}
                <div className="space-y-8">
                    <ContactItem
                        icon="📍"
                        label="Address"
                        content="123 Royal Avenue, Luxury District, New City, 90210"
                    />
                    <ContactItem
                        icon="📞"
                        label="Phone"
                        content="(123) 456-7890"
                        href="tel:+1234567890"
                    />
                    <ContactItem
                        icon="📧"
                        label="Email"
                        content="info@roylcafe.com"
                        href="mailto:info@roylcafe.com"
                    />
                    <div className="space-y-2">
                        <ContactItem icon="⏰" label="Hours" content="Mon - Fri: 11:00 AM - 10:00 PM" />
                        <ContactItem icon="📅" label="Weekend Hours" content="Sat - Sun: 9:00 AM - 11:00 PM (Brunch served 9am - 2pm)" />
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="rounded-xl overflow-hidden shadow-2xl h-80 md:h-full">
                    <a href="https://maps.app.goo.gl/placeholder" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        {/* Static Google Maps Placeholder Simulation */}
                        <div className="w-full h-full flex items-center justify-center text-center p-4 text-sm" style={{ backgroundColor: '#202020', color: CONTRAST_WHITE }}>
                            <p>
                                [Embedded Static Map Placeholder]<br/>
                                Click to view location on Google Maps.<br/>
                                (123 Royal Avenue, Luxury District)
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </Section>
    );
};

// --- Component: Footer ---
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { icon: '', name: 'Instagram', href: '#' },
        { icon: '📘', name: 'Facebook', href: '#' },
        { icon: '✖️', name: 'Twitter/X', href: '#' },
    ];
    const quickLinks = [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Careers', href: '#' },
    ];

    return (
        <footer className="py-12" style={{ backgroundColor: BG_DARK, borderTop: `1px solid ${PRIMARY_COLOR}20`, color: CONTRAST_WHITE }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-10 border-b pb-8 border-opacity-20" style={{ borderColor: PRIMARY_COLOR }}>
                    {/* Logo & Social */}
                    <div className="space-y-4">
                        <Logo size="2rem" />
                        <p className="text-sm font-light text-gray-400">Royal Taste. Family Warmth.</p>
                        <div className="flex space-x-4 pt-2">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} aria-label={link.name} className="text-xl hover:opacity-70 transition duration-150" style={{ color: PRIMARY_COLOR }}>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold uppercase mb-4 tracking-wider" style={{ color: PRIMARY_COLOR }}>Explore</h4>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-300 hover:text-opacity-70 transition duration-150">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold uppercase mb-4 tracking-wider" style={{ color: PRIMARY_COLOR }}>Newsletter</h4>
                        <p className="text-sm text-gray-300 mb-4">Subscribe for exclusive offers and events.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="p-3 w-full rounded-l-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ backgroundColor: BG_DARK, borderColor: PRIMARY_COLOR, color: CONTRAST_WHITE }}
                            />
                            <button
                                type="submit"
                                className="px-5 text-sm font-bold rounded-r-lg transform transition duration-200 hover:opacity-90"
                                style={{ backgroundColor: PRIMARY_COLOR, color: BG_DARK }}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright & Legal */}
                <div className="mt-8 text-center text-xs text-gray-500">
                    &copy; {currentYear} {BRAND_NAME} Family Restaurant. All rights reserved. | Legal text placeholder.
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---
const App = () => (
    <div style={{ backgroundColor: BG_DARK, fontFamily: 'Inter, sans-serif' }}>
        {/* Font Links (normally in index.html, placed here for single file completeness) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

        <Header />
        <main>
            <Hero />
            <About />
            <MenuHighlights />
            <Reservations />
            <Gallery />
            <Testimonials />
            {/* Events/Private Dining is integrated into the Reservations section */}
        </main>
        <Footer />
    </div>
);

export default App;
