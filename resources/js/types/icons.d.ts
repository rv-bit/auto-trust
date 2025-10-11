import React from 'react';

export const SIDE = {
    right: 'rotate-0',
    down: 'rotate-90',
    left: 'rotate-180',
    up: 'rotate-270',
};

// For normal Icons
export type IconProps = React.SVGProps<SVGSVGElement>;
export type InternalIcon = React.ForwardRefExoticComponent<
    Omit<IconProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

export interface IconWithSideProps extends IconProps {
    side?: keyof typeof SIDE;
}

// For Gradient Style Icons
export interface IIconProps {
    className?: string;
    hasGradient?: boolean;
    stops?: Array<{
        offset?: number;
        color: string;
        opacity?: number;
    }>;
    rotateGradient?: number;
}

export interface IIconPropsExtended extends IIconParentProps {
    pathProps?: {
        fill: string;
        fillOpacity: number;
    };
}

interface IIconParentProps extends IIconProps {
    sourceSvgWidth?: number;
    sourceSvgHeight?: number;
    children?: React.ReactNode;
}
