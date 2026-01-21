import { Link } from '@inertiajs/react';
import { CheckCircle, Star } from 'lucide-react';
import { type PricingPlan } from '@/config/pricing';
import { register } from '@/routes';

export function PricingCard({ plan }: { plan: PricingPlan }) {
    const isExternal = plan.cta.type === 'external';
    
    // Determine button styles based on plan highlight
    const buttonStyles = plan.highlight
        ? "mt-8 block w-full rounded-lg bg-green-600 py-2 text-center font-medium text-white transition hover:bg-green-700"
        : "mt-8 block w-full rounded-lg border border-slate-300 bg-white py-2 text-center text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600";

    // Determine href (handle route helper vs direct link)
    const href = plan.cta.type === 'route' && plan.cta.href === 'register' 
        ? register().url 
        : plan.cta.href;

    const renderButton = () => {
        if (isExternal) {
            return (
                <a href={href} className={buttonStyles}>
                    {plan.cta.text}
                </a>
            );
        }
        return (
            <Link href={href} className={buttonStyles}>
                {plan.cta.text}
            </Link>
        );
    };

    return (
        <div className={`relative rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md ${
            plan.highlight 
                ? 'border-2 border-green-500 bg-gradient-to-br from-green-50 to-white shadow-2xl dark:from-green-900/20 dark:to-slate-900' 
                : 'border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700'
        }`}>
            {plan.highlight && (
                <div className="mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Most Popular</span>
                </div>
            )}
            <div className={plan.highlight ? "" : "mb-4"}>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>
            </div>
            <div className="mt-6">
                <span className="text-5xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-600 dark:text-slate-400"> {plan.period}</span>
            </div>

            {renderButton()}

            <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
