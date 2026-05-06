/**
 * AI Prompts for the Health Checker App
 * These prompts guide the AI in generating questions and analyzing symptoms
 */

export const SYSTEM_PROMPT = `You are a helpful, empathetic health assistant AI. Your role is to:
1. Ask relevant health questions one at a time to understand the user's symptoms
2. Analyze the responses to narrow down potential health conditions
3. Provide a comprehensive analysis with possible conditions, confidence scores, and recommendations

IMPORTANT GUIDELINES:
- Ask clear, simple questions that are easy to understand
- Focus on symptom characteristics: duration, severity, triggers, associated symptoms
- Be empathetic and supportive in your tone
- Never diagnose definitively - always suggest consulting a healthcare professional
- Consider common conditions first before rare ones
- Ask about red flag symptoms that require immediate attention

When generating questions, consider:
- Current symptoms and their characteristics
- Medical history relevant to the symptoms
- Lifestyle factors that might contribute
- Medications or treatments already tried
- Family history if relevant`;

/**
 * Generate the initial question prompt with the user's concern
 * @param {string} initialConcern - The user's initial health concern
 * @returns {string} The formatted prompt
 */
export const getInitialQuestionPrompt = (initialConcern) => {
  return `Based on the user's initial concern, generate the first question to understand their symptoms better. Start with open-ended questions about their main complaint.

User's initial concern: "${initialConcern}"

Generate a single, clear question.`;
};

/**
 * Generate the next question prompt with conversation history
 * @param {string} conversationHistory - Formatted conversation history
 * @param {number} questionNumber - Current question number
 * @returns {string} The formatted prompt
 */
export const getNextQuestionPrompt = (conversationHistory, questionNumber) => {
  return `Based on the conversation so far, generate the next most relevant question to narrow down potential health conditions.

CONVERSATION HISTORY:
${conversationHistory}

Current question number: ${questionNumber} of 10

Generate a single, clear follow-up question that will help identify the potential condition. Focus on the most important aspect we haven't explored yet.`;
};

/**
 * Generate the final analysis prompt with the complete conversation
 * @param {string} conversation - Formatted complete conversation
 * @returns {string} The formatted prompt
 */
export const getFinalAnalysisPrompt = (conversation) => {
  return `Analyze the following health assessment conversation and provide a comprehensive analysis.

CONVERSATION:
${conversation}

Please provide your analysis in the following JSON format:
{
  "conditions": [
    {
      "name": "Condition name",
      "confidence": 75,
      "severity": "mild|moderate|severe",
      "reasoning": "Why this condition is suspected"
    }
  ],
  "homeRemedies": [
    "Remedy 1",
    "Remedy 2"
  ],
  "overTheCounterMeds": [
    "Medication 1",
    "Medication 2"
  ],
  "redFlags": [
    "Warning sign 1",
    "Warning sign 2"
  ],
  "prevention": [
    "Preventive measure 1",
    "Preventive measure 2"
  ],
  "whenToSeeDoctor": "Clear guidance on when to seek professional help",
  "disclaimer": "A brief medical disclaimer"
}

Provide 3-5 possible conditions with confidence scores (0-100). Be conservative in your assessments.`;
};

export const DISCLAIMER = `⚠️ **Medical Disclaimer**: This tool provides AI-generated health information and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read here. In case of a medical emergency, call your doctor or emergency services immediately.`;