export type Language = "en" | "id";

export const translations = {
    en: {
        title: "Civic Lens",
        about: "About",
        howItWorks: "How it works",
        taglineLabel: "AI-Powered Government Policy Explainer",
        heroHeadline: "Understand policies in seconds.",
        heroSubHeadline: "Stop struggling with complex bureaucratic jargon. Paste a policy or upload a document to get a simple translation of how it impacts you.",
        pastePolicy: "Paste Policy Text",
        pastePlaceholder: "Paste the confusing government text here...",
        explainBtn: "Translate This",
        uploadDocument: "Upload PDF",
        uploadPrompt: "Click or drag PDF here",
        uploadSizeLimit: "Maximum file size: 10MB (PDF Only)",
        demoResult: "Demo Result",
        clearResult: "Clear Result",
        explainDetailBtn: "Explain more in detail",
        resultHeader: "Analysis Result",
        detailLoading: "Generating deep dive analysis...",
        summaryTitle: "TL;DR & Key Points",
        summaryLabel: "Summary",
        keyPointsLabel: "Key Points",
        impactTitle: "Impact Analysis",
        jobSelectLabel: "Who are you? (Helps AI explain better)",
        jobSelectPlaceholder: "Select your role...",
        jobOptions: {
            civilian: "Common Civilian",
            mother: "Mother / Parent",
            worker: "Industrial Worker",
            umkm: "UMKM / Small Business",
            student: "Student",
            other: "Other (Please specify)"
        },
        otherJobPlaceholder: "Tell us your job...",
        demoData: {
            student: {
                summary: "Basically, the government is giving a tax break to small digital businesses. If you make under $50K, you don't gotta pay the new digital tax. Massive W for small creators.",
                keyPointsList: [
                    "No digital tax if revenue < $50,000. Big W.",
                    "You still gotta report quarterly starting Q3. Don't ghost.",
                    "Don't forget to report or they'll fine you 5% flat. No cap."
                ],
                impacts: [
                    { label: "Side Hustles", text: "If you're freelancing or selling online and under 50k, you're chilling.", bg: "bg-secondary" },
                    { label: "Content Creators", text: "Keep growing your channel. This tax won't touch you yet.", bg: "bg-accent" }
                ]
            },
            civilian: {
                summary: "The government has introduced a new tax for large digital businesses. Small online businesses making less than $50,000 are not required to pay this tax, providing relief for small entrepreneurs.",
                keyPointsList: [
                    "Digital businesses with revenue under $50,000 are exempt from the new tax.",
                    "Quarterly reporting is still required, beginning in the third quarter.",
                    "Failure to file the required reports will result in a 5% penalty."
                ],
                impacts: [
                    { label: "General Public", text: "This policy primarily affects large digital companies. Everyday consumers may not see direct changes.", bg: "bg-secondary" },
                    { label: "Small Sellers", text: "If you sell items online occasionally, you are exempt as long as you stay under the threshold.", bg: "bg-accent" }
                ]
            },
            umkm: {
                summary: "Good news for small businesses. The new digital service tax only applies to companies generating over $50,000. However, compliance tracking is increasing, meaning your business must submit quarterly reports.",
                keyPointsList: [
                    "Exempt from digital service tax if annual revenue is below $50,000.",
                    "Mandatory quarterly financial reporting begins in Q3.",
                    "Strict 5% flat penalty on gross income for missing report deadlines."
                ],
                impacts: [
                    { label: "Small Business", text: "Significant tax relief. Ensure your accounting systems are updated by Q3 to handle the new reporting.", bg: "bg-secondary" },
                    { label: "Freelancers", text: "If structured as a sole proprietorship under the threshold, no new tax applies.", bg: "bg-accent" }
                ]
            },
            worker: {
                summary: "The new digital tax only targets major tech companies and large digital businesses. As an industrial worker, your income and standard taxes are completely unaffected by this specific regulation.",
                keyPointsList: [
                    "Applies strictly to digital service revenue over $50,000.",
                    "No changes to standard income tax or worker benefits.",
                    "Requires new reporting only for digital business owners."
                ],
                impacts: [
                    { label: "Factory Workers", text: "No impact on your daily wages or standard income tax deductions.", bg: "bg-secondary" },
                    { label: "Union Members", text: "This policy is unrelated to labor rights or industrial regulations.", bg: "bg-accent" }
                ]
            },
            mother: {
                summary: "This new digital tax rule is mostly for big online businesses. If you have a small home business selling things online and make less than $50,000, you don't have to pay this extra tax.",
                keyPointsList: [
                    "Home businesses making under $50,000 are safe from this new tax.",
                    "You must remember to file a short report every 3 months starting later this year.",
                    "Make sure to file the report, otherwise there is a 5% fine."
                ],
                impacts: [
                    { label: "Home Business", text: "You get to keep your profits without the extra tax. Just mark your calendar to report every 3 months.", bg: "bg-secondary" },
                    { label: "Household", text: "Regular household finances and family taxes are not affected by this rule.", bg: "bg-accent" }
                ]
            }
        },
        aboutPage: {
            mission: "The Mission",
            headline: "Democratizing Access to Policy",
            p1: "Government policies affect every aspect of our lives, yet they are written in a language that only lawyers and bureaucrats can easily understand. This creates an unfair information gap between the government and the citizens it serves.",
            p2: "Civic Lens was built with a singular vision: to act as the 'Google Translate' for public policy.",
            p3: "By leveraging advanced Large Language Models (LLMs), we instantly translate complex, multi-page PDFs or dense regulatory text into simple, straightforward, and actionable insights. Whether you are a small business owner navigating tax changes or a freelancer figuring out your rights, Civic Lens cuts through the noise.",
            openSourceTitle: "Open Source & Free",
            openSourceText: "Access to law is a human right. We believe tools that explain the law should be accessible to everyone."
        },
        howItWorksPage: {
            headline: "Three Easy Steps",
            step1Title: "1. Upload",
            step1Desc: "Copy and paste dense legal text directly into our tool, or upload a full PDF document. Our system handles massive blocks of text instantly.",
            step2Title: "2. Analyze",
            step2Desc: "We send the data securely to our tuned LLM. The AI reads the jargon, identifies the core rules, and checks the context based on your specific job role.",
            step3Title: "3. Decode",
            step3Desc: "Within seconds, you get a summary. No massive paragraphs—just the TL;DR, exactly what rules apply to you, and what your next actionable steps are."
        },
        errorModal: {
            title: "Whoops! An Error Exploded.",
            button: "I Understand",
            defaultTranslateError: "An error occurred while translating. Please try again.",
            defaultDetailError: "An error occurred while fetching details. Please try again.",
            pdfOnly: "Please upload a PDF file only.",
            tooShort: "Text is too short. Please provide at least 200 characters of the policy.",
            notPolicy: "This content doesn't seem to be a government policy or law. We only analyze official regulatory documents."
        }
    },
    id: {
        title: "Civic Lens",
        about: "Tentang",
        howItWorks: "Cara Kerja",
        taglineLabel: "Penerjemah Kebijakan Pemerintah berbasis AI",
        heroHeadline: "Pahami kebijakan dalam hitungan detik.",
        heroSubHeadline: "Gak usah pusing sama bahasa birokrasi yang belibet. Paste aturan atau upload dokumen buat dapet ringkasan simple yang gampang dipahami.",
        pastePolicy: "Paste Teks Aturan",
        pastePlaceholder: "Paste teks pemerintah yang bikin pusing di sini...",
        explainBtn: "Terjemahkan Aturan",
        uploadDocument: "Upload PDF",
        uploadPrompt: "Klik atau geser PDF ke sini",
        uploadSizeLimit: "Batas ukuran file: 10MB (Hanya PDF)",
        demoResult: "Hasil Demo",
        clearResult: "Hapus Hasil",
        explainDetailBtn: "Jelasin lebih detail dong",
        resultHeader: "Hasil Analisis",
        detailLoading: "Lagi nyusun penjelasan mendalam...",
        summaryTitle: "TL;DR & Poin Penting",
        summaryLabel: "Ringkasan",
        keyPointsLabel: "Poin Penting",
        impactTitle: "Analisis Dampak",
        jobSelectLabel: "Peran lo apa nih? (Biar AI makin nyambung jelasinnya)",
        jobSelectPlaceholder: "Pilih peran lo...",
        jobOptions: {
            civilian: "Warga Biasa",
            mother: "Ibu / Orang Tua",
            worker: "Pekerja Industri / Buruh",
            umkm: "Pelaku UMKM",
            student: "Pelajar / Mahasiswa",
            other: "Lainnya (Sebutin aja)"
        },
        otherJobPlaceholder: "Kerja apa bro/sis?...",
        demoData: {
            student: {
                summary: "Intinya, pemerintah ngasih keringanan pajak buat bisnis digital kecil. Kalau pemasukan lo di bawah 500 juta, lo gak perlu bayar pajak digital yang baru ini. W banget sih buat kreator kecil.",
                keyPointsList: [
                    "Bebas pajak digital kalau cuan < 500 juta. Hoki bro.",
                    "Tapi tetep wajib lapor tiap kuartal mulai dari Q3 ya.",
                    "Jangan sampe lupa lapor, denda 5% lumayan ngab. No cap."
                ],
                impacts: [
                    { label: "Side Hustle", text: "Kalo lo freelance atau jualan online dan cuannya masih di bawah 500juta, aman banget.", bg: "bg-secondary" },
                    { label: "Content Creator", text: "Gaskeun bikin konten, pajak ini belom nyentuh lo kok.", bg: "bg-accent" }
                ]
            },
            civilian: {
                summary: "Pemerintah baru saja mengeluarkan pajak baru untuk bisnis digital berskala besar. Bisnis online kecil yang pendapatannya di bawah 500 juta rupiah dibebaskan dari pajak ini, sehingga sangat membantu pengusaha kecil.",
                keyPointsList: [
                    "Bisnis digital dengan pendapatan di bawah 500 juta bebas dari pajak baru ini.",
                    "Pelaporan triwulanan tetap diwajibkan, dimulai pada kuartal ketiga.",
                    "Jika tidak melapor, akan dikenakan denda sebesar 5%."
                ],
                impacts: [
                    { label: "Masyarakat Umum", text: "Kebijakan ini ditujukan untuk perusahaan besar. Konsumen biasa tidak akan merasakan dampak langsung.", bg: "bg-secondary" },
                    { label: "Penjual Kecil", text: "Jika Anda berjualan online sesekali, Anda bebas pajak selama pendapatan masih di bawah batas.", bg: "bg-accent" }
                ]
            },
            umkm: {
                summary: "Kabar baik buat UMKM! Pajak layanan digital yang baru cuma berlaku buat perusahaan dengan omset di atas 500 juta. Tapi ingat, pengawasan makin ketat, jadi pembukuan harus rapi buat laporan tiap kuartal.",
                keyPointsList: [
                    "Bebas pajak layanan digital kalau omset setahun di bawah 500 juta.",
                    "Wajib menyampaikan laporan keuangan per kuartal mulai Q3.",
                    "Denda telat lapor lumayan berat, yaitu 5% flat dari total omset kotor."
                ],
                impacts: [
                    { label: "Bisnis Kecil", text: "Sangat menguntungkan. Pastikan sistem kasir atau pembukuan Anda sudah rapi sebelum Q3.", bg: "bg-secondary" },
                    { label: "Freelancer Profesi", text: "Selama berstatus individu dan belum lewat batas omset, aturan pajak baru ini tidak membebani.", bg: "bg-accent" }
                ]
            },
            worker: {
                summary: "Pajak digital yang baru ini cuma menyasar perusahaan teknologi besar dan bisnis digital. Sebagai pekerja industri atau buruh, gaji dan perhitungan Pajak Penghasilan (PPh 21) Anda tidak terpengaruh sama sekali oleh aturan ini.",
                keyPointsList: [
                    "Aturan ini khusus untuk pendapatan layanan digital di atas 500 juta.",
                    "Tidak ada perubahan pada pajak penghasilan standar (PPh) atau potongan gaji.",
                    "Kewajiban lapor yang baru hanya untuk pemilik usaha digital."
                ],
                impacts: [
                    { label: "Pekerja Pabrik", text: "Gaji pokok dan uang lembur aman. Tidak ada potongan baru dari aturan ini.", bg: "bg-secondary" },
                    { label: "Anggota Serikat", text: "Kebijakan ini fokus ke perusahaan digital, tidak berhubungan dengan regulasi ketenagakerjaan.", bg: "bg-accent" }
                ]
            },
            mother: {
                summary: "Aturan pajak digital yang baru ini fokusnya ke perusahaan online besar, Bu. Kalau Ibu punya usaha rumahan atau jualan online dengan pendapatan di bawah 500 juta, Ibu tidak perlu bayar pajak tambahan ini.",
                keyPointsList: [
                    "Usaha rumahan dengan pemasukan di bawah 500 juta aman dari pajak baru.",
                    "Ibu cuma perlu ingat untuk setor laporan sederhana setiap 3 bulan, mulai pertengahan tahun nanti.",
                    "Pastikan laporannya tidak lupa ya Bu, karena dendanya 5%."
                ],
                impacts: [
                    { label: "Usaha Rumahan", text: "Uang hasil jualan bisa utuh buat keluarga. Cukup tandai kalender buat lapor tiap 3 bulan ya.", bg: "bg-secondary" },
                    { label: "Uang Belanja", text: "Anggaran rumah tangga dan pajak rutin keluarga sama sekali tidak terganggu aturan ini.", bg: "bg-accent" }
                ]
            }
        },
        aboutPage: {
            mission: "Misi Kami",
            headline: "Demokratisasi Akses Kebijakan",
            p1: "Kebijakan pemerintah memengaruhi setiap aspek kehidupan kita, tetapi seringkali ditulis dalam bahasa yang hanya mudah dimengerti oleh pengacara dan birokrat. Ini menciptakan kesenjangan informasi yang tidak adil antara pemerintah dan warga negara.",
            p2: "Civic Lens dibangun dengan satu visi: menjadi 'Google Translate' untuk kebijakan publik.",
            p3: "Dengan memanfaatkan Model Bahasa Besar (LLM) yang canggih, kami menerjemahkan PDF berlembar-lembar atau teks regulasi yang padat menjadi wawasan yang sederhana, langsung, dan dapat ditindaklanjuti. Baik Anda pemilik bisnis UMKM atau freelancer, Civic Lens membantu Anda memahami aturan tanpa pusing.",
            openSourceTitle: "Open Source & Gratis",
            openSourceText: "Akses terhadap hukum adalah hak asasi manusia. Kami percaya alat yang menjelaskan hukum harus dapat diakses oleh semua orang."
        },
        howItWorksPage: {
            headline: "Tiga Langkah Mudah",
            step1Title: "1. Upload",
            step1Desc: "Copy dan paste teks hukum yang padat langsung ke alat kami, atau upload dokumen PDF. Sistem kami memproses teks dalam sekejap.",
            step2Title: "2. Analisis",
            step2Desc: "Kami mengirim data secara aman ke LLM kami. AI membaca istilah teknis, mengidentifikasi aturan inti, dan menyesuaikan konteks berdasarkan peran Anda.",
            step3Title: "3. Paham",
            step3Desc: "Dalam hitungan detik, Anda mendapatkan ringkasan sederhana. Gak pake paragraf panjang—langsung ke intinya (TL;DR), apa aturan yang berlaku buat Anda, dan apa langkah selanjutnya."
        },
        errorModal: {
            title: "Waduh! Ada Error Nih.",
            button: "Oke, Paham",
            defaultTranslateError: "Terjadi kesalahan saat menerjemahkan. Silakan coba lagi.",
            defaultDetailError: "Terjadi kesalahan saat menyusun penjelasan. Silakan coba lagi.",
            pdfOnly: "Tolong upload file PDF aja ya.",
            tooShort: "Teks kependekan nih. Minimal kasih 200 karakter aturan ya.",
            notPolicy: "Ini kayaknya bukan aturan pemerintah atau hukum deh. Kita cuma bisa bantu analisis dokumen resmi kebijakan aja."
        }
    }
};
