import { Head, Link } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';
import { useEffect } from 'react';
import { register } from '@/routes';
import { Shield, Lock, Server, Eye, Key, FileCheck, Globe, UserCheck } from 'lucide-react';

export default function Security() {
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

    const securityFeatures = [
        {
            title: "Data Encryption",
            description: "Your data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption standards.",
            icon: Lock
        },
        {
            title: "Access Control",
            description: "Granular role-based access control (RBAC) ensures users only see what they need to see.",
            icon: Key
        },
        {
            title: "Compliance",
            description: "We adhere to SOC 2 Type II, GDPR, and CCPA standards to ensure your data is handled responsibly.",
            icon: FileCheck
        },
        {
            title: "Infrastructure",
            description: "Hosted on secure AWS cloud infrastructure with 99.9% uptime guarantee and automated backups.",
            icon: Server
        },
        {
            title: "Monitoring",
            description: "24/7 automated threat detection and real-time monitoring of all system activities.",
            icon: Eye
        },
        {
            title: "Authentication",
            description: "Support for Multi-Factor Authentication (MFA) and Single Sign-On (SSO) via SAML/OIDC.",
            icon: UserCheck
        }
    ];

    return (
        <>
            <Head title="Security" />
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
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900">
                            <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                            Enterprise-Grade Security
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Security isn't just a feature—it's our foundation. We protect your data with the same level of security used by top financial institutions.
                        </p>
                    </div>
                </section>

                {/* Main Features Grid */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {securityFeatures.map((feature, index) => (
                                <div 
                                    key={feature.title} 
                                    className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800 animate-on-scroll"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                        <feature.icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
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

                {/* Compliance Badges */}
                <section className="border-y border-slate-200 bg-white px-4 py-16 dark:border-slate-700 dark:bg-slate-900 animate-on-scroll">
                    <div className="mx-auto max-w-7xl text-center">
                        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Compliant with global standards
                        </p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale transition-all hover:grayscale-0">
                            {/* Simple placeholders for compliance logos - in a real app these would be SVGs/Images */}
                            <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                                <Shield className="h-8 w-8" /> SOC 2
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                                <Globe className="h-8 w-8" /> GDPR
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                                <FileCheck className="h-8 w-8" /> ISO 27001
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                                <Lock className="h-8 w-8" /> HIPAA
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Sections */}
                <section className="px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl space-y-24">
                        {/* Section 1 */}
                        <div className="grid gap-12 lg:grid-cols-2 items-center animate-on-scroll">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    Secure by Design
                                </h2>
                                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                    Our security architecture is built on the principle of defense in depth. Multiple layers of security controls protect your data at every level of our infrastructure.
                                </p>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        Network isolation via VPCs
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        Regular penetration testing
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        Automated vulnerability scanning
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl bg-slate-100 p-8 dark:bg-slate-800">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-slate-700">
                                        <span className="font-mono text-sm text-slate-500 dark:text-slate-400">Encryption Status</span>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-slate-700">
                                        <span className="font-mono text-sm text-slate-500 dark:text-slate-400">Firewall Rules</span>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">Updated</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-slate-700">
                                        <span className="font-mono text-sm text-slate-500 dark:text-slate-400">Threat Detection</span>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">Monitoring</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
