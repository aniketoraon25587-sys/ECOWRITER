import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ArrowLeft, RefreshCw, Download } from 'lucide-react';
import { GeneratedContent, Platform } from '../types';

interface ResultsViewProps {
  content: GeneratedContent;
  onReset: () => void;
  onRegenerate: () => void; // Simple callback to go back or trigger
}

export const ResultsView: React.FC<ResultsViewProps> = ({ content, onReset, onRegenerate }) => {
  const [activePlatform, setActivePlatform] = useState<Platform>(Platform.Amazon);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(content, null, 2)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "product-description.json";
    document.body.appendChild(element);
    element.click();
  };

  const renderPlatformContent = () => {
    switch (activePlatform) {
      case Platform.Amazon:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Amazon Listing</h3>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="whitespace-pre-wrap text-gray-300">{content.platform_copy.amazon}</p>
            </div>
            <CopyButton text={content.platform_copy.amazon} label="Copy Amazon Listing" onCopy={() => handleCopy(content.platform_copy.amazon, 'amazon')} isCopied={copiedSection === 'amazon'} />
          </div>
        );
      case Platform.Shopify:
        return (
            <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Shopify Product Page</h3>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="whitespace-pre-wrap text-gray-300">{content.platform_copy.shopify}</p>
            </div>
            <CopyButton text={content.platform_copy.shopify} label="Copy Shopify HTML" onCopy={() => handleCopy(content.platform_copy.shopify, 'shopify')} isCopied={copiedSection === 'shopify'} />
          </div>
        );
      case Platform.Meesho:
        return (
            <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Meesho Description</h3>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="whitespace-pre-wrap text-gray-300">{content.platform_copy.meesho}</p>
            </div>
            <CopyButton text={content.platform_copy.meesho} label="Copy Meesho Text" onCopy={() => handleCopy(content.platform_copy.meesho, 'meesho')} isCopied={copiedSection === 'meesho'} />
          </div>
        );
      case Platform.Instagram:
        return (
            <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Instagram Caption</h3>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="whitespace-pre-wrap text-gray-300">{content.platform_copy.instagram_caption}</p>
            </div>
            <CopyButton text={content.platform_copy.instagram_caption} label="Copy Caption" onCopy={() => handleCopy(content.platform_copy.instagram_caption, 'ig')} isCopied={copiedSection === 'ig'} />
          </div>
        );
      case Platform.WhatsApp:
        return (
            <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Broadcast</h3>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="whitespace-pre-wrap text-gray-300">{content.platform_copy.whatsapp_message}</p>
            </div>
            <CopyButton text={content.platform_copy.whatsapp_message} label="Copy Message" onCopy={() => handleCopy(content.platform_copy.whatsapp_message, 'wa')} isCopied={copiedSection === 'wa'} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
           <button 
              onClick={onReset}
              className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={20} /> Create New
            </button>
            <div className="flex gap-3">
                 <button onClick={onRegenerate} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/10">
                    <RefreshCw size={18} /> Regenerate
                 </button>
                 <button onClick={downloadContent} className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors border border-primary/20">
                    <Download size={18} /> Export JSON
                 </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Core Info */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold tracking-wider text-primary uppercase">Product Title</span>
                        <CopyButtonMinimal onClick={() => handleCopy(content.title, 'title')} isCopied={copiedSection === 'title'} />
                    </div>
                    <h1 className="text-2xl font-bold text-white leading-tight">{content.title}</h1>
                </motion.div>

                {/* Description */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold tracking-wider text-secondary uppercase">Product Description</span>
                        <CopyButtonMinimal onClick={() => handleCopy(content.long_description, 'desc')} isCopied={copiedSection === 'desc'} />
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{content.long_description}</p>
                </motion.div>

                {/* Bullets */}
                <motion.div 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                     className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                >
                     <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold tracking-wider text-green-400 uppercase">Key Features</span>
                        <CopyButtonMinimal onClick={() => handleCopy(content.bullets.join('\n'), 'bullets')} isCopied={copiedSection === 'bullets'} />
                    </div>
                    <ul className="space-y-3">
                        {content.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                <span className="text-gray-300">{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Right Column: Platforms & Keywords */}
            <div className="lg:col-span-1 space-y-6">
                 {/* Keywords */}
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                 >
                     <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase">SEO Keywords</h3>
                     <div className="flex flex-wrap gap-2">
                         {content.seo_keywords.map((kw, i) => (
                             <span key={i} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300">
                                 #{kw}
                             </span>
                         ))}
                     </div>
                 </motion.div>

                 {/* Platform Switcher */}
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md min-h-[400px]"
                 >
                     <div className="flex overflow-x-auto gap-2 pb-4 mb-4 border-b border-white/10 no-scrollbar">
                         {[Platform.Amazon, Platform.Shopify, Platform.Meesho, Platform.Instagram, Platform.WhatsApp].map((p) => (
                             <button
                                key={p}
                                onClick={() => setActivePlatform(p)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                    activePlatform === p 
                                    ? 'bg-primary text-white' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                             >
                                 {p}
                             </button>
                         ))}
                     </div>
                     
                     <AnimatePresence mode="wait">
                         <motion.div
                            key={activePlatform}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                         >
                             {renderPlatformContent()}
                         </motion.div>
                     </AnimatePresence>
                 </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CopyButton = ({ text, label, onCopy, isCopied }: { text: string, label: string, onCopy: () => void, isCopied: boolean }) => (
    <button
        onClick={onCopy}
        className="w-full mt-2 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all group"
    >
        {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-400 group-hover:text-white" />}
        {isCopied ? "Copied!" : label}
    </button>
);

const CopyButtonMinimal = ({ onClick, isCopied }: { onClick: () => void, isCopied: boolean }) => (
    <button onClick={onClick} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
        {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
);
