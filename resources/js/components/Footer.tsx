import { Link } from '@inertiajs/react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">ResourceMS</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            Simple resource management for teams of all sizes.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Product</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/pricing" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <a href="#features" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#security" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Company</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Legal</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/sitemap" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                                    Sitemap
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-slate-200 dark:border-slate-700" />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            © {currentYear} ResourceMS. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="mailto:info@resourcems.com"
                                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                            <a
                                href="#twitter"
                                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#github"
                                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="#linkedin"
                                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        <a href="mailto:info@resourcems.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                            info@resourcems.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
