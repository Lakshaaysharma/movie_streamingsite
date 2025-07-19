import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="text-yellow-400 text-2xl font-bold">
                                🏴‍☠️ PIRATE STREAM
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your ultimate destination for streaming entertainment. Discover the best movies, TV shows, and exclusive content from around the world.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Movies</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">TV Shows</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Originals</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Watchlist</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Newsletter</h3>
                        <p className="text-gray-400 text-sm">
                            Stay updated with the latest releases and exclusive content.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none text-white placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2024 Pirate Stream. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <HiMail className="w-4 h-4" />
                                <span>support@piratestream.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <HiPhone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 