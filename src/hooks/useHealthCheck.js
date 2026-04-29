import { useState, useCallback } from 'react';
import {
  generateInitialQuestion,
  generateNextQuestion,
  generateFinalAnalysis,
} from '../services/groqService';

const MAX_QUESTIONS = 8;

/**
 * Custom hook to manage the health check flow
 * Handles state for questions, answers, loading states, and analysis
 */
const useHealthCheck = () => {
  // State management
  const [status, setStatus] = useState('idle'); // idle, initial-concern, questioning, analyzing, complete, error
  const [initialConcern, setInitialConcern] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  /**
   * Start the health check with user's initial concern
   */
  const startHealthCheck = useCallback(async (concern) => {
    try {
      setIsLoading(true);
      setLoadingMessage('Generating your first question...');
      setInitialConcern(concern);
      setStatus('questioning');
      
      // Generate initial question
      const question = await generateInitialQuestion(concern);
      setCurrentQuestion(question);
      setQuestionNumber(1);
      setConversationHistory([
        { role: 'user', content: `My health concern is: ${concern}` },
        { role: 'assistant', content: question },
      ]);
      
      setIsLoading(false);
      setLoadingMessage('');
    } catch (err) {
      console.error('Error starting health check:', err);
      setError(err.message);
      setStatus('error');
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  /**
   * Submit an answer to the current question
   */
  const submitAnswer = useCallback(async (answer) => {
    if (!answer.trim()) return;
    
    try {
      setIsLoading(true);
      setLoadingMessage('Analyzing your response...');
      
      // Add user's answer to history
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: answer },
      ];
      
      setConversationHistory(updatedHistory);
      
      // Check if we've reached the maximum number of questions
      if (questionNumber >= MAX_QUESTIONS) {
        setLoadingMessage('Generating your health analysis...');
        setStatus('analyzing');
        
        // Generate final analysis
        const result = await generateFinalAnalysis(updatedHistory);
        setAnalysis(result);
        setStatus('complete');
        setIsLoading(false);
        setLoadingMessage('');
        return;
      }
      
      // Generate next question
      const nextQuestion = await generateNextQuestion(updatedHistory, questionNumber + 1);
      
      // Update state
      const newQuestionNumber = questionNumber + 1;
      setCurrentQuestion(nextQuestion);
      setQuestionNumber(newQuestionNumber);
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: nextQuestion },
      ]);
      
      setIsLoading(false);
      setLoadingMessage('');
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError(err.message);
      setStatus('error');
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [conversationHistory, questionNumber]);

  /**
   * Reset the health check to start over
   */
  const resetHealthCheck = useCallback(() => {
    setStatus('idle');
    setInitialConcern('');
    setCurrentQuestion('');
    setConversationHistory([]);
    setQuestionNumber(0);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
    setStatus('idle');
  }, []);

  // Calculate progress percentage
  const progress = questionNumber > 0 ? (questionNumber / MAX_QUESTIONS) * 100 : 0;

  return {
    // State
    status,
    initialConcern,
    currentQuestion,
    conversationHistory,
    questionNumber,
    analysis,
    error,
    isLoading,
    loadingMessage,
    progress,
    maxQuestions: MAX_QUESTIONS,
    
    // Actions
    startHealthCheck,
    submitAnswer,
    resetHealthCheck,
    clearError,
  };
};

export default useHealthCheck;