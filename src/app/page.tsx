"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UploadCloud, Search, AlertCircle, Menu, Globe, Instagram, Loader2, ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { motion, AnimatePresence, Variants } from "framer-motion";

const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-6 mb-4 space-y-2 font-medium">{listItems}</ul>);
            listItems = [];
        }
    };

    const processText = (str: string, keyPrefix: string) => {
        const parts = str.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
                ? <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
                : part
        );
    };

    const headerColors = ['bg-primary', 'bg-accent', 'bg-secondary'];
    let headerColorIndex = 0;

    const getNextHeaderColor = () => {
        const color = headerColors[headerColorIndex];
        headerColorIndex = (headerColorIndex + 1) % headerColors.length;
        return color;
    };

    lines.forEach((line, idx) => {
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            listItems.push(<li key={`li-${idx}`}>{processText(line.trim().substring(2), `li-text-${idx}`)}</li>);
        } else {
            flushList();
            if (line.trim().startsWith('### ')) {
                elements.push(<h3 key={`h3-${idx}`} className="mt-6 mb-2"><span className={`text-lg font-black uppercase ${getNextHeaderColor()} px-2 brutal-border inline-block`}>{processText(line.replace('### ', ''), `h3-text-${idx}`)}</span></h3>);
            } else if (line.trim().startsWith('## ')) {
                elements.push(<h2 key={`h2-${idx}`} className="mt-8 mb-3"><span className={`text-xl font-black uppercase ${getNextHeaderColor()} px-2 brutal-border inline-block`}>{processText(line.replace('## ', ''), `h2-text-${idx}`)}</span></h2>);
            } else if (line.trim().startsWith('# ')) {
                elements.push(<h1 key={`h1-${idx}`} className="mt-8 mb-4"><span className={`text-2xl font-black uppercase ${getNextHeaderColor()} px-2 brutal-border inline-block`}>{processText(line.replace('# ', ''), `h1-text-${idx}`)}</span></h1>);
            } else if (line.trim() === '') {
                elements.push(<div key={`br-${idx}`} className="h-2" />);
            } else {
                elements.push(<p key={`p-${idx}`} className="mb-2 leading-relaxed">{processText(line, `p-text-${idx}`)}</p>);
            }
        }
    });

    flushList();
    return elements;
};

