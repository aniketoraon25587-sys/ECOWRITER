import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Wand2, ArrowLeft, ChevronDown } from 'lucide-react';
import { ProductFormData, Tone } from '../types';
import { TONES, SAMPLE_PROMPTS, CATEGORIES } from '../constants';

interface GeneratorFormProps {
  onSubmit: (data: ProductFormData) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, onBack, isLoading }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    category: '',
    features: '',
    brand: '',
    tone: Tone.Professional,
    audience: '',
    image: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fillSample = () => {
    const sample = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];
    setFormData(prev => ({
      ...prev,
      productName: sample.name,
      category: sample.category,
      features: sample.features,
      brand: 'EcoBrand',
      audience: 'Tech enthusiasts',
      tone: Tone.Luxury
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-dark py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8 relative"
      >
        <button 
          onClick={onBack}
          className="absolute -top-12 left-0 text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-white">Product Details</h2>
              <p className="text-gray-400 mt-1">Tell us about what you're selling.</p>
            </div>
            <button 
              type="button"
              onClick={fillSample}
              className="text-sm text-primary hover:text-secondary font-medium transition-colors flex items-center gap-1"
            >
              <Wand2 size={14} /> Auto-fill Sample
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Product Name *</label>
                <input
                  required
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="e.g., Wireless Noise Cancelling Headphones"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category *</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    list="category-options"
                    placeholder="Select or type a category..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <datalist id="category-options">
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                   <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Sony"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Audience */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Target Audience</label>
                <input
                  type="text"
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="e.g., Travelers, Audiophiles"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Tone of Voice</label>
                <div className="relative">
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
                  >
                    {TONES.map(t => <option key={t} value={t} className="bg-gray-900 text-white">{t}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Product Image (Optional)</label>
                <div className="relative">
                  {!formData.image ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-[50px] bg-black/20 border border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors group"
                    >
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary mr-2" />
                      <span className="text-gray-400 text-sm group-hover:text-white">Upload Image</span>
                    </div>
                  ) : (
                    <div className="w-full h-[50px] bg-black/20 border border-white/10 rounded-xl flex items-center justify-between px-4">
                      <span className="text-sm text-green-400 truncate">Image uploaded</span>
                      <button type="button" onClick={clearImage} className="text-gray-400 hover:text-red-400">
                        <X size={18} />
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Features / Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Key Features / Raw Description *</label>
              <textarea
                required
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                rows={5}
                placeholder="List the main features, specifications, or paste a rough draft here..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:scale-[1.02] focus:scale-[0.98] ${
                isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/50'
              }`}
            >
              {isLoading ? 'Generating Magic...' : 'Generate Description'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};