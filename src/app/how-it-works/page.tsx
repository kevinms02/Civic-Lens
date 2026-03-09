"use client";

import { ArrowLeft, FileText, Cpu, CheckCircle2, Globe, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

export default function HowItWorksPage() {
    const { lang, t, toggleLanguage } = useLanguage();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Time between each child animation
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
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
                className="w-full max-w-5xl flex flex-col gap-12"
            >
                <motion.h2 variants={itemVariants} className="text-4xl sm:text-6xl font-black uppercase leading-[1.1] tracking-tighter text-center mb-4">
                    {t.howItWorksPage.headline}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-start pt-8 pb-32">
                    {/* Step 1 */}
                    <motion.div variants={itemVariants} className="md:mt-0">
                        <Card className="brutal-card rounded-none h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                                <FileText size={120} />
                            </div>
                            <CardHeader className="bg-primary border-b-4 border-border relative z-10">
                                <CardTitle className="text-2xl font-black uppercase">
                                    {t.howItWorksPage.step1Title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 relative z-10">
                                <p className="font-medium text-lg leading-relaxed">
                                    {t.howItWorksPage.step1Desc}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div variants={itemVariants} className="md:mt-12">
                        <Card className="brutal-card rounded-none h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                                <Cpu size={120} />
                            </div>
                            <CardHeader className="bg-secondary text-white border-b-4 border-border relative z-10">
                                <CardTitle className="text-2xl font-black uppercase">
                                    {t.howItWorksPage.step2Title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 relative z-10">
                                <p className="font-medium text-lg leading-relaxed">
                                    {t.howItWorksPage.step2Desc}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div variants={itemVariants} className="md:mt-24">
                        <Card className="brutal-card rounded-none h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                                <CheckCircle2 size={120} />
                            </div>
                            <CardHeader className="bg-accent border-b-4 border-border relative z-10">
                                <CardTitle className="text-2xl font-black uppercase">
                                    {t.howItWorksPage.step3Title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 relative z-10">
                                <p className="font-medium text-lg leading-relaxed">
                                    {t.howItWorksPage.step3Desc}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
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
