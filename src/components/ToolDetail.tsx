import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ShareButtons from './ShareButtons';

interface ToolDetailProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
  toolImage?: string;
}

const ToolDetail: React.FC<ToolDetailProps> = ({
  toolId,
  toolName,
  toolDescription,
  toolImage
}) => {
  const { t } = useTranslation();
  const currentUrl = `${window.location.origin}/tool/${toolId}`;

  useEffect(() => {
    // Update meta tags for social sharing
    const metaTags = {
      'og:title': toolName,
      'og:description': toolDescription,
      'og:url': currentUrl,
      'og:type': 'article',
      'og:image': toolImage || `${window.location.origin}/default-tool-image.jpg`,
      'twitter:card': 'summary_large_image',
      'twitter:title': toolName,
      'twitter:description': toolDescription,
      'twitter:url': currentUrl,
      'twitter:image': toolImage || `${window.location.origin}/default-tool-image.jpg`,
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }, [toolName, toolDescription, toolImage, currentUrl]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-primary-dark rounded-lg shadow-lg overflow-hidden">
          {toolImage && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={toolImage}
                alt={toolName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {toolName}
              </h1>
              <ShareButtons
                url={currentUrl}
                title={toolName}
                description={toolDescription}
              />
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {toolDescription}
            </p>

            {/* Add more tool details here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;