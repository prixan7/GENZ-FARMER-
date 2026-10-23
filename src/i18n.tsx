import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Multilingual interface: 9 languages with English fallback for any
// string not yet translated (per project brief — no translation service).
export const languages = [
  { code: "en", name: "English" },
  { code: "ta", name: "தமிழ்" },
  { code: "hi", name: "हिन्दी" },
  { code: "te", name: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "mr", name: "मराठी" },
  { code: "bn", name: "বাংলা" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.dashboard": "Dashboard",
  "nav.marketplace": "Marketplace",
  "nav.planner": "Farm planner",
  "nav.more": "More",
  "cta.started": "Open dashboard",
  "hero.title": "Grow smarter. Sell better.",
  "hero.sub": "One place to plan crops, protect harvests, find labour and equipment, and sell at better prices — built for the next generation of farmers.",
  "hero.cta": "Explore the platform",
  "hero.cta2": "Farm planner",
  "common.demo": "Demonstration data",
};

const dicts: Record<string, Dict> = {
  en,
  ta: {
    "nav.home": "முகப்பு", "nav.dashboard": "டாஷ்போர்டு", "nav.marketplace": "சந்தை",
    "nav.planner": "பயிர்த் திட்டம்", "nav.more": "மேலும்", "cta.started": "டாஷ்போர்டைத் திற",
    "hero.title": "நவந்திர விவசாயம். சிறந்த விற்பனை.",
  },
  hi: {
    "nav.home": "होम", "nav.dashboard": "डैशबोर्ड", "nav.marketplace": "बाज़ार",
    "nav.planner": "फसल योजना", "nav.more": "और", "cta.started": "डैशबोर्ड खोलें",
    "hero.title": "स्मार्ट खेती। बेहतर बिक्री।",
  },
  te: {
    "nav.home": "హోమ్", "nav.dashboard": "డాష్‌బోర్డ్", "nav.marketplace": "మార్కెట్",
    "nav.planner": "పంట ప్రణాళిక", "nav.more": "మరిన్ని", "cta.started": "డాష్‌బోర్డ్ తెరవండి",
    "hero.title": "తెలివైన వ్యవసాయం. మెరుగైన అమ్మకం.",
  },
  kn: {
    "nav.home": "ಮುಖಪುಟ", "nav.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "nav.marketplace": "ಮಾರುಕಟ್ಟೆ",
    "nav.planner": "ಬೆಳೆ ಯೋಜನೆ", "nav.more": "ಇನ್ನಷ್ಟು", "cta.started": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ",
    "hero.title": "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ. ಉತ್ತಮ ಮಾರಾಟ.",
  },
  ml: {
    "nav.home": "ഹോം", "nav.dashboard": "ഡാഷ്ബോർഡ്", "nav.marketplace": "കമ്പോളം",
    "nav.planner": "വിള പദ്ധതി", "nav.more": "കൂടുതൽ", "cta.started": "ഡാഷ്ബോർഡ് തുറക്കുക",
    "hero.title": "സ്മാർട്ട് കൃഷി. മികച്ച വിൽപ്പന.",
  },
  mr: {
    "nav.home": "मुख्यपृष्ठ", "nav.dashboard": "डॅशबोर्ड", "nav.marketplace": "बाजार",
    "nav.planner": "पीक नियोजन", "nav.more": "अधिक", "cta.started": "डॅशबोर्ड उघडा",
    "hero.title": "स्मार्ट शेती. अधिक विक्री.",
  },
  bn: {
    "nav.home": "হোম", "nav.dashboard": "ড্যাশবোর্ড", "nav.marketplace": "বাজার",
    "nav.planner": "ফসল পরিকল্পনা", "nav.more": "আরও", "cta.started": "ড্যাশবোর্ড খুলুন",
    "hero.title": "স্মার্ট চাষ। ভালো বিক্রি।",
  },
  pa: {
    "nav.home": "ਘਰ", "nav.dashboard": "ਡੈਸ਼ਬੋਰਡ", "nav.marketplace": "ਬਾਜ਼ਾਰ",
    "nav.planner": "ਫ਼ਸਲ ਯੋਜਨਾ", "nav.more": "ਹੋਰ", "cta.started": "ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ",
    "hero.title": "ਸਮਾਰਟ ਖੇਤੀ। ਵਧੀਆ ਵਿਕਰੀ।",
  },
};

const LangContext = createContext<{ lang: string; setLang: (l: string) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState("en");

  // Restore saved preference after hydration to avoid SSR mismatch.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("genz-lang");
      if (saved && dicts[saved]) setLang(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const set = (l: string) => {
    setLang(l);
    try {
      localStorage.setItem("genz-lang", l);
    } catch {
      /* ignore */
    }
  };

  return <LangContext.Provider value={{ lang, setLang: set }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useContext(LangContext);
  return (key: string) => dicts[lang]?.[key] ?? en[key] ?? key;
}
