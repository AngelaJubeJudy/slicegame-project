import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Gamepad2, Star, Users, Sun, Moon, Languages,
  MessageSquare, CreditCard, HelpCircle
} from 'lucide-react';
import { useTheme } from './hooks/useTheme';

function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

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
      {/* Header */}
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

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        {/* Game Container */}
        <div className="aspect-[16/9] w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl mb-12">
          <iframe 
            src="https://www.crazygames.com/embed/slice-master" 
            className="w-full h-full"
            frameBorder="0"
            allow="gamepad *;"
            title="Slice Game"
          />
        </div>

        {/* Features Section */}
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

        {/* Review Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('testimonials.title')}</h2>
          <div className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={t('testimonials.placeholder')}
              className="w-full p-4 border rounded-lg mb-4 dark:bg-primary-light dark:text-white"
              rows={4}
              minLength={15}
            />
            <button
              className="bg-accent-dark text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
              disabled={review.length < 15}
            >
              {t('testimonials.submitReview')}
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('faq.title')}</h2>
          <div className="space-y-4">
            {t('faq.questions', { returnObjects: true }).map((faq: any, index: number) => (
              <div key={index} className="bg-white dark:bg-primary-dark p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
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