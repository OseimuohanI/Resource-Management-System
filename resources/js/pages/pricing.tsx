import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';
import { PricingCard } from '@/components/PricingCard';
import { PRICING_PLANS } from '@/config/pricing';

export default function Pricing() {
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
                    transition-delay: 0.1s;
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
                            {PRICING_PLANS.map((plan, index) => (
                                <div 
                                    key={plan.slug} 
                                    className="animate-on-scroll" 
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <PricingCard plan={plan} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
