import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Pill, 
  Home, 
  Shield, 
  Clock, 
  RefreshCw,
  Copy,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { DISCLAIMER } from '../utils/prompts';

const ResultsDashboard = ({ analysis, onRestart }) => {
  const [expandedSections, setExpandedSections] = useState({
    conditions: true,
    remedies: false,
    meds: false,
    redFlags: true,
    prevention: false,
    doctor: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'severe':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 70) return 'text-green-600';
    if (confidence >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const copyToClipboard = () => {
    const text = `
Health Analysis Results
=======================

Possible Conditions:
${analysis?.conditions?.map(c => `- ${c.name} (${c.confidence}% confidence, ${c.severity} severity)
  Reasoning: ${c.reasoning}`).join('\n')}

Home Remedies:
${analysis?.homeRemedies?.map(r => `- ${r}`).join('\n')}

Over-the-Counter Medications:
${analysis?.overTheCounterMeds?.map(m => `- ${m}`).join('\n')}

Red Flags (Seek Immediate Care):
${analysis?.redFlags?.map(f => `- ${f}`).join('\n')}

Preventive Measures:
${analysis?.prevention?.map(p => `- ${p}`).join('\n')}

When to See a Doctor:
${analysis?.whenToSeeDoctor}

${DISCLAIMER}
    `.trim();
    
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 pb-12"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card mb-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Health Analysis
          </h1>
          <p className="text-gray-600">
            Based on your responses, here are the AI-generated insights
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="btn-secondary flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Results</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Assessment</span>
          </motion.button>
        </div>

        {/* Possible Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <button
            onClick={() => toggleSection('conditions')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Possible Conditions
              </h2>
            </div>
            {expandedSections.conditions ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.conditions && (
            <div className="mt-4 space-y-4">
              {analysis?.conditions?.map((condition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {condition.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(condition.severity)}`}>
                      {condition.severity}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Confidence</span>
                      <span className={`font-semibold ${getConfidenceColor(condition.confidence)}`}>
                        {condition.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          condition.confidence >= 70 ? 'bg-green-500' :
                          condition.confidence >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${condition.confidence}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {condition.reasoning}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Red Flags */}
        {analysis?.redFlags?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card mb-6 border-red-200 bg-red-50"
          >
            <button
              onClick={() => toggleSection('redFlags')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-red-800">
                  ⚠️ Red Flags - Seek Immediate Care
                </h2>
              </div>
              {expandedSections.redFlags ? (
                <ChevronUp className="w-5 h-5 text-red-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-red-500" />
              )}
            </button>
            
            {expandedSections.redFlags && (
              <div className="mt-4 space-y-2">
                {analysis.redFlags.map((flag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-red-700"
                  >
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Home Remedies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          <button
            onClick={() => toggleSection('remedies')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Home Remedies
              </h2>
            </div>
            {expandedSections.remedies ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.remedies && (
            <div className="mt-4 space-y-2">
              {analysis?.homeRemedies?.map((remedy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{remedy}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Over-the-Counter Medications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-6"
        >
          <button
            onClick={() => toggleSection('meds')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Over-the-Counter Medications
              </h2>
            </div>
            {expandedSections.meds ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.meds && (
            <div className="mt-4 space-y-2">
              {analysis?.overTheCounterMeds?.map((med, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <Pill className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{med}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Prevention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-6"
        >
          <button
            onClick={() => toggleSection('prevention')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Preventive Measures
              </h2>
            </div>
            {expandedSections.prevention ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.prevention && (
            <div className="mt-4 space-y-2">
              {analysis?.prevention?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <Shield className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* When to See a Doctor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card mb-6"
        >
          <button
            onClick={() => toggleSection('doctor')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                When to See a Doctor
              </h2>
            </div>
            {expandedSections.doctor ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.doctor && (
            <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <p className="text-gray-700">{analysis?.whenToSeeDoctor}</p>
            </div>
          )}
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="card bg-yellow-50 border-yellow-200"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Medical Disclaimer
              </h3>
              <p className="text-sm text-yellow-700">
                {DISCLAIMER.replace('⚠️ **Medical Disclaimer**: ', '')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;