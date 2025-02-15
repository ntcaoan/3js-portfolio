import React from "react";
import clsx from "clsx";

type BoundedProps<T extends React.ElementType = "section"> = {
    as?: T;
    className?: string;
    children?: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
    ({ as: Comp = "section", className, children, ...restProps }, ref) => {
        return (
            <Comp
                ref={ref}
                className={clsx("px-6 py-10 md:px-7 md:py-14 lg:py-16", className)}
                {...restProps}
            >
                <div className="mx-auto w-full max-w-6xl">{children}</div>
            </Comp>
        );
    }
);

Bounded.displayName = "Bounded"

export default Bounded
