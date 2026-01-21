import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';

export default function Sitemap() {
    const sections = [
        {
            title: 'Main',
            links: [
                { label: 'Home', href: '/' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'FAQ', href: '/faq' },
            ],
        },
        {
            title: 'Account',
            links: [
                { label: 'Login', href: '/login' },
                { label: 'Register', href: '/register' },
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Resources', href: '/resources' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Sitemap', href: '/sitemap' },
            ],
        },
    ];

    return (
        <>
            <Head title="Sitemap" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <PublicHeader variant="back" />

                {/* Content */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Sitemap</h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Browse all pages and sections available on ResourceMS.
                        </p>

                        <div className="mt-12 grid gap-12 md:grid-cols-2">
                            {sections.map((section, index) => (
                                <div key={index}>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {section.title}
                                    </h2>
                                    <ul className="mt-4 space-y-2">
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    href={link.href}
                                                    className="text-slate-600 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400 transition"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                XML Sitemap
                            </h2>
                            <p className="mt-3 text-slate-600 dark:text-slate-400">
                                Search engines use our XML sitemap to discover and index all pages on our website.
                            </p>
                            <a
                                href="/sitemap.xml"
                                className="mt-4 inline-block text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                            >
                                View XML Sitemap →
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
