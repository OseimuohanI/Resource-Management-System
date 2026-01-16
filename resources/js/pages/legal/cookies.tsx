import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';

export default function Cookies() {
    const lastUpdated = 'January 14, 2026';

    const sections = [
        {
            title: 'What Are Cookies?',
            content: [
                'Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide website owners with information.',
                'Cookies are safe and secure and contain only information that you place in them or that the website places in them - they cannot run code or introduce viruses.',
            ],
        },
        {
            title: 'How We Use Cookies',
            content: [
                'We use cookies to understand how you use our Service and to improve it. We use the following types of cookies:',
                '• Essential Cookies: These cookies are necessary for the Service to function properly. They enable core functionality such as security, network management, and accessibility.',
                '• Performance Cookies: These cookies help us understand how users interact with the Service, collect information about pages visited, and identify any errors.',
                '• Functional Cookies: These cookies enable personalized features and remember your preferences.',
                '• Targeting/Advertising Cookies: These cookies track your activity across websites to deliver personalized advertisements.',
            ],
        },
        {
            title: 'Third-Party Cookies',
            content: [
                'In addition to our own cookies, we may use various third-party services which also set cookies on your device, such as:',
                '• Google Analytics: to understand how users interact with our Service',
                '• Stripe: for payment processing',
                '• Social Media Platforms: for integration and analytics',
            ],
        },
        {
            title: 'Your Cookie Choices',
            content: [
                'You have the right to choose whether to accept or reject non-essential cookies. Most web browsers allow you to control cookies through their settings preferences.',
                'You can choose to disable cookies, but this may limit your ability to use certain features of the Service.',
                'You can also opt out of specific third-party cookies by visiting the privacy pages of these services.',
            ],
        },
        {
            title: 'How to Control Cookies',
            content: [
                'Most modern browsers allow you to reject cookies or alert you when a website is trying to place a cookie on your computer. How you do this varies from browser to browser:',
                '• Chrome: Visit chrome://settings/privacy/cookies',
                '• Safari: Preferences > Privacy > Cookies and website data',
                '• Firefox: Preferences > Privacy & Security > Cookies and Site Data',
                '• Edge: Settings > Privacy, search, and services > Clear browsing data',
            ],
        },
        {
            title: 'Contact Us',
            content: [
                'If you have any questions about our use of cookies, please contact us at:',
                'Email: privacy@resourcems.com',
                'Address: 123 Tech Street, San Francisco, CA 94105',
            ],
        },
    ];

    return (
        <>
            <Head title="Cookie Policy" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <PublicHeader variant="back" />

                {/* Content */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Cookie Policy</h1>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Last updated: {lastUpdated}</p>

                        <div className="mt-12 space-y-12">
                            {sections.map((section, index) => (
                                <div key={index}>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
                                    <div className="mt-4 space-y-3">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p
                                                key={pIndex}
                                                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
