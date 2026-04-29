import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight, Sparkles } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
  const [concern, setConcern] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (concern.trim()) {
      onStart(concern);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card max-w-2xl w-full text-center">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="text-gradient">AI Health Checker</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-6"
        >
          Get personalized health insights powered by AI
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 space-y-4 text-gray-700"
        >
          <p>
            Our AI-powered health assistant will ask you a series of questions 
            about your symptoms to help identify potential health conditions.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary-600 font-medium">
            <Sparkles className="w-5 h-5" />
            <span>Takes about 2-3 minutes</span>
          </div>
        </motion.div>

        {/* Input Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label 
              htmlFor="concern" 
              className="block text-left text-sm font-medium text-gray-700 mb-2"
            >
              What health concern would you like to discuss today?
            </label>
            <textarea
              id="concern"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="E.g., I have a persistent cough and fever..."
              className="input-field resize-none h-32"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!concern.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Start Health Check</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.form>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-6 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span>Personalized Questions</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Instant Results</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;