# AI Health Checker

An AI-powered health assessment application that uses Groq's fast inference to provide personalized health insights through an interactive question-and-answer flow.

## Features

- 🤖 **AI-Powered Analysis**: Uses Groq's Llama 3.1 70B model for intelligent symptom analysis
- 💬 **Interactive Q&A**: Dynamic question generation based on your responses
- 📊 **Detailed Results**: Provides possible conditions with confidence scores
- 🏠 **Home Remedies**: Suggests home treatments and over-the-counter medications
- ⚠️ **Red Flags**: Identifies warning signs that require immediate medical attention
- 🛡️ **Prevention**: Offers preventive measures for better health
- 📋 **Copy Results**: Easily copy your results to share with healthcare providers
- 🎨 **Beautiful UI**: Modern, calming design with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Groq API key (get one free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd health-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment variables**
   
   Create a `.env` file in the project root and add your Groq API key:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your API key:
   ```
   VITE_GROQ_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## How to Use

1. **Start a Health Check**: Enter your health concern in the welcome screen
2. **Answer Questions**: Respond to AI-generated questions about your symptoms
3. **Get Analysis**: Receive a comprehensive analysis with:
   - Possible conditions with confidence scores
   - Home remedies and OTC medications
   - Red flags requiring immediate attention
   - Preventive measures
   - Guidance on when to see a doctor

## Important Disclaimer

⚠️ **Medical Disclaimer**: This application provides AI-generated health information and is **NOT** a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read in this application. In case of a medical emergency, call your doctor or emergency services immediately.

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Groq SDK** - AI inference API

## Project Structure

```
health-checker/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx      # Landing page with initial input
│   │   ├── QuestionCard.jsx       # Question display and answer input
│   │   ├── LoadingScreen.jsx      # Loading animation during AI processing
│   │   ├── ResultsDashboard.jsx   # Final analysis results display
│   │   └── ErrorScreen.jsx        # Error handling and retry
│   ├── hooks/
│   │   └── useHealthCheck.js      # Main state management hook
│   ├── services/
│   │   └── groqService.js         # Groq API integration
│   ├── utils/
│   │   └── prompts.js             # AI prompt templates
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # App-specific styles
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles and Tailwind
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## API Configuration

The application uses Groq's API for AI inference. You can configure the following:

- **Model**: Currently set to `llama-3.1-70b-versatile` (you can change this in `groqService.js`)
- **Temperature**: Set to 0.7 for balanced creativity/consistency
- **Max Questions**: Set to 8 in `useHealthCheck.js` (you can adjust this)

## Troubleshooting

### Common Issues

1. **"Groq API key is missing" error**
   - Make sure you've created a `.env` file with your API key
   - Restart your development server after adding the key

2. **API rate limit errors**
   - Groq has rate limits on their free tier
   - Wait a few minutes and try again

3. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf dist && npm run build`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the [Groq documentation](https://console.groq.com/docs)
2. Review the error messages in the browser console
3. Ensure your API key is valid and has available credits

---

**Remember**: This tool is designed to provide information and insights, not medical diagnoses. Always consult with qualified healthcare professionals for medical advice.