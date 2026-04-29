import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Brain, MessageCircle } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  maxQuestions, 
  progress, 
  isLoading, 
  loadingMessage,
  onSubmit 
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && !isLoading) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card max-w-2xl w-full">
        {/* Header with progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              Question {questionNumber} of {maxQuestions}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question content */}
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {question}
              </h2>
            </div>
          </div>
        </div>

        {/* Answer form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="answer" 
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <MessageCircle className="w-4 h-4" />
              Your answer:
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="input-field resize-none h-32"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={!answer.trim() || isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Submit Answer</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Loading message */}
        <AnimatePresence>
          {isLoading && loadingMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-primary-50 rounded-lg text-primary-700 text-sm text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loadingMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Be honest and detailed in your responses for the best analysis
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;