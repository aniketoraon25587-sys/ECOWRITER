import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Zap, ShoppingBag, Globe, 
  Camera, Repeat, Star, Check, ChevronDown, ChevronUp,
  Instagram, MessageCircle, ShoppingCart, Truck
} from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onPlanSelect: (plan: { name: string; price: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onPlanSelect }) => {
  return (
    <div className="bg-dark min-h-screen w-full overflow-x-hidden text-white selection:bg-primary/30">
      <HeroHeader onStart={onStart} />
      <FeatureSection />
      <DemoSection />
      <BenefitsSection />
      <PlatformTabs />
      <PricingSection onStart={onStart} onPlanSelect={onPlanSelect} />
      <TestimonialsSection />
      <FAQSection />
      <Footer onStart={onStart} />
    </div>
  );
};

// --- 1. Hero Header Section ---
const HeroHeader: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-gray-300">Powered by Gemini 2.5 Pro</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight leading-[1.1]"
        >
          Create High-Converting <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Product Descriptions
          </span> in Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          AI-powered descriptions for Amazon, Meesho, Shopify, Instagram & WhatsApp — optimized for SEO, conversions, and brand voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] focus:outline-none ring-offset-2 ring-offset-dark focus:ring-2 focus:ring-primary w-full sm:w-auto"
          >
            <span className="mr-2 text-lg">Start Writing</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white backdrop-blur-sm w-full sm:w-auto"
          >
            Try Free (No Login)
          </button>
        </motion.div>

        {/* Trust Bar */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 pt-8 border-t border-white/5"
        >
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest font-semibold">Trusted by 12,000+ sellers worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['Amazon', 'Shopify', 'Meesho', 'Flipkart', 'WooCommerce'].map((brand) => (
                    <span key={brand} className="text-xl font-display font-bold text-white">{brand}</span>
                ))}
            </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- 2. Key Features Section ---
