import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Plane, Briefcase, Users } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">B2B Flight Solutions</h3>
                        <p className="text-sm mb-4">We provide seamless flight booking solutions for businesses, travel agencies, and corporate clients worldwide.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Plane className="w-4 h-4" /> Corporate Flight Booking
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Briefcase className="w-4 h-4" /> Business Travel Solutions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Users className="w-4 h-4" /> Partner with Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:support@b2bflights.com" className="hover:text-white transition-colors">
                                    support@b2bflights.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>456 Aviation Plaza, Mumbai, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} B2B Flight Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;