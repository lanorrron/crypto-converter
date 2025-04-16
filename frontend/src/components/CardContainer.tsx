import React, { FC, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const CardContainer: FC<Props> = ({ children, className = '', ...rest }) => {
    const classes = `bg-custom-card backdrop-blur-xl rounded-2xl p-8 border border-border shadow-cyan-soft  ${className}`.trim();
    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};

export default CardContainer;
