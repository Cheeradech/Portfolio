import React from 'react';

const CountryFlag = ({ country, className = "" }) => {
    if (country === 'en') {
        return (
            <svg
                viewBox="0 0 60 30"
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="60" height="30" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </svg>
        );
    }

    if (country === 'th') {
        return (
            <svg
                viewBox="0 0 60 36"
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Red - ratio 1 */}
                <rect fill="#A51931" width="60" height="36" />
                {/* White - ratio 1+2+1 */}
                <rect fill="#FFFFFF" y="6" width="60" height="24" />
                {/* Blue - ratio 2 */}
                <rect fill="#2D2A4A" y="12" width="60" height="12" />
            </svg>
        );
    }

    return null;
};

export default CountryFlag;
