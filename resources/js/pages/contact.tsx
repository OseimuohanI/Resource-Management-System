import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { PublicHeader } from '@/components/PublicHeader';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // In a real application, this would send the form to a backend
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', company: '', subject: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email',
            description: 'Our team responds within 2 hours',
            contact: 'info@resourcems.com',
            href: 'mailto:info@resourcems.com',
        },
        {
            icon: Phone,
            title: 'Phone',
            description: 'Available Monday to Friday, 9am-5pm EST',
            contact: '+1 (555) 123-4567',
            href: 'tel:+15551234567',
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Get instant answers during business hours',
            contact: 'Available in-app',
            href: '#',
        },
        {
            icon: MapPin,
            title: 'Office',
            description: 'Visit us in San Francisco',
            contact: '123 Tech Street, SF, CA 94105',
            href: '#',
        },
    ];

    return (
        <>
            <Head title="Contact Us" />
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
                            Get in Touch
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
                            Have questions? Our team is here to help. Contact us using any of the methods below.
                        </p>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {contactMethods.map((method, index) => {
                                const Icon = method.icon;
                                return (
                                    <a
                                        key={index}
                                        href={method.href}
                                        className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-6 hover:border-green-300 hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800 dark:hover:border-green-600"
                                    >
                                        <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{method.title}</h3>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{method.description}</p>
                                        <p className="mt-3 font-medium text-green-600 dark:text-green-400">{method.contact}</p>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl">
                        <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send us a Message</h2>
                            
                            {submitted && (
                                <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <p className="text-sm text-green-800 dark:text-green-300">
                                        Thank you! We've received your message and will get back to you within 24 hours.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 dark:text-white">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 dark:text-white">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 dark:text-white">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                                        placeholder="Your company"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 dark:text-white">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 dark:text-white">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                                        placeholder="Tell us more..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
