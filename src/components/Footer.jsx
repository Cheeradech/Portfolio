import React from 'react';

const Footer = () => {
    return (
        <footer className="relative z-10 py-12 border-t border-white/5 bg-background-dark">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center gap-2">
                <p className="text-slate-500 text-sm font-light">© 2024 Cheeradech Makcharoen.</p>
                <p className="text-slate-600 text-xs">All rights reserved. Designed with precision.</p>
            </div>
        </footer>
    );
};

export default Footer;
