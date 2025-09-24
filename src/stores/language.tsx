import {create} from 'zustand';

interface LangSate {
  selectedLanguage: string;
  setLang: (lang: string) => void;
}

export const useLangStore = create<LangSate>((set) => {
  const initialLang = (typeof window  !== 'undefined' && localStorage.getItem('selectedLanguage')) || 'ID';

  return {
    selectedLanguage: initialLang,
    setLang: (lang: string) => {
      set({selectedLanguage: lang});
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLanguage', lang);
      }
    }
  }
})