const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "AI Description Writer",
      desc: "Generate SEO titles, bullets & long descriptions tailored for any product."
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-purple-400" />,
      title: "Platform-Specific Listings",
      desc: "Amazon, Meesho, Shopify, Instagram & WhatsApp-optimized outputs."
    },
    {
      icon: <Camera className="w-6 h-6 text-blue-400" />,
      title: "Image → Description",
      desc: "Upload your product photo, ECOWRITER extracts features & auto-writes content."
    },
    {
      icon: <Repeat className="w-6 h-6 text-green-400" />,
      title: "One-Click Revisions",
      desc: "Make it shorter, more emotional, luxury tone, or fun — instantly."
    }
  ];

  return (
    <div className="py-24 bg-dark relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Everything You Need to Sell More</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Powerful tools designed to skyrocket your e-commerce business.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block group-hover:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. Demo Section ---
const DemoSection: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    
    const demoProduct = "Wireless Noise Cancelling Headphones";
    const demoOutput = "Experience silence like never before. Our premium Wireless Headphones feature industry-leading noise cancellation, 30-hour battery life, and ultra-plush ear cups for all-day comfort. Perfect for travel, work, or pure relaxation.";

    const runDemo = () => {
        if(isTyping || showOutput) return;
        setIsTyping(true);
        setInputValue("");
        let i = 0;
        const typeInterval = setInterval(() => {
            setInputValue(demoProduct.substring(0, i + 1));
            i++;
            if (i === demoProduct.length) {
                clearInterval(typeInterval);
                setIsTyping(false);
                setTimeout(() => setShowOutput(true), 500);
            }
        }, 50);
    };

    return (
        <div className="py-20 bg-gradient-to-b from-dark to-black/50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative">
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]" />

                    <div className="relative z-10 text-center space-y-8">
                        <div className="space-y-2">
                            <span className="text-primary font-bold tracking-wider text-sm uppercase">Live Demo</span>
                            <h3 className="text-3xl font-bold text-white">See ECOWRITER in Action</h3>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative w-full">
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    readOnly
                                    placeholder="Enter your product name..."
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {isTyping && <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-5 bg-primary animate-pulse" />}
                            </div>
                            <button 
                                onClick={runDemo}
                                disabled={isTyping || showOutput}
                                className={`px-8 py-4 rounded-xl font-bold text-white whitespace-nowrap transition-all ${isTyping || showOutput ? 'bg-gray-700 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:scale-105'}`}
                            >
                                {isTyping ? 'Typing...' : 'Generate'}
                            </button>
                        </div>

                        <AnimatePresence>
                            {showOutput && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-white/5 border border-white/10 rounded-xl p-6 text-left"
                                >
                                    <div className="flex gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <p className="text-gray-200 leading-relaxed font-mono text-sm md:text-base">
                                        {demoOutput}
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded border border-primary/20">#SEO</span>
                                        <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded border border-secondary/20">#Conversion</span>
                                    </div>
                                    <button 
                                        onClick={() => { setShowOutput(false); setInputValue(""); }}
                                        className="mt-4 text-xs text-gray-500 hover:text-white underline"
                                    >
                                        Try another
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 4. Benefits Section ---
const BenefitsSection: React.FC = () => {
    return (
        <div className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                     <div className="space-y-4">
                         <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-4 mx-auto md:mx-0">
                             <ShoppingCart size={24} />
                         </div>
                         <h3 className="text-2xl font-bold text-white">Increase Conversions</h3>
                         <p className="text-gray-400 leading-relaxed">Persuasive, benefit-driven copy that addresses customer pain points and drives sales.</p>
                     </div>
                     <div className="space-y-4">
                         <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-4 mx-auto md:mx-0">
                             <Zap size={24} />
                         </div>
                         <h3 className="text-2xl font-bold text-white">List Products Faster</h3>
                         <p className="text-gray-400 leading-relaxed">Reduce listing creation time from 20 minutes to 10 seconds. Focus on sourcing, not writing.</p>
                     </div>
                     <div className="space-y-4">
                         <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-4 mx-auto md:mx-0">
                             <Globe size={24} />
                         </div>
                         <h3 className="text-2xl font-bold text-white">Multi-Language Support</h3>
                         <p className="text-gray-400 leading-relaxed">Expand globally. Write listings in 50+ languages including Hindi, Spanish, French & Arabic.</p>
                     </div>
                 </div>
            </div>
        </div>
    )
}

// --- 5. Platform Tabs Section ---
const PlatformTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Amazon');
    
    const platforms = [
        { id: 'Amazon', icon: <ShoppingCart size={16} />, color: 'from-yellow-500 to-orange-500' },
        { id: 'Meesho', icon: <Truck size={16} />, color: 'from-pink-500 to-red-500' },
        { id: 'Shopify', icon: <ShoppingBag size={16} />, color: 'from-green-500 to-emerald-500' },
        { id: 'Instagram', icon: <Instagram size={16} />, color: 'from-purple-500 to-pink-500' },
        { id: 'WhatsApp', icon: <MessageCircle size={16} />, color: 'from-green-400 to-green-600' },
    ];

    const content: Record<string, string> = {
        Amazon: "✅ ACTIVE NOISE CANCELLATION: Advanced ANC technology significantly reduces aviation and commute noise.\n✅ 30-HOUR BATTERY LIFE: Enjoy music for up to 30 hours per charge.\n✅ ULTRA-COMFORTABLE: Plush ear cushions for all-day wear.",
        Meesho: "Best Quality Wireless Headphones. 🔊 Bass Sound. 🔋 Long Battery. 🚚 Fast Delivery. Cash on Delivery Available!",
        Shopify: "<p><strong>Immerse yourself in music.</strong></p><p>Discover the new standard of sound with our <em>ProSeries Wireless Headphones</em>. Engineered for the audiophile in you.</p>",
        Instagram: "Silence the noise. Amplify the vibe. 🎧✨\n\nGrab your ProSeries today! Link in bio. \n\n#MusicLover #Tech #Headphones #OOTD",
        WhatsApp: "Hey! 👋 Check out our new Headphones! 50% OFF for the next 24 hours only! 🎵 Shop here: [Link]"
    };

    return (
        <div className="py-24 bg-black/30">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12">Optimized for Every Platform</h2>
                
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {platforms.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setActiveTab(p.id)}
                            className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${
                                activeTab === p.id 
                                ? `bg-gradient-to-r ${p.color} text-white shadow-lg scale-105` 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {p.icon} {p.id}
                        </button>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md text-left min-h-[200px] flex items-center">
                     <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                             <div className="flex gap-2 mb-4 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-gray-500" />
                                <div className="w-3 h-3 rounded-full bg-gray-500" />
                             </div>
                             <pre className="whitespace-pre-wrap font-sans text-gray-200 text-lg leading-relaxed">
                                 {content[activeTab]}
                             </pre>
                        </motion.div>
                     </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// --- 6. Pricing Section ---
interface PricingSectionProps {
    onStart: () => void;
    onPlanSelect: (plan: { name: string; price: string }) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onStart, onPlanSelect }) => {
    return (
        <div className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Simple Pricing</h2>
                    <p className="text-gray-400">Start for free. Upgrade as you grow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free */}
                    <PricingCard 
                        title="Free" 
                        price="₹0" 
                        features={['10 Generations/mo', 'Basic SEO', 'Standard Support']}
                        onSelect={onPlanSelect}
                    />
                    {/* Pro */}
                    <PricingCard 
                        title="Pro" 
                        price="₹499" 
                        period="/mo"
                        features={['Unlimited Generations', 'All Platforms (Insta, Shopify...)', 'Save Projects', 'Priority Support']}
                        isPopular
                        onSelect={onPlanSelect}
                    />
                    {/* Business */}
                    <PricingCard 
                        title="Business" 
                        price="₹999" 
                        period="/mo"
                        features={['Bulk CSV Generator', 'API Access', 'Team Accounts', 'Brand Tone Presets']}
                        onSelect={onPlanSelect}
                    />
                </div>
            </div>
        </div>
    );
}

const PricingCard = ({ title, price, period, features, isPopular, onSelect }: any) => (
    <div className={`relative p-8 rounded-3xl border flex flex-col ${isPopular ? 'bg-white/10 border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
        {isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
            </div>
        )}
        <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
        <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold text-white">{price}</span>
            {period && <span className="text-gray-500 ml-1">{period}</span>}
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {f}
                </li>
            ))}
        </ul>
        <button 
            onClick={() => onSelect({ name: title, price })}
            className={`w-full py-3 rounded-xl font-bold transition-all ${isPopular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        >
            {title === "Free" ? "Get Started" : "Choose Plan"}
        </button>
    </div>
);

// --- 7. Testimonials Section ---
const TestimonialsSection: React.FC = () => {
    return (
        <div className="py-24 bg-gradient-to-b from-black/20 to-dark">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-16">Loved by Sellers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                        <div className="flex gap-1 mb-4">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-gray-300 italic mb-6">"Saved me 30 hours per week. Best tool for Amazon sellers. The SEO keywords are actually useful."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                            <div>
                                <h4 className="font-bold text-white text-sm">Rohan Mehta</h4>
                                <p className="text-xs text-gray-500">Amazon Seller, India</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                        <div className="flex gap-1 mb-4">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-gray-300 italic mb-6">"My Meesho sales doubled after rewriting my catalogs with ECOWRITER. It just understands the local market tone."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-600" />
                            <div>
                                <h4 className="font-bold text-white text-sm">Shruti Kapoor</h4>
                                <p className="text-xs text-gray-500">Fashion Boutique Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- 8. FAQ Section ---
const FAQSection: React.FC = () => {
    const faqs = [
        { q: "What is ECOWRITER?", a: "ECOWRITER is an AI-powered tool that automatically generates high-quality, SEO-optimized product descriptions for e-commerce platforms like Amazon, Shopify, and social media." },
        { q: "Are the descriptions unique?", a: "Yes! Our AI generates unique content every time based on your specific product features and brand tone, avoiding duplicate content penalties." },
        { q: "Does it support multiple languages?", a: "Absolutely. ECOWRITER can generate content in over 50 languages, helping you reach a global audience." },
    ];

    return (
        <div className="py-24 bg-dark">
             <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-display font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.q} answer={faq.a} />
                    ))}
                </div>
             </div>
        </div>
    );
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-bold text-white">{question}</span>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- 9. Footer ---
const Footer: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">E</div>
                            <span className="text-xl font-display font-bold text-white tracking-tight">ECOWRITER</span>
                        </div>
                        <p className="text-gray-500 text-sm">© 2024 ECOWRITER. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#" className="hover:text-white transition-colors">API Docs</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
