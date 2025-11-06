import { JSX } from "react";

const LoadingBarComponent = (): JSX.Element => {
    return (
        <div className="relative h-1 w-full bg-gray-700 overflow-hidden rounded">
            <div className="absolute h-full w-1/3 bg-blue-500 animate-loading-bar"></div>
        </div>
    );
};

export default LoadingBarComponent;
