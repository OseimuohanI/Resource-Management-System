import { Head } from '@inertiajs/react';
import { Footer } from '@/components/Footer';
import { Calendar, User, ChevronRight, BarChart3, Rocket, FileText, Recycle, Target, Globe } from 'lucide-react';
import { PublicHeader } from '@/components/PublicHeader';

export default function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: '10 Best Practices for Resource Management',
            excerpt: 'Learn the proven strategies that top organizations use to optimize their resource allocation and reduce waste.',
            author: 'Sarah Chen',
            date: 'January 10, 2026',
            category: 'Best Practices',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: 'How to Reduce Resource Waste by 40%',
            excerpt: 'Discover actionable techniques to minimize resource waste and improve your bottom line significantly.',
            author: 'James Wilson',
            date: 'January 8, 2026',
            category: 'Optimization',
            readTime: '7 min read',
        },
        {
            id: 3,
            title: 'The Future of Resource Management',
            excerpt: 'Explore upcoming trends and technologies that will reshape how organizations manage their resources.',
            author: 'Emily Rodriguez',
            date: 'January 5, 2026',
            category: 'Trends',
            readTime: '6 min read',
        },
        {
            id: 4,
            title: 'Case Study: 50% Efficiency Gain in 3 Months',
            excerpt: 'See how a Fortune 500 company achieved remarkable results with their resource management strategy.',
            author: 'Michael Brown',
            date: 'December 28, 2025',
            category: 'Case Studies',
            readTime: '8 min read',
        },
        {
            id: 5,
            title: 'Resource Allocation Strategies for Remote Teams',
            excerpt: 'Best practices for managing resources across distributed teams and time zones effectively.',
            author: 'Lisa Anderson',
            date: 'December 20, 2025',
            category: 'Remote Work',
            readTime: '6 min read',
        },
        {
            id: 6,
            title: 'Integrating ResourceMS with Your Workflow',
            excerpt: 'A comprehensive guide to setting up and integrating ResourceMS into your existing systems.',
            author: 'David Lee',
            date: 'December 15, 2025',
            category: 'Tutorials',
            readTime: '10 min read',
        },
    ];

    const categoryIcon = (category: string) => {
        switch (category) {
            case 'Best Practices':
                return BarChart3;
            case 'Optimization':
                return Recycle;
            case 'Trends':
                return Rocket;
            case 'Case Studies':
                return Target;
            case 'Remote Work':
                return Globe;
            case 'Tutorials':
                return FileText;
            default:
                return FileText;
        }
    };

    return (
        <>
            <Head title="Blog" />
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
                            ResourceMS Blog
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
                            Insights, tips, and best practices for optimizing your resource management.
                        </p>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="grid gap-8">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-8 hover:shadow-lg transition dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                            {(() => {
                                                const Icon = categoryIcon(post.category);
                                                return <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />;
                                            })()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-6 mb-3">
                                                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                                                    {post.category}
                                                </span>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">{post.readTime}</span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
                                                {post.title}
                                            </h2>
                                            <p className="mt-3 text-slate-600 dark:text-slate-400">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {post.date}
                                                </div>
                                            </div>
                                            <button className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition">
                                                Read More
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                                ← Previous
                            </button>
                            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                1
                            </button>
                            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                                2
                            </button>
                            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                                Next →
                            </button>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="border-t border-slate-200 bg-white px-4 py-20 dark:border-slate-700 dark:bg-slate-800 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">
                            Get the latest tips, insights, and best practices delivered to your inbox.
                        </p>
                        <form className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
