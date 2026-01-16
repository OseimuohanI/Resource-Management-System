import { CheckCircle, Star } from 'lucide-react';

interface PricingSelectionProps {
    selectedPlan: string;
    onSelectPlan: (plan: string) => void;
}

export default function PricingSelection({ selectedPlan, onSelectPlan }: PricingSelectionProps) {
    const plans = [
        {
            id: 'free',
            name: 'Free',
            description: 'Perfect for getting started',
            price: '$0',
            period: 'Forever free',
            features: ['Up to 50 resources', 'Single user account', 'Basic resource tracking', 'Email support'],
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'For growing teams',
            price: '$29',
            period: '/month',
            features: ['Up to 500 resources', 'Up to 5 team members', 'Advanced resource tracking', 'API access', 'Priority support'],
            highlighted: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'For large organizations',
            price: 'Custom',
            period: 'Contact sales',
            features: ['Unlimited resources', 'Unlimited team members', 'Advanced features', '24/7 support', 'Dedicated manager'],
        },
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Choose Your Plan
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    All plans include a 14-day free trial. Upgrade anytime.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                    <button
                        key={plan.id}
                        onClick={() => onSelectPlan(plan.id)}
                        className={`relative rounded-lg border-2 p-6 text-left transition-all ${
                            selectedPlan === plan.id
                                ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600'
                        }`}
                    >
                        {plan.highlighted && (
                            <div className="mb-4 flex items-center gap-2">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Most Popular</span>
                            </div>
                        )}

                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>
                            </div>
                            {selectedPlan === plan.id && (
                                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            )}
                        </div>

                        <div className="my-4">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400"> {plan.period}</span>
                        </div>

                        <ul className="space-y-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </button>
                ))}
            </div>
        </div>
    );
}
