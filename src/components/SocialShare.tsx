import React, { useState } from 'react';  // 添加 useState 导入
import { FaTwitter, FaLinkedin, FaYoutube, FaFacebook, FaTiktok, FaShare } from 'react-icons/fa';  // 添加 FaShare
import { useTranslation } from 'react-i18next';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description = '' }) => {
  const { t } = useTranslation();
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

  const handleShare = (platform: string, url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  // return (
  //   <div className="flex flex-col items-center gap-4">
  //     <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
  //       {t('share.title', '分享此页面')}
  //     </h3>
  //     <div className="flex gap-6 items-center">
  //       <button
  //         onClick={() => handleShare('twitter', shareLinks.twitter)}
  //         className="text-gray-600 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
  //         aria-label="Share on Twitter"
  //       >
  //         <FaTwitter size={28} />
  //       </button>
  //       <button
  //         onClick={() => handleShare('linkedin', shareLinks.linkedin)}
  //         className="text-gray-600 hover:text-blue-700 transition-colors duration-300 transform hover:scale-110"
  //         aria-label="Share on LinkedIn"
  //       >
  //         <FaLinkedin size={28} />
  //       </button>
  //       <button
  //         onClick={() => handleShare('youtube', shareLinks.youtube)}
  //         className="text-gray-600 hover:text-red-600 transition-colors duration-300 transform hover:scale-110"
  //         aria-label="Share on YouTube"
  //       >
  //         <FaYoutube size={28} />
  //       </button>
  //       <button
  //         onClick={() => handleShare('facebook', shareLinks.facebook)}
  //         className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
  //         aria-label="Share on Facebook"
  //       >
  //         <FaFacebook size={28} />
  //       </button>
  //       <button
  //         onClick={() => handleShare('tiktok', shareLinks.tiktok)}
  //         className="text-gray-600 hover:text-black transition-colors duration-300 transform hover:scale-110"
  //         aria-label="Share on TikTok"
  //       >
  //         <FaTiktok size={28} />
  //       </button>
  //     </div>
  //   </div>
  // );
  // 添加状态来控制弹出菜单的显示
  const [isOpen, setIsOpen] = useState(false);

  // 修改返回的JSX，将多个按钮改为一个主按钮和弹出菜单
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        {t('share.title', '分享此页面')}
      </h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
          aria-label="Share"
        >
          <FaShare size={28} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleShare('twitter', shareLinks.twitter)}
                className="text-gray-600 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                aria-label="Share on Twitter"
              >
                <FaTwitter size={24} />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => handleShare('linkedin', shareLinks.linkedin)}
                className="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin size={24} />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('youtube', shareLinks.youtube)}
                className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2"
                aria-label="Share on YouTube"
              >
                <FaYoutube size={24} />
                <span>YouTube</span>
              </button>
              <button
                onClick={() => handleShare('facebook', shareLinks.facebook)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2"
                aria-label="Share on Facebook"
              >
                <FaFacebook size={24} />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => handleShare('tiktok', shareLinks.tiktok)}
                className="text-gray-600 hover:text-black transition-colors duration-300 flex items-center gap-2"
                aria-label="Share on TikTok"
              >
                <FaTiktok size={24} />
                <span>TikTok</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default SocialShare;