import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const workItems = [
    { title: 'Alpha Stream', category: 'FinTech / Real-time', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz3vAKSjIvI_CsUX32bmR_cIr6QDLzlO3civ6WHvsinCI58jjXygaaF4d7JTSzNKVfHmnjG6Fwguy9fBVLC5eaxJjDCn8MWcwx0d70SbV883ES99ilZQGmmxYFhBFJLeCtrc_hUn2v1wLSrLXtFVqFbI1rp3YJ7n7V5WrN31jOgQd4OVjUv9ludVRkFfyxEucpx3nvz8PyMzbiuJoUQfSvHiXJAeRG8tVVoA35zZWiUiFjvWUTNBxDxmtkZxzpE-xvILyg0OJbtyE", alt: "Abstract blue data visualization dashboard interface" },
    { title: 'Nebula Cloud', category: 'Infrastructure / SaaS', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiL1Jmn0Y6Y6jgt99aJ9WLFIHXnq7K4-HUDxXdyA2PqTh1o5bZCrrnMVB0lFzwEAsP-Bv6T9xi7jlbSVIKpr2_oJqqauKpQRhP_YZDUayOK0lJ2ji_fHbITYxLr0LlhkKHXTwQaCNAfpWmxMqJ1KF5yKR56Vs9WFXWPVw3EGotX8lyQxdMl8R9K4HlnThwDiBi5SZQdTeenWuQwe5CjbGpFA8PMfpzU8WVVsFztETfS-xjAwD4-A2W4KB2J6R69xrc8O27dUnyrEc", alt: "Clean white server room with blue lighting" },
    { title: 'Cognito AI', category: 'Machine Learning / Health', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsSHsUbkJUWdg-MDImz_KZH--e_pmILHujys5Fgwk8SEyuHoc2emQ6brjphUsTav8NwKCgbC2iddcmBA0ipaZDWS9s4yj41Gz6gwWlV6omYhxytBlcC7H3s3iWutOYuCufhVxUTkGA9ShgRLxkc3Rjmqc_kJBUWZg482BHNYYwEjzIF5SfvjvRzcmalNs7xG9HFa_GGsahdy5XIdmQLOri4WSDCnxcV6zCios-UBi6dd549RB-UBxn7eDtKJ8sCjtBMWzJsNC3jSQ", alt: "Futuristic digital brain AI concept" },
];

const PortfolioWorks = () => {
    const { lang } = useLanguage();
    const t = translations[lang].works;
    const descriptions = t.descriptions;

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 relative z-10 bg-background-dark scroll-mt-24" id="works">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-20 flex flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">{t.title}</h2>
                    <div className="h-[1px] w-24 bg-primary"></div>
                    <p className="text-slate-400 max-w-lg">{t.subtitle}</p>
                </div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workItems.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={{ hidden: { opacity: 0, scale: 0.9, y: 30 }, show: { opacity: 1, scale: 1, y: 0 } }}
                            className="group bg-background-dark border border-white/5 overflow-hidden relative">
                            <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                                <img alt={item.alt} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" src={item.img} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                            </div>
                            <div className="p-8 absolute bottom-0 left-0 w-full">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-primary font-mono uppercase tracking-widest mb-4">{item.category}</p>
                                <p className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    {descriptions[i]}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default PortfolioWorks;
