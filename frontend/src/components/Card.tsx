import React, { FC, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const Card: FC<Props> = ({ children, className = '', ...rest }) => {
    const classes = `bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-border hover:border-ring transition-colors ${className}`.trim();


    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};

export default Card;
