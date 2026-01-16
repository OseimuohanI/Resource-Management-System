import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';

export default function Terms() {
    const lastUpdated = 'January 14, 2026';

    const sections = [
        {
            title: 'Agreement to Terms',
            content: [
                'These Terms of Service ("Terms") constitute a legally binding agreement between you and ResourceMS ("Company", "we", "our", or "us").',
                'By accessing and using this Service, you accept and agree to be bound by and comply with these Terms. If you do not agree to abide by the above, please do not use this service.',
            ],
        },
        {
            title: 'Use License',
            content: [
                'Permission is granted to temporarily download one copy of the materials (information or software) on ResourceMS\'s Service for personal, non-commercial transitory viewing only.',
                'This is the grant of a license, not a transfer of title, and under this license you may not:',
                '• Modifying or copying the materials',
                '• Using the materials for any commercial purpose or for any public display',
                '• Attempting to decompile or reverse engineer any software contained on the Service',
                '• Removing any copyright or other proprietary notations from the materials',
                '• Transferring the materials to another person or "mirroring" the materials on any other server',
            ],
        },
        {
            title: 'Disclaimer',
            content: [
                'The materials on ResourceMS\'s Service are provided on an \'as is\' basis. ResourceMS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
                'Further, ResourceMS does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Service relating to such materials or on any sites linked to this Service.',
            ],
        },
        {
            title: 'Limitations',
            content: [
                'In no event shall ResourceMS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Service, even if ResourceMS or an authorized representative has been notified orally or in writing of the possibility of such damage.',
            ],
        },
        {
            title: 'Accuracy of Materials',
            content: [
                'The materials appearing on ResourceMS\'s Service could include technical, typographical, or photographic errors. ResourceMS does not warrant that any of the materials on the Service are accurate, complete, or current.',
                'ResourceMS may make changes to the materials contained on the Service at any time without notice. However, ResourceMS does not commit to updating the materials.',
            ],
        },
        {
            title: 'Links',
            content: [
                'ResourceMS has not reviewed all of the sites linked to its Service and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ResourceMS of the site. Use of any such linked website is at the user\'s own risk.',
            ],
        },
        {
            title: 'Modifications',
            content: [
                'ResourceMS may revise these Terms of Service for the Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these Terms of Service.',
            ],
        },
        {
            title: 'Governing Law',
            content: [
                'These Terms and Conditions are governed by and construed in accordance with the laws of the State of California, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
            ],
        },
    ];

    return (
        <>
            <Head title="Terms of Service" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <PublicHeader variant="back" />

                {/* Content */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
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