export default function Home() {
    const { lang, t, toggleLanguage } = useLanguage();
    const [jobType, setJobType] = useState<string>("");
    const [customJob, setCustomJob] = useState<string>("");
    const [policyText, setPolicyText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResult, setApiResult] = useState<any>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [activeCardTab, setActiveCardTab] = useState<'tldr' | 'detail'>('tldr');

    // Detail explanation states
    const [detailContent, setDetailContent] = useState<string>("");
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    // Error Modal State
    const [errorMsg, setErrorMsg] = useState<string>("");

    // File upload state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pdfExtractedText, setPdfExtractedText] = useState<string>(""); // Cache for extracted PDF text
    const [isDragging, setIsDragging] = useState(false);

    const handleTranslate = async () => {
        if (!policyText.trim() && !selectedFile) return;

        setIsLoading(true);
        setApiResult(null);
        setShowResult(true);
        setDetailContent("");
        setActiveCardTab('tldr');

        try {
            let finalOutputText = policyText;

            // Client-side PDF Extraction
            if (selectedFile) {
                if (!pdfExtractedText) {
                    // Dynamically import pdfjs-dist only on the client-side
                    const pdfjsLib = await import('pdfjs-dist');
                    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

                    const arrayBuffer = await selectedFile.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    let extracted = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        extracted += textContent.items.map((item: any) => item.str).join(" ") + "\n";
                    }
                    setPdfExtractedText(extracted);
                    finalOutputText = extracted;
                } else {
                    finalOutputText = pdfExtractedText;
                }
            }

            // Validation: Minimum 200 characters
            if (finalOutputText.trim().length < 200) {
                setErrorMsg(t.errorModal.tooShort);
                setShowResult(false);
                return;
            }

            const formData = new FormData();
            formData.append('jobType', jobType === 'other' ? customJob : jobType);
            formData.append('language', lang);
            formData.append('text', finalOutputText); // Only sending text now!

            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData, // Much smaller payload avoids Vercel 4.5MB limit
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.error || 'Failed to analyze policy');
            }

            const data = await response.json();
            console.log("Raw API Result:", data);

            const safeData = {
                summary: data.summary || "Summary generation failed or was empty.",
                keyPointsList: Array.isArray(data.keyPointsList) && data.keyPointsList.length > 0 ? data.keyPointsList : ["No key points detected."],
                impacts: Array.isArray(data.impacts) && data.impacts.length > 0 ? data.impacts : [{ label: "General", text: "No specific impacts identified.", bg: "bg-secondary" }]
            };

            setApiResult(safeData);
        } catch (error: any) {
            console.error(error);
            setShowResult(false);
            setErrorMsg(error.message || t.errorModal.defaultTranslateError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExplainDetail = async () => {
        if (!policyText.trim() && !apiResult && !selectedFile) return;
        if (detailContent) return;

        setIsDetailLoading(true);
        try {
            let finalOutputText = policyText;
            if (selectedFile) {
                finalOutputText = pdfExtractedText; // Use cached text
            }

            const formData = new FormData();
            formData.append('jobType', jobType === 'other' ? customJob : jobType);
            formData.append('language', lang);
            formData.append('text', finalOutputText); // Only send text

            const response = await fetch('/api/detail', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.error || 'Failed to fetch details');
            }

            const data = await response.json();
            setDetailContent(data.detail);
        } catch (error: any) {
            console.error(error);
            setDetailContent("");
            setErrorMsg(error.message || t.errorModal.defaultDetailError);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleClear = () => {
        setApiResult(null);
        setPolicyText("");
        setShowResult(false);
        setDetailContent("");
        setActiveCardTab('tldr');
        setSelectedFile(null);
        setIsDragging(false);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy';
        }
        setIsDragging(true);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy';
        }
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === "application/pdf") {
                setSelectedFile(file);
            } else {
                setErrorMsg(t.errorModal.pdfOnly);
            }
        }
    };

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const impactContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5 // Start after the summary card
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 sm:px-12 font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
            {/* Navbar */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-5xl flex justify-between items-center mb-16 brutal-border brutal-shadow bg-card px-4 sm:px-6 py-4"
            >
                <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase">{t.title}</h1>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={toggleLanguage}
                        className="brutal-button !bg-green-400 hover:!bg-green-300 px-4 py-2 text-black text-xs sm:text-sm h-auto flex items-center gap-2"
                    >
                        <Globe size={16} />
                        {lang === "en" ? "ID" : "EN"}
                    </Button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-4 font-bold items-center">
                        <a href="/about" className="brutal-button bg-primary px-4 py-2 text-sm h-auto transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-tight">
                            {t.about}
                        </a>
                        <a href="/how-it-works" className="brutal-button bg-secondary px-4 py-2 text-sm h-auto transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-tight text-nowrap">
                            {t.howItWorks}
                        </a>
                    </nav>

                    {/* Mobile Nav Hamburger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger
                                render={<Button variant="outline" size="icon" className="brutal-button p-2 h-auto w-auto bg-foreground text-background" />}
                            >
                                <Menu size={24} />
                            </SheetTrigger>
                            <SheetContent side="top" className="!h-[100dvh] !w-[100vw] !max-w-none border-none bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center [&>button]:!bg-red-500 [&>button]:!text-white [&>button]:brutal-border [&>button]:border-white [&>button]:!top-6 [&>button]:!right-6 [&>button]:scale-150 p-6">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <div className="flex flex-col gap-8 font-black text-4xl sm:text-6xl text-center w-full max-w-sm">
                                    <a href="/about" className="bg-primary text-black brutal-border brutal-shadow py-8 hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all uppercase tracking-tight duration-700 animate-in slide-in-from-bottom-8 fade-in-0">{t.about}</a>
                                    <a href="/how-it-works" className="bg-secondary text-black brutal-border brutal-shadow py-8 hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all uppercase tracking-tight duration-1000 animate-in slide-in-from-bottom-12 fade-in-0">{t.howItWorks}</a>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.header>

            <motion.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-5xl flex flex-col gap-16"
            >
                {/* Hero Section */}
                <section className="text-center sm:text-left flex flex-col sm:flex-row gap-8 items-center justify-between">
                    <div className="max-w-2xl flex flex-col gap-6">
                        <motion.div variants={itemVariants} className="inline-block brutal-border bg-accent px-4 py-1 w-max rotate-[-2deg] mb-2 font-bold uppercase tracking-tight text-sm sm:text-base">
                            {t.taglineLabel}
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.1] tracking-tighter">
                            {t.heroHeadline.split('policies').length > 1 ? (
                                <>
                                    {t.heroHeadline.split('policies')[0]} <span className="text-background bg-foreground px-2">POLICIES</span> {t.heroHeadline.split('policies')[1]}
                                </>
                            ) : t.heroHeadline.split('kebijakan').length > 1 ? (
                                <>
                                    {t.heroHeadline.split('kebijakan')[0]} <span className="text-background bg-foreground px-2">KEBIJAKAN</span> {t.heroHeadline.split('kebijakan')[1]}
                                </>
                            ) : t.heroHeadline}
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg sm:text-xl font-medium max-w-xl border-l-4 border-foreground pl-4">
                            {t.heroSubHeadline}
                        </motion.p>
                    </div>
                </section>

                {/* Action Area */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                    {/* Text Input Block */}
                    <motion.div variants={itemVariants}>
                        <Card className="brutal-card rounded-none h-full flex flex-col">
                            <CardHeader className="border-b-4 border-border bg-primary">
                                <CardTitle className="text-xl sm:text-2xl font-black uppercase flex items-center gap-2">
                                    <Search size={24} /> {t.pastePolicy}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 flex flex-col gap-4 flex-grow">
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-sm bg-white text-black inline-block w-max px-2 border-2 border-border border-b-4">{t.jobSelectLabel}</label>
                                    <Select value={jobType} onValueChange={(v) => setJobType(v || "")}>
                                        <SelectTrigger className="brutal-border !bg-white !rounded-none h-12 text-base font-medium relative z-10 w-full min-w-[280px]">
                                            <SelectValue placeholder={t.jobSelectPlaceholder}>
                                                {jobType && jobType !== "other" ? (t.jobOptions as any)[jobType] : jobType === "other" ? t.jobOptions.other : undefined}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="brutal-border bg-white rounded-none shadow-brutal-sm z-[100] relative min-w-[var(--radix-select-trigger-width)]">
                                            <SelectItem value="civilian" className="font-medium focus:bg-primary data-[state=checked]:bg-yellow-200">{t.jobOptions.civilian}</SelectItem>
                                            <SelectItem value="mother" className="font-medium focus:bg-primary data-[state=checked]:bg-yellow-200">{t.jobOptions.mother}</SelectItem>
                                            <SelectItem value="worker" className="font-medium focus:bg-primary data-[state=checked]:bg-yellow-200">{t.jobOptions.worker}</SelectItem>
                                            <SelectItem value="umkm" className="font-medium focus:bg-primary data-[state=checked]:bg-yellow-200">{t.jobOptions.umkm}</SelectItem>
                                            <SelectItem value="student" className="font-medium focus:bg-primary data-[state=checked]:bg-yellow-200">{t.jobOptions.student}</SelectItem>
                                            <SelectItem value="other" className="font-medium focus:bg-primary data-[state=checked]:bg-yellow-200">{t.jobOptions.other}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {jobType === "other" && (
                                        <Input
                                            value={customJob}
                                            onChange={(e) => setCustomJob(e.target.value)}
                                            placeholder={t.otherJobPlaceholder}
                                            className="brutal-border !bg-white !rounded-none mt-2 h-12 text-base"
                                        />
                                    )}
                                </div>

                                <Textarea
                                    value={policyText}
                                    onChange={(e) => setPolicyText(e.target.value)}
                                    placeholder={t.pastePlaceholder}
                                    className="min-h-[200px] brutal-border resize-y !bg-white !rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-4 font-mono"
                                />
                                <Button
                                    onClick={handleTranslate}
                                    disabled={isLoading || (!policyText.trim() && !selectedFile)}
                                    className="brutal-button bg-foreground text-background hover:bg-[#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full text-lg sm:text-xl h-14 sm:h-16 rounded-none mt-auto active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                    {isLoading ? "Translating..." : t.explainBtn}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Upload Block */}
                    <motion.div variants={itemVariants}>
                        <Card className="brutal-card rounded-none h-full flex flex-col">
                            <CardHeader className="border-b-4 border-border bg-pink-400">
                                <CardTitle className="text-xl sm:text-2xl font-black uppercase flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                    <UploadCloud size={24} className="flex-shrink-0" /> <span className="truncate">{t.uploadDocument}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent
                                className={`p-4 sm:p-6 flex-grow flex flex-col justify-center items-center gap-6 border-4 border-dashed m-4 sm:m-6 transition-colors relative group overflow-hidden ${isDragging ? "bg-muted border-primary" : "bg-white border-border"}`}
                            >
                                {selectedFile ? (
                                    <div className="flex flex-col items-center gap-4 z-10 pointer-events-auto">
                                        <div className="w-16 h-16 bg-accent brutal-border flex items-center justify-center rounded-xl brutal-shadow">
                                            <FileText size={32} className="text-foreground" />
                                        </div>
                                        <p className="font-bold text-center max-w-[200px] truncate">{selectedFile.name}</p>
                                        <Button
                                            variant="outline"
                                            className="brutal-button bg-white text-foreground hover:bg-red-400 mt-2 pointer-events-auto"
                                            onClick={() => setSelectedFile(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer z-50"
                                            accept=".pdf"
                                            onChange={(e) => { if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]) }}
                                            onDragEnter={handleDragEnter}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        />
                                        <div className="w-20 h-20 bg-primary brutal-border brutal-shadow flex items-center justify-center rounded-full group-hover:scale-110 transition-transform pointer-events-none">
                                            <UploadCloud size={40} className="text-foreground" />
                                        </div>
                                        <div className="text-center md:px-4 z-0 pointer-events-none">
                                            <p className="text-xl sm:text-2xl font-black">{t.uploadPrompt}</p>
                                            <p className="font-bold text-sm sm:text-base text-muted-foreground mt-2">{t.uploadSizeLimit}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </section>

                {/* Dynamic Result Section conditionally rendered based on showResult state */}
                <AnimatePresence mode="wait">
                    {showResult && (
                        <motion.section
                            key="result-section"
                            className="mt-8 overflow-hidden"
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, scale: 0.95, y: -20, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-3xl sm:text-4xl font-black uppercase">
                                    {t.resultHeader}
                                </h3>
                                <div className="flex-1 h-2 bg-foreground brutal-border hidden sm:block"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <Card className="brutal-card rounded-none flex flex-col h-full">
                                        <CardHeader className="border-b-4 border-border bg-accent flex flex-row items-center justify-between py-3">
                                            <CardTitle className="text-xl sm:text-2xl font-black uppercase">
                                                {activeCardTab === 'tldr' ? t.summaryTitle : t.explainDetailBtn}
                                            </CardTitle>
                                            <div className="flex gap-2 items-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setActiveCardTab('tldr')}
                                                    disabled={activeCardTab === 'tldr'}
                                                    className="brutal-button bg-white disabled:opacity-50 h-10 w-10 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-1 active:translate-y-1 rounded-none border-2"
                                                >
                                                    <ArrowLeft size={20} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setActiveCardTab('detail');
                                                        if (!detailContent && !isDetailLoading) {
                                                            handleExplainDetail();
                                                        }
                                                    }}
                                                    disabled={activeCardTab === 'detail'}
                                                    className="brutal-button bg-white disabled:opacity-50 h-10 w-10 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-1 active:translate-y-1 rounded-none border-2"
                                                >
                                                    <ArrowRight size={20} />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 sm:p-6 transition-opacity duration-500 overflow-hidden flex-grow relative min-h-[300px]">
                                            <AnimatePresence mode="wait">
                                                {activeCardTab === 'tldr' ? (
                                                    <motion.div
                                                        key="tldr-view"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <h4 className="text-lg sm:text-xl font-bold bg-foreground text-background inline-block px-2 mb-4">{t.summaryLabel}</h4>
                                                        <p className="text-base sm:text-lg font-medium mb-8 leading-relaxed">
                                                            {isLoading ? (
                                                                <span className="flex items-center gap-2 italic text-muted-foreground animate-pulse">
                                                                    <Loader2 size={16} className="animate-spin" /> Thinking...
                                                                </span>
                                                            ) : (
                                                                apiResult?.summary
                                                            )}
                                                        </p>

                                                        {isLoading ? (
                                                            <div className="flex flex-col gap-4">
                                                                <div className="h-6 w-3/4 bg-muted animate-pulse border-2 border-border" />
                                                                <div className="h-6 w-5/6 bg-muted animate-pulse border-2 border-border" />
                                                                <div className="h-6 w-2/3 bg-muted animate-pulse border-2 border-border" />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <h4 className="text-lg sm:text-xl font-bold bg-foreground text-background inline-block px-2 mb-4 mt-8">{t.keyPointsLabel}</h4>
                                                                <ul className="list-disc pl-6 space-y-3 font-mono text-sm sm:text-base leading-relaxed tracking-tight font-bold border-l-4 border-primary ml-1">
                                                                    {apiResult?.keyPointsList?.map((point: string, idx: number) => (
                                                                        <li key={idx}>{point}</li>
                                                                    ))}
                                                                </ul>
                                                            </>
                                                        )}
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="detail-view"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="flex flex-col h-full"
                                                    >
                                                        {isDetailLoading ? (
                                                            <div className="flex flex-col items-center justify-center p-12 gap-4 my-auto">
                                                                <Loader2 className="animate-spin text-primary" size={48} />
                                                                <p className="font-bold text-lg animate-pulse">{t.detailLoading}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="font-medium text-foreground">
                                                                {renderMarkdown(detailContent)}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={impactContainerVariants}
                                    className="h-full"
                                >
                                    <Card className="brutal-card rounded-none h-full flex flex-col">
                                        <CardHeader className="border-b-4 border-border bg-primary">
                                            <CardTitle className="text-xl sm:text-2xl font-black uppercase flex items-center gap-2">
                                                <AlertCircle size={24} /> {t.impactTitle.split(' ')[0]}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 sm:p-6 space-y-8 mt-2 flex-grow overflow-y-auto">
                                            {isLoading ? (
                                                <div className="space-y-6">
                                                    <div className="h-20 w-full bg-muted animate-pulse border-2 border-border" />
                                                    <div className="h-20 w-full bg-muted animate-pulse border-2 border-border" />
                                                </div>
                                            ) : (
                                                apiResult?.impacts?.map((impact: { label: string, text: string, bg: string }, idx: number) => (
                                                    <motion.div
                                                        key={idx}
                                                        variants={itemVariants}
                                                        className="flex flex-col items-start"
                                                    >
                                                        <div className={`z-10 -mb-4 -ml-3 ${impact.bg} brutal-border px-3 py-1 font-bold text-sm tracking-wider uppercase inline-block`}>
                                                            {impact.label}
                                                        </div>
                                                        <div className="brutal-border p-4 pt-6 bg-white w-full relative z-0">
                                                            <p className="font-medium text-sm sm:text-base leading-relaxed">{impact.text}</p>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>

                            {(apiResult || policyText) && (
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col sm:flex-row gap-4 mt-8 justify-end w-full"
                                >
                                    <Button
                                        variant="outline"
                                        onClick={handleClear}
                                        className="brutal-button !bg-black !text-white hover:!bg-[#333] transition-all text-base sm:text-lg h-12 sm:h-14 rounded-none font-bold"
                                    >
                                        {t.clearResult}
                                    </Button>
                                </motion.div>
                            )}
                        </motion.section>
                    )}
                </AnimatePresence>
            </motion.main>

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

            {/* Error Modal */}
            <AnimatePresence>
                {errorMsg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-destructive text-destructive-foreground brutal-border brutal-shadow max-w-md w-full p-6 flex flex-col gap-4 relative"
                        >
                            <h3 className="text-2xl font-black uppercase flex items-center gap-2">
                                <AlertCircle size={24} /> {t.errorModal.title}
                            </h3>
                            <p className="font-bold text-white text-lg leading-relaxed">{errorMsg}</p>
                            <Button
                                onClick={() => setErrorMsg("")}
                                className="brutal-button bg-white text-black hover:bg-gray-200 mt-4 w-full h-12 text-lg uppercase"
                            >
                                {t.errorModal.button}
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
