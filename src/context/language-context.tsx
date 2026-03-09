"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: typeof translations.en;
    toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default to 'id' as per user request
    const [lang, setLangState] = useState<Language>("id");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedLang = localStorage.getItem("civic-lens-lang") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "id")) {
            setLangState(savedLang);
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem("civic-lens-lang", newLang);
    };

    const toggleLanguage = () => {
        const newLang = lang === "en" ? "id" : "en";
        setLang(newLang);
    };

    const t = translations[lang];

    // Avoid hydration mismatch by only rendering children after mount if needed, 
    // but here we just provide the value. The pages will use the state.
    return (
        <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
