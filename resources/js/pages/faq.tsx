import { ChevronDown } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Footer } from '@/components/Footer';
import { PublicHeader } from '@/components/PublicHeader';

const faqCategories = [
    {
        title: 'Getting Started',
        items: [
            {
                question: 'What is ResourceMS?',
                answer: 'ResourceMS is a comprehensive resource management system designed to help organizations track, manage, and optimize their resources efficiently. It provides tools for inventory management, user management, and resource allocation.',
            },
            {
                question: 'How do I create an account?',
                answer: 'Click on the "Sign up" button on the homepage, enter your details, select a pricing plan, and you\'re ready to go! You\'ll get a 14-day free trial with all the features of the Professional plan.',
            },
            {
                question: 'Do I need a credit card to start the free trial?',
                answer: 'Yes, we require a credit card to start the trial, but we won\'t charge you until the trial period ends. You can cancel anytime before the trial ends with no charges.',
            },
            {
                question: 'Can I use the free plan indefinitely?',
                answer: 'Yes! The free plan is available forever with up to 50 resources. You can upgrade to a paid plan anytime to access more features.',
            },
        ],
    },
    {
        title: 'Billing & Pricing',
        items: [
            {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you\'ll be charged the difference immediately. If you downgrade, the change takes effect at the end of your current billing cycle.',
            },
            {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Payments are processed securely through our payment provider.',
            },
            {
                question: 'Do you offer annual billing discounts?',
                answer: 'Yes! Annual billing comes with 2 months free (equivalent to 16% discount). Contact our sales team for Enterprise custom pricing.',
            },
            {
                question: 'Is there a setup fee?',
                answer: 'No setup fees. Start using ResourceMS immediately after signing up. You only pay for the plan you choose.',
            },
            {
                question: 'Do you offer refunds?',
                answer: 'We offer a 14-day money-back guarantee on all plans. If you\'re not satisfied, contact our support team for a full refund.',
            },
            {
                question: 'Can I cancel my subscription?',
                answer: 'You can cancel your subscription at any time. Access continues until the end of your billing period. No questions asked.',
            },
        ],
    },
    {
        title: 'Features & Usage',
        items: [
            {
                question: 'What\'s the difference between the plans?',
                answer: 'The Free plan includes up to 50 resources and basic tracking. Professional adds up to 500 resources, team collaboration, analytics, and API access. Enterprise offers unlimited resources, advanced features, and dedicated support.',
            },
            {
                question: 'Can I invite team members?',
                answer: 'Yes! Free plan supports 1 user, Professional supports up to 5 team members, and Enterprise supports unlimited team members. Team members can be assigned different roles and permissions.',
            },
            {
                question: 'Is there an API?',
                answer: 'Yes, API access is available on Professional and Enterprise plans. This allows you to integrate ResourceMS with other tools and automate workflows.',
            },
            {
                question: 'How long is my data retained?',
                answer: 'Free plan retains 7 days of history, Professional retains 1 year, and Enterprise retains unlimited history. You can also export your data anytime.',
            },
            {
                question: 'Can I customize resource fields?',
                answer: 'Yes, custom resource fields are available on Professional and Enterprise plans. You can add custom fields to track additional information relevant to your resources.',
            },
        ],
    },
    {
        title: 'Account & Security',
        items: [
            {
                question: 'Is my data safe?',
                answer: 'Yes, we use industry-standard encryption (TLS 1.2+) for data in transit and AES-256 for data at rest. We also perform regular security audits and compliance checks.',
            },
            {
                question: 'Do you offer two-factor authentication?',
                answer: 'Yes, two-factor authentication (2FA) is available on all plans. You can enable it in your account settings for additional security.',
            },
            {
                question: 'Can I export my data?',
                answer: 'Yes, you can export all your resources and data as CSV or JSON format anytime. This is available on all plans.',
            },
            {
                question: 'What happens to my data if I cancel?',
                answer: 'Your data is retained for 30 days after cancellation. You can reactivate your account within this period to restore access. After 30 days, data is permanently deleted.',
            },
            {
                question: 'Can I change my email address?',
                answer: 'Yes, you can update your email address in account settings. You\'ll need to verify the new email address before the change takes effect.',
            },
        ],
    },
    {
        title: 'Technical Support',
        items: [
            {
                question: 'What support channels are available?',
                answer: 'All plans include email support. Professional plan includes priority email support, and Enterprise includes 24/7 phone and email support with a dedicated account manager.',
            },
            {
                question: 'What is your average response time?',
                answer: 'For email support, we respond within 24 hours. Professional plan users get priority support with 2-4 hour response times. Enterprise customers get 24/7 support.',
            },
            {
                question: 'Do you have documentation and tutorials?',
                answer: 'Yes, we have comprehensive documentation, video tutorials, and a knowledge base available in your account. Premium support also includes personalized onboarding.',
            },
            {
                question: 'Is there system status page?',
                answer: 'Yes, visit status.resourcems.com to check the system status and view historical uptime information.',
            },
        ],
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-slate-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
                <span className="font-semibold text-slate-900 dark:text-white">{question}</span>
                <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-slate-600 transition-transform dark:text-slate-400 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            {isOpen && <p className="pb-4 text-slate-600 dark:text-slate-400">{answer}</p>}
        </div>
    );
}

export default function FAQ() {
    return (
        <>
            <Head title="FAQ" />
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

                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <PublicHeader variant="auth" />

                {/* Hero */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-on-scroll">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                            Frequently Asked Questions
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Find answers to common questions about ResourceMS, pricing, features, and support.
                        </p>
                    </div>
                </section>

                {/* FAQ Sections */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        {faqCategories.map((category, categoryIndex) => (
                            <div key={category.title} className="animate-on-scroll mb-12">
                                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                                    {category.title}
                                </h2>
                                <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                                    {category.items.map((item, itemIndex) => (
                                        <FAQItem
                                            key={`${categoryIndex}-${itemIndex}`}
                                            question={item.question}
                                            answer={item.answer}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="animate-on-scroll border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-700 dark:bg-slate-800">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Still have questions?
                        </h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Can't find the answer you're looking for? Please contact our support team.
                        </p>
                        <a
                            href="mailto:info@resourcems.com"
                            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
                        >
                            Contact Support
                        </a>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
