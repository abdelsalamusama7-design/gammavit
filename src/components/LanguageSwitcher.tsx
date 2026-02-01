import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="text-white hover:bg-white/10"
      title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <Languages className="w-5 h-5" />
    </Button>
  );
};

export default LanguageSwitcher;
