"use client";

import { ArrowLeft, Globe, Instagram } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

export default function AboutPage() {
    const { lang, t, toggleLanguage } = useLanguage();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 sm:px-12 font-sans selection:bg-primary selection:text-primary-foreground">

            {/* Navbar */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-5xl flex justify-between items-center mb-16 brutal-border brutal-shadow bg-card px-4 sm:px-6 py-4"
            >
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="brutal-button bg-white h-10 w-10">
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase hidden sm:block">{t.title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={toggleLanguage}
                        className="brutal-button !bg-green-400 hover:!bg-green-300 px-4 py-2 text-black text-xs sm:text-sm h-auto flex items-center gap-2"
                    >
                        <Globe size={16} />
                        {lang === "en" ? "ID" : "EN"}
                    </Button>
                </div>
            </motion.header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-3xl flex flex-col gap-12"
            >
                <div>
                    <motion.div variants={itemVariants} className="inline-block brutal-border bg-accent px-4 py-1 w-max rotate-[-2deg] mb-4 font-bold uppercase tracking-tight text-sm sm:text-base">
                        {t.aboutPage.mission}
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl sm:text-6xl font-black uppercase leading-[1.1] tracking-tighter mb-8">
                        {t.aboutPage.headline}
                    </motion.h2>
                </div>

                <div className="prose prose-lg sm:prose-xl max-w-none font-medium leading-relaxed space-y-6 text-foreground">
                    <motion.p variants={itemVariants}>{t.aboutPage.p1}</motion.p>
                    <motion.p variants={itemVariants} className="p-4 sm:p-6 bg-primary brutal-border brutal-shadow font-bold text-xl sm:text-2xl italic">
                        "{t.aboutPage.p2}"
                    </motion.p>
                    <motion.p variants={itemVariants}>{t.aboutPage.p3}</motion.p>
                </div>

                <motion.div variants={itemVariants} className="mt-8 p-6 bg-secondary text-white brutal-border brutal-shadow">
                    <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                        <Globe className="animate-pulse" /> {t.aboutPage.openSourceTitle}
                    </h3>
                    <p className="font-bold text-lg">{t.aboutPage.openSourceText}</p>
                </motion.div>
            </motion.main>

            {/* Footer */}
            <motion.footer
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl mt-24 mb-12 brutal-border brutal-shadow bg-foreground text-background p-6 sm:p-8 font-mono"
            >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <p className="font-bold text-lg sm:text-xl uppercase">{t.title}</p>
                    <p className="font-bold">Built by Kevin</p>
                    <a
                        href="https://instagram.com/kevinmahardyan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-bold hover:text-accent transition-colors transition-transform hover:scale-105 active:scale-95"
                    >
                        <Instagram size={20} />
                        @kevinmahardyan
                    </a>
                </div>
            </motion.footer>
        </div>
    );
}
