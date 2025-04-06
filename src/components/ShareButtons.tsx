import React, { useState } from 'react';
import { Twitter, Linkedin, Youtube, Facebook, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    youtube: `https://www.youtube.com/share?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    tiktok: `https://www.tiktok.com/share?url=${encodedUrl}&text=${encodedTitle}`
  };

  const handleShare = (platform: string) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      shareLinks[platform as keyof typeof shareLinks],
      'share',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() => handleShare('youtube')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              aria-label="Share on YouTube"
            >
              <Youtube className="w-5 h-5" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;