import React, { HTMLProps } from "react";

interface ErrorProps extends HTMLProps<HTMLDivElement> {}

const Error = ({ children, ...props }: ErrorProps) => {
    return (
        <div
            style={{
                color: "#f23838",
                textAlign: "center",
                margin: "0.5rem 0",
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Error;
