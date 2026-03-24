import { SVGAttributes, useId } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const clipTopId = useId();
    const clipBottomId = useId();
    const { className, ...rest } = props;
    const sanitizedClassName = className
        ?.split(/\s+/)
        .filter((token) => token && token !== 'fill-current')
        .join(' ');

    return (
        <svg
            {...rest}
            className={sanitizedClassName}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={props['aria-label'] ?? 'ResourceMS'}
            role="img"
        >
            <defs>
                <clipPath id={clipTopId}>
                    <polygon points="0,0 488,0 0,488" />
                </clipPath>
                <clipPath id={clipBottomId}>
                    <polygon points="512,512 512,24 24,512" />
                </clipPath>
            </defs>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="220"
                fontWeight="700"
                clipPath={`url(#${clipTopId})`}
                fill="#ffffff"
            >
                RM
            </text>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="220"
                fontWeight="700"
                clipPath={`url(#${clipBottomId})`}
                fill="#16a34a"
            >
                RM
            </text>
        </svg>
    );
}
