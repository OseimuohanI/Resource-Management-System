export interface PricingPlan {
    name: string;
    slug: string;
    description: string;
    price: string;
    period: string;
    highlight?: boolean;
    cta: {
        text: string;
        href: string;
        type: 'route' | 'external';
    };
    features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Free',
        slug: 'free',
        description: 'Perfect for getting started',
        price: '$0',
        period: 'Forever free',
        cta: {
            text: 'Get Started',
            href: 'register',
            type: 'route'
        },
        features: [
            'Up to 50 resources',
            'Single user account',
            'Basic resource tracking',
            'Email support',
            '7-day history retention'
        ]
    },
    {
        name: 'Professional',
        slug: 'professional',
        description: 'For growing teams',
        price: '$29',
        period: '/month',
        highlight: true,
        cta: {
            text: 'Start 14-Day Trial',
            href: 'register',
            type: 'route'
        },
        features: [
            'Up to 500 resources',
            'Up to 5 team members',
            'Advanced resource tracking',
            'Resource analytics & reports',
            '1-year history retention',
            'Priority email support',
            'API access',
            'Custom resource fields'
        ]
    },
    {
        name: 'Enterprise',
        slug: 'enterprise',
        description: 'For large organizations',
        price: '$99',
        period: '/month',
        cta: {
            text: 'Contact Sales',
            href: 'mailto:info@resourcems.com',
            type: 'external'
        },
        features: [
            'Unlimited resources',
            'Unlimited team members',
            'Advanced resource tracking',
            'Resource analytics & reports',
            'Unlimited history retention',
            '24/7 phone & email support',
            'Advanced API access',
            'Custom resource fields',
            'Role-based permissions',
            'Audit logging',
            'Custom integrations',
            'Dedicated account manager'
        ]
    }
];
