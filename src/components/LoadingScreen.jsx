import { motion } from 'framer-motion';
import { Loader2, HeartPulse, Sparkles } from 'lucide-react';

const LoadingScreen = ({ message = 'Analyzing...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card max-w-md w-full text-center py-12">
        {/* Animated icon */}
        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <HeartPulse className="w-12 h-12 text-white" />
          </motion.div>
          
          {/* Orbiting sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            <Sparkles className="absolute top-0 left-1/2 w-6 h-6 text-primary-400" />
            <Sparkles className="absolute bottom-0 right-1/2 w-4 h-4 text-secondary-400" />
            <Sparkles className="absolute top-1/2 left-0 w-5 h-5 text-primary-300" />
            <Sparkles className="absolute top-1/2 right-0 w-4 h-4 text-secondary-300" />
          </motion.div>
        </div>

        {/* Loading spinner */}
        <div className="flex justify-center mb-6">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>

        {/* Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-gray-800 mb-3"
        >
          {message}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Our AI is processing your responses to provide personalized health insights.
        </motion.p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;