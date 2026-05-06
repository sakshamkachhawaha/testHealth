import Groq from 'groq-sdk';
import {
  SYSTEM_PROMPT,
  getInitialQuestionPrompt,
  getNextQuestionPrompt,
  getFinalAnalysisPrompt,
} from '../utils/prompts';

// Groq API Key - hardcoded for easy collaboration
const GROQ_API_KEY = "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";

// Initialize Groq client with API key
const getGroqClient = () => {
  return new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Required for browser usage
  });
};

/**
 * Generate the initial question based on user's concern
 * @param {string} initialConcern - The user's initial health concern
 * @returns {Promise<string>} - The generated question
 */
export const generateInitialQuestion = async (initialConcern) => {
  try {
    const groq = getGroqClient();
    const prompt = getInitialQuestionPrompt(initialConcern);
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 200,
    });
    
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating initial question:', error);
    throw error;
  }
};

/**
 * Generate the next question based on conversation history
 * @param {Array} conversationHistory - Array of {role, content} objects
 * @param {number} questionNumber - Current question number (1-10)
 * @returns {Promise<string>} - The generated question
 */
export const generateNextQuestion = async (conversationHistory, questionNumber) => {
  try {
    const groq = getGroqClient();
    
    // Format conversation history for the prompt
    const historyText = conversationHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    const prompt = getNextQuestionPrompt(historyText, questionNumber);
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 200,
    });
    
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating next question:', error);
    throw error;
  }
};

/**
 * Generate final analysis based on complete conversation
 * @param {Array} conversation - Array of {role, content} objects
 * @returns {Promise<Object>} - The analysis result in JSON format
 */
export const generateFinalAnalysis = async (conversation) => {
  try {
    const groq = getGroqClient();
    
    // Format conversation for the prompt
    const conversationText = conversation
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    const prompt = getFinalAnalysisPrompt(conversationText);
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });
    
    const analysisText = completion.choices[0].message.content.trim();
    
    // Parse JSON response
    try {
      const analysis = JSON.parse(analysisText);
      return analysis;
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.error('Raw response:', analysisText);
      throw new Error('Failed to parse AI analysis. Please try again.', { cause: parseError });
    }
  } catch (error) {
    console.error('Error generating final analysis:', error);
    throw error;
  }
};

/**
 * Test API connection
 * @returns {Promise<boolean>} - True if connection successful
 */
export const testApiConnection = async () => {
  try {
    const groq = getGroqClient();
    await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Hello' }],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 10,
    });
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};