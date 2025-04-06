import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Gamepad2, Star, Users, Sun, Moon,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space, MousePointer,
  Keyboard, Mouse
} from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import FeedbackCards from './components/FeedbackCards';
import SocialShare from './components/SocialShare';
import BackToTop from './components/BackToTop';

interface FAQ {
  q: string;
  a: string;
}

function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
      <header className="bg-primary-light dark:bg-primary-dark text-white py-6 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-8 h-8" />
              <span className="text-2xl font-bold">SliceMaster</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-primary-dark dark:hover:bg-primary-light transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-transparent border-none focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        <div className="flex justify-center mb-8">
          <SocialShare 
            url={window.location.href}
            title={t('hero.title')}
            description={t('hero.subtitle')}
          />
        </div>

        <div className="aspect-[16/9] w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl mb-12">
          <iframe 
            src="https://www.crazygames.com/embed/slice-master" 
            className="w-full h-full"
            frameBorder="0"
            allow="gamepad *; fullscreen *;"
            title="Slice Game"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('gameControls.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Keyboard className="w-6 h-6 text-accent-dark" />
                  <h3 className="text-xl font-semibold">{t('gameControls.keyboard.title')}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ArrowUp className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.keyboard.up')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowDown className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.keyboard.down')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.keyboard.left')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.keyboard.right')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Space className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.keyboard.space')}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Mouse className="w-6 h-6 text-accent-dark" />
                  <h3 className="text-xl font-semibold">{t('gameControls.mouse.title')}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MousePointer className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.mouse.left')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MousePointer className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('gameControls.mouse.right')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-accent-dark" />
              <h2 className="text-xl font-semibold">{t('features.controls.title')}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{t('features.controls.description')}</p>
          </div>

          <div className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-accent-dark" />
              <h2 className="text-xl font-semibold">{t('features.challenge.title')}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{t('features.challenge.description')}</p>
          </div>

          <div className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-accent-dark" />
              <h2 className="text-xl font-semibold">{t('features.competition.title')}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{t('features.competition.description')}</p>
          </div>
        </section>

        <FeedbackCards />

        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('faq.title')}</h2>
          <div className="space-y-4">
            {(t('faq.questions', { returnObjects: true }) as FAQ[]).map((faq: FAQ, index: number) => (
              <div key={index} className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BackToTop />

      <footer className="bg-primary-dark text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright')}</p>
          <p className="mt-2">{t('footer.contact')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;