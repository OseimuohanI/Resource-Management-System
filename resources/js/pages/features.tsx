import { Head, Link } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';
import { useEffect } from 'react';
import { register } from '@/routes';
import { BarChart3, Users, Shield, Zap, Database, Smartphone, Clock, Settings, Search, FileText, Bell, Layers } from 'lucide-react';

export default function Features() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            title: "Resource Tracking",
            description: "Real-time monitoring of all your assets. Track location, status, and usage history effortlessly.",
            icon: Database,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
        },
        {
            title: "Team Management",
            description: "Organize your team with role-based permissions. Assign resources and track accountability.",
            icon: Users,
            color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
        },
        {
            title: "Advanced Analytics",
            description: "Gain insights with detailed reports. Visualize usage patterns and optimize allocation.",
            icon: BarChart3,
            color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
        },
        {
            title: "Enterprise Security",
            description: "Bank-grade encryption and security protocols to keep your sensitive data protected.",
            icon: Shield,
            color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400"
        },
        {
            title: "Instant Search",
            description: "Find any resource instantly with our powerful search and filtering capabilities.",
            icon: Search,
            color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400"
        },
        {
            title: "Mobile Accessible",
            description: "Manage resources on the go. Fully responsive design works perfectly on all devices.",
            icon: Smartphone,
            color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400"
        },
        {
            title: "Smart Automation",
            description: "Automate routine tasks like maintenance scheduling and check-in/check-out processes.",
            icon: Zap,
            color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
        },
        {
            title: "Availability Calendar",
            description: "Visual timeline view to check resource availability and schedule future bookings.",
            icon: Clock,
            color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-400"
        },
        {
            title: "Custom Fields",
            description: "Tailor the system to your needs. Add custom attributes to any resource type.",
            icon: Settings,
            color: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-400"
        },
        {
            title: "Document Storage",
            description: "Attach manuals, warranties, and invoices directly to resource records.",
            icon: FileText,
            color: "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-400"
        },
        {
            title: "Smart Notifications",
            description: "Get alerted for low stock, maintenance due dates, and overdue returns.",
            icon: Bell,
            color: "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400"
        },
        {
            title: "Multi-Location",
            description: "Manage resources across multiple offices, warehouses, or campuses from one dashboard.",
            icon: Layers,
            color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
        }
    ];

    return (
        <>
            <Head title="Features" />
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
                <PublicHeader variant="auth" />

                {/* Hero Section */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-on-scroll">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                            Everything you need to manage resources
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            A complete suite of tools designed to streamline your operations and boost productivity.
                        </p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div 
                                    key={feature.title} 
                                    className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800 animate-on-scroll"
                                    style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                                >
                                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}>
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Integration Section */}
                <section className="border-t border-slate-200 bg-white px-4 py-24 dark:border-slate-700 dark:bg-slate-900 animate-on-scroll">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    Integrates with your favorite tools
                                </h2>
                                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                    Connect ResourceMS with the tools you already use. Our robust API and pre-built integrations ensure seamless data flow across your stack.
                                </p>
                                <ul className="mt-8 space-y-4">
                                    {['Slack Notifications', 'Google Calendar Sync', 'Single Sign-On (SSO)', 'Excel/CSV Export', 'Custom Webhooks'].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative rounded-2xl bg-slate-100 p-8 dark:bg-slate-800">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-2xl" />
                                <div className="grid grid-cols-2 gap-4 relative">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-video rounded-lg bg-white shadow-sm dark:bg-slate-700 animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-br from-green-600 to-green-700 px-4 py-20 text-center text-white animate-on-scroll">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
                        <p className="mt-4 text-lg text-green-50">
                            Join thousands of teams managing their resources better.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                href={register().url}
                                className="rounded-lg bg-white px-8 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                            >
                                Start Free Trial
                            </Link>
                            <a
                                href="mailto:sales@resourcems.com"
                                className="rounded-lg border border-green-400 bg-transparent px-8 py-3 font-semibold text-white transition hover:bg-green-500"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
