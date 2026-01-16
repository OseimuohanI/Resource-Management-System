import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';

export default function Privacy() {
    const lastUpdated = 'January 14, 2026';

    const sections = [
        {
            title: 'Introduction',
            content: [
                'ResourceMS ("Company", "we", "our", or "us") operates the ResourceMS website and the ResourceMS application (the "Service").',
                'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
                'We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.',
            ],
        },
        {
            title: 'Information Collection and Use',
            content: [
                'We collect several different types of information for various purposes to provide and improve our Service to you.',
                'Types of Data Collected:',
                '• Account Information: name, email address, password, and any other information you provide during registration',
                '• Usage Data: information about how you access and use the Service, including IP address, browser type, pages visited, and time spent',
                '• Cookies and Similar Technologies: We use cookies and similar tracking technologies to track activity on our Service',
                '• Device Information: information about the device you use to access our Service, including model, operating system, and browser information',
            ],
        },
        {
            title: 'Use of Data',
            content: [
                'ResourceMS uses the collected data for various purposes:',
                '• To provide and maintain the Service',
                '• To notify you about changes to our Service',
                '• To allow you to participate in interactive features of our Service',
                '• To provide customer support',
                '• To gather analysis or valuable information so that we can improve the Service',
                '• To monitor the usage of the Service',
                '• To detect, prevent and address technical issues',
            ],
        },
        {
            title: 'Security of Data',
            content: [
                'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.',
                'While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.',
                'We implement industry-standard encryption (TLS 1.2+) for data in transit and AES-256 encryption for data at rest.',
            ],
        },
        {
            title: 'Changes to This Privacy Policy',
            content: [
                'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.',
                'You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.',
            ],
        },
        {
            title: 'Contact Us',
            content: [
                'If you have any questions about this Privacy Policy, please contact us at:',
                'Email: privacy@resourcems.com',
                'Address: 123 Tech Street, San Francisco, CA 94105',
            ],
        },
    ];

    return (
        <>
            <Head title="Privacy Policy" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <PublicHeader variant="back" />

                {/* Content */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
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
