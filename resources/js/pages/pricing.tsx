import { Link } from '@inertiajs/react';
import { CheckCircle, Star } from 'lucide-react';
import { register } from '@/routes';
import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';

export default function Pricing() {
    return (
        <>
            <Head title="Pricing" />
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

                {/* Pricing Section */}
                <section className="bg-slate-50 dark:bg-slate-800 px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center animate-on-scroll mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                Choose the plan that fits your needs. All plans include a 14-day free trial.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Free Plan */}
                            <div className="animate-on-scroll rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Free</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Perfect for getting started</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">$0</span>
                                    <span className="text-slate-600 dark:text-slate-400"> Forever free</span>
                                </div>
                                <Link
                                    href={register().url}
                                    className="mt-8 block w-full rounded-lg border border-slate-300 bg-white py-2 text-center text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                                >
                                    Get Started
                                </Link>
                                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    {['Up to 50 resources', 'Single user account', 'Basic resource tracking', 'Email support', '7-day history retention'].map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Professional Plan - Featured */}
                            <div className="animate-on-scroll relative rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white p-8 shadow-2xl dark:from-blue-900/20 dark:to-slate-900">
                                <div className="mb-4 flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Most Popular</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Professional</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For growing teams</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">$29</span>
                                    <span className="text-slate-600 dark:text-slate-400"> /month</span>
                                </div>
                                <Link
                                    href={register().url}
                                    className="mt-8 block w-full rounded-lg bg-blue-600 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                                >
                                    Start 14-Day Trial
                                </Link>
                                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    {['Up to 500 resources', 'Up to 5 team members', 'Advanced resource tracking', 'Resource analytics & reports', '1-year history retention', 'Priority email support', 'API access', 'Custom resource fields'].map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enterprise Plan */}
                            <div className="animate-on-scroll rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For large organizations</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">$99</span>
                                    <span className="text-slate-600 dark:text-slate-400"> /month</span>
                                </div>
                                <a
                                    href="mailto:info@resourcems.com"
                                    className="mt-8 block w-full rounded-lg border border-slate-300 bg-white py-2 text-center text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                                >
                                    Contact Sales
                                </a>
                                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    {['Unlimited resources', 'Unlimited team members', 'Advanced resource tracking', 'Resource analytics & reports', 'Unlimited history retention', '24/7 phone & email support', 'Advanced API access', 'Custom resource fields', 'Role-based permissions', 'Audit logging', 'Custom integrations', 'Dedicated account manager'].map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
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
