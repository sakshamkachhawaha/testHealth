import { AnimatePresence } from 'framer-motion';
import useHealthCheck from './hooks/useHealthCheck';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import LoadingScreen from './components/LoadingScreen';
import ResultsDashboard from './components/ResultsDashboard';
import ErrorScreen from './components/ErrorScreen';
import './App.css';

function App() {
  const {
    status,
    currentQuestion,
    questionNumber,
    maxQuestions,
    progress,
    isLoading,
    loadingMessage,
    analysis,
    error,
    startHealthCheck,
    submitAnswer,
    resetHealthCheck,
    clearError,
  } = useHealthCheck();

  const renderScreen = () => {
    switch (status) {
      case 'idle':
        return <WelcomeScreen onStart={startHealthCheck} />;
      
      case 'questioning':
        return (
          <QuestionCard
            question={currentQuestion}
            questionNumber={questionNumber}
            maxQuestions={maxQuestions}
            progress={progress}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            onSubmit={submitAnswer}
          />
        );
      
      case 'analyzing':
        return <LoadingScreen message={loadingMessage} />;
      
      case 'complete':
        return (
          <ResultsDashboard
            analysis={analysis}
            onRestart={resetHealthCheck}
          />
        );
      
      case 'error':
        return (
          <ErrorScreen
            error={error}
            onRetry={clearError}
          />
        );
      
      default:
        return <WelcomeScreen onStart={startHealthCheck} />;
    }
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </div>
  );
}

export default App;