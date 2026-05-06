import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';

const ErrorScreen = ({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card max-w-md w-full text-center">
        {/* Error icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <AlertCircle className="w-8 h-8 text-red-600" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>

        {/* Error message */}
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 text-left">
            {error || 'An unexpected error occurred. Please try again.'}
          </p>
        </div>

        {/* Common issues */}
        <div className="mb-6 text-left">
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Common issues:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check that your Groq API key is set correctly</li>
            <li>• Ensure you have an internet connection</li>
            <li>• Verify your API key has available credits</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorScreen;