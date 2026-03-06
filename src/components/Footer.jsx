import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Footer = () => {
    const { lang } = useLanguage();
    const t = translations[lang].footer;
    return (
        <footer className="relative z-10 py-12 border-t border-white/5 bg-background-dark">
            <div className="max-w-300 mx-auto px-6 flex flex-col items-center text-center gap-2">
                <p className="text-slate-500 text-sm font-light">© 2024 Cheeradech Makcharoen.</p>
                <p className="text-slate-600 text-xs">{t.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
