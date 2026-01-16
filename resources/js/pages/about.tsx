import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { Users, Lightbulb, Target, Award } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';

export default function About() {
    const teamMembers = [
        {
            name: 'Alice Johnson',
            role: 'Founder & CEO',
            description: 'With 15+ years in resource management, Alice founded ResourceMS to solve real-world challenges.',
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            description: 'Tech visionary with expertise in cloud infrastructure and scalable systems.',
        },
        {
            name: 'Sarah Williams',
            role: 'VP of Product',
            description: 'Customer-focused leader dedicated to building products that solve real problems.',
        },
        {
            name: 'James Martinez',
            role: 'VP of Engineering',
            description: 'Passionate about code quality and building teams that ship great products.',
        },
    ];

    const values = [
        {
            icon: Target,
            title: 'Customer First',
            description: 'We prioritize our customers\' success above all else. Their feedback drives our roadmap.',
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'We constantly push the boundaries of what\'s possible in resource management.',
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'We deliver high-quality products and services that exceed expectations.',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'We build a supportive community where users learn from and help each other.',
        },
    ];

    return (
        <>
            <Head title="About Us" />
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

                {/* Hero Section */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                            About ResourceMS
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
                            We're on a mission to revolutionize how organizations manage their resources. Built by resource management experts, for resource management experts.
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
                        <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-400">
                            <p>
                                ResourceMS was founded in 2023 by a team of resource management professionals who were frustrated with outdated, complicated systems. We believed there had to be a better way to track, manage, and optimize organizational resources.
                            </p>
                            <p>
                                After years of working with legacy systems and spreadsheets, we decided to build something better. ResourceMS was born from the idea that resource management should be simple, intuitive, and powerful enough for enterprises while remaining accessible to small teams.
                            </p>
                            <p>
                                Today, ResourceMS helps hundreds of organizations worldwide streamline their operations, reduce costs, and make smarter decisions about resource allocation. We're just getting started.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-700 dark:bg-slate-800 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Our Values</h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <div key={index} className="animate-on-scroll rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
                                        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{value.title}</h3>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{value.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Leadership Team</h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{member.role}</p>
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{member.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-700 dark:bg-slate-800 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Active Organizations</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Users Worldwide</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Uptime SLA</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Customer Support</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Ready to Join Thousands of Happy Users?
                        </h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Start your 14-day free trial today. No credit card required.
                        </p>
                        <Link
                            href="/pricing"
                            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
