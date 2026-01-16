import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { MapPin, Briefcase, Users } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';

export default function Careers() {
    const openPositions = [
        {
            id: 1,
            title: 'Senior Full Stack Engineer',
            department: 'Engineering',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Senior (5+ years)',
            description: 'Lead the development of our core platform. Work with React, Laravel, and modern web technologies.',
        },
        {
            id: 2,
            title: 'Product Manager',
            department: 'Product',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Mid-level (3-5 years)',
            description: 'Shape the future of ResourceMS by leading product strategy and roadmap.',
        },
        {
            id: 3,
            title: 'Customer Success Manager',
            department: 'Customer Success',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid-level (2-4 years)',
            description: 'Help our customers succeed and achieve their goals with ResourceMS.',
        },
        {
            id: 4,
            title: 'DevOps Engineer',
            department: 'Infrastructure',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Mid-level (3-5 years)',
            description: 'Build and maintain our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.',
        },
        {
            id: 5,
            title: 'UX/UI Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid-level (3-5 years)',
            description: 'Design beautiful and intuitive user interfaces. Portfolio required.',
        },
        {
            id: 6,
            title: 'Sales Development Representative',
            department: 'Sales',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Entry-level',
            description: 'Generate new business opportunities and build relationships with prospects.',
        },
    ];

    const benefits = [
        { icon: '💰', title: 'Competitive Salary', description: 'Industry-competitive compensation packages' },
        { icon: '🏥', title: 'Health Insurance', description: 'Comprehensive health, dental, and vision coverage' },
        { icon: '🏠', title: 'Remote Work', description: 'Flexible work arrangements and remote options' },
        { icon: '📚', title: 'Learning Budget', description: '$2,000 annual learning and development budget' },
        { icon: '⏱️', title: 'Flexible Hours', description: 'Flexible work hours and PTO policy' },
        { icon: '🎯', title: 'Equity', description: 'Stock options for all full-time employees' },
    ];

    return (
        <>
            <Head title="Careers" />
            <style>{`
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                
                .animate-on-scroll.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <PublicHeader variant="back" />

                {/* Hero */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                            Join Our Team
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
                            Help us revolutionize resource management. We're looking for talented people who are passionate about solving real problems.
                        </p>
                    </div>
                </section>

                {/* Why Join */}
                <section className="border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-700 dark:bg-slate-800 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Why Join ResourceMS?</h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {benefits.map((benefit) => (
                                <div key={benefit.title} className="animate-on-scroll rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
                                    <div className="text-3xl">{benefit.icon}</div>
                                    <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{benefit.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Open Positions</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">
                            We're always looking for talented individuals to join our team. Check out our current openings below.
                        </p>

                        <div className="mt-8 space-y-4">
                            {openPositions.map((position) => (
                                <div
                                    key={position.id}
                                    className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                {position.title}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                                {position.department}
                                            </p>
                                            <p className="mt-3 text-slate-600 dark:text-slate-400">
                                                {position.description}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <MapPin className="h-4 w-4" />
                                                    {position.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Briefcase className="h-4 w-4" />
                                                    {position.type}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Users className="h-4 w-4" />
                                                    {position.experience}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="ml-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition whitespace-nowrap">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-700 dark:bg-slate-800 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Don't see your role?
                        </h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Send us your resume and let us know how you could contribute to ResourceMS.
                        </p>
                        <a
                            href="mailto:careers@resourcems.com"
                            className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 transition"
                        >
                            Send Resume
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
