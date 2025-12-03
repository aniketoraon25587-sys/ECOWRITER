import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, Copy, ArrowRight, Smartphone, Image as ImageIcon, Trash2 } from 'lucide-react';
import { submitPaymentProof } from '../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: { name: string; price: string };
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const [step, setStep] = useState<'PAY' | 'SUCCESS'>('PAY');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upiId: '',
    txnId: '',
    screenshot: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate QR Code URL
  const upiId = '9131547252@ptyes';
  // Ensure parameters are properly encoded
  const payeeName = encodeURIComponent("ECOWRITER AI");
  const qrData = `upi://pay?pa=${upiId}&pn=${payeeName}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  useEffect(() => {
    // Cleanup preview URL on unmount
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, screenshot: file }));
      
      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, screenshot: null }));
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.screenshot) {
      alert("Please upload a screenshot of your payment.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitPaymentProof({
        ...formData,
        planName: plan.name,
        amount: plan.price
      });
      setStep('SUCCESS');
    } catch (error) {
      console.error("Submission error", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    // Could add a toast notification here
    const btn = document.getElementById('copy-btn');
    if (btn) {
       const originalText = btn.innerHTML;
       btn.innerHTML = '<span class="text-green-400">Copied!</span>';
       setTimeout(() => btn.innerHTML = originalText, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0F0F12] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px]"
      >
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white z-10 p-2 bg-black/50 rounded-full"
        >
          <X size={24} />
        </button>

        {step === 'PAY' ? (
          <>
            {/* Left Side: Payment Instructions */}
            <div className="w-full md:w-5/12 bg-gradient-to-b from-indigo-900/20 to-black p-8 border-r border-white/10 flex flex-col relative overflow-y-auto">
               <div className="mb-6">
                 <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                    {plan.name} Plan
                 </span>
                 <h2 className="text-3xl font-bold text-white mt-2">{plan.price} <span className="text-sm text-gray-400 font-normal">/ month</span></h2>
               </div>

               <div className="space-y-6">
                  <div className="bg-white p-4 rounded-2xl w-max mx-auto shadow-lg">
                    {/* QR Code */}
                    <img 
                      src={qrUrl} 
                      alt="Payment QR Code" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Scan to pay with any UPI app</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm">
                        {upiId}
                      </div>
                      <button 
                        id="copy-btn"
                        onClick={handleCopyUPI}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 transition-colors"
                        title="Copy UPI ID"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                    <p className="text-yellow-200 text-sm leading-relaxed">
                      ⚠️ <strong>Important:</strong> After payment, please fill the form on the right to verify your transaction instantly.
                    </p>
                  </div>
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-7/12 p-8 bg-[#0F0F12] relative overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 hidden md:block text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">Verify Payment</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your payment details to activate your plan.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">Your UPI ID</label>
                  <input 
                    required
                    type="text" 
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="example@okhdfcbank"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">Transaction ID / UTR</label>
                  <input 
                    type="text" 
                    name="txnId"
                    value={formData.txnId}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="12 digit transaction ID"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">Upload Payment Screenshot</label>
                  <div className="relative">
                    <input 
                      required
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label 
                      htmlFor="screenshot-upload"
                      className={`w-full min-h-[120px] border-2 border-dashed ${previewUrl ? 'border-primary/50 bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'} rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group`}
                    >
                      {previewUrl ? (
                        <div className="relative w-full h-full p-2 flex flex-col items-center">
                          <img src={previewUrl} alt="Preview" className="h-24 object-contain rounded-md shadow-lg" />
                          <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors" onClick={clearFile}>
                            <Trash2 size={16} className="text-white" />
                          </div>
                          <span className="text-xs text-primary mt-2 font-medium">{formData.screenshot?.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                          <span className="text-sm text-gray-300 font-medium">Click to upload screenshot</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG supported</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 mt-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/50 hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? (
                    'Verifying Payment...'
                  ) : (
                    <>
                      Submit Payment Proof <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          // Success State
          <div className="w-full p-8 md:p-16 flex flex-col items-center justify-center text-center bg-[#0F0F12] relative">
             <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <Check className="w-12 h-12 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Payment Under Verification</h2>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
              Thank you, <strong>{formData.name}</strong>! We have received your payment proof for the <strong>{plan.name} Plan</strong>. 
              <br/><br/>
              Our team will verify the transaction ID <strong>{formData.txnId}</strong>. You will receive a confirmation via Email/WhatsApp within <strong>5–15 minutes</strong>.
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-sm w-full mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Smartphone size={20} className="text-green-500" />
                    </div>
                    <div className="text-left">
                        <p className="text-white text-sm font-medium">Confirmation sent to:</p>
                        <p className="text-gray-400 text-xs">{formData.email}</p>
                    </div>
                </div>
            </div>

            <button 
              onClick={onClose}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
