import React, { useState, useEffect } from 'react';

// Define the questions and answers for the study app
// Questions are now more detailed, focusing on history and food specifics.
const studyContent = [
  {
    question: "What was Chef Dan Coughlin's primary method of learning Thai cuisine?",
    answer: "Watching his mother and grandmother in the kitchen, absorbing techniques.",
    options: [
      "Formal culinary school in Bangkok",
      "Reading numerous Thai cookbooks",
      "Watching his mother and grandmother in the kitchen, absorbing techniques.",
      "Working as a sous chef in various Thai restaurants across the US."
    ]
  },
  {
    question: "What was the initial concept behind Le Thai Downtown's atmosphere, distinguishing it from other Thai restaurants?",
    answer: "To establish a full-service restaurant with a 'casual and fun atmosphere' departing from 'stuffy' Thai restaurants.",
    options: [
      "A formal fine-dining experience with traditional Thai decor.",
      "A quick-service takeout spot with minimal seating.",
      "To establish a full-service restaurant with a 'casual and fun atmosphere' departing from 'stuffy' Thai restaurants.",
      "A traditional Thai tea house focusing solely on beverages."
    ]
  },
  {
    question: "What was the strategic reason for opening Le Thai 2 on W. Charleston Blvd.?",
    answer: "To primarily focus on take-out orders due to the overwhelming high demand at the Fremont location.",
    options: [
      "To expand into fine dining and offer a more exclusive menu.",
      "To cater to a new tourist demographic on the west side of Las Vegas.",
      "To primarily focus on take-out orders due to the overwhelming high demand at the Fremont location.",
      "To experiment with new fusion cuisines not offered at the downtown location."
    ]
  },
  {
    question: "What is the core duality of Le Thai's culinary philosophy, as driven by Chef Dan Coughlin?",
    answer: "A blend of classic Thai dishes inspired by family heritage and Chef Dan's own innovative fusion creations.",
    options: [
      "Strictly adhering to traditional Thai cuisine without any modern interpretations.",
      "Creating entirely modern fusion dishes with minimal traditional influence.",
      "A blend of classic Thai dishes inspired by family heritage and Chef Dan's own innovative fusion creations.",
      "Focusing solely on vegetarian and vegan Thai food options."
    ]
  },
  {
    question: "What was the name of Chef Dan Coughlin's first restaurant, which he later renamed Le Thai when moving to Fremont Street?",
    answer: "Mix Zone Café",
    options: [
      "Thai Kitchen Express",
      "Spice Garden Bistro",
      "Mix Zone Café",
      "Golden Elephant Eatery"
    ]
  },
  {
    question: "What is the traditional Thai name for Crispy Spring Rolls, as mentioned in the document?",
    answer: "Poh Piah Tod",
    options: [
      "Pad Thai",
      "Tom Yum",
      "Poh Piah Tod",
      "Green Curry"
    ]
  },
  {
    question: "How does Le Thai's Waterfall Beef preparation significantly differ from the traditional Nam Tok Neua (Thai Waterfall Beef Salad)?",
    answer: "Le Thai's version is a stir-fry featuring garlic soy sauce, while traditional Nam Tok Neua is a grilled meat salad with a lime and fish sauce-based dressing.",
    options: [
      "Le Thai's uses chicken instead of beef, while traditional uses beef.",
      "Le Thai's is a stir-fry featuring garlic soy sauce, while traditional Nam Tok Neua is a grilled meat salad with a lime and fish sauce-based dressing.",
      "Le Thai's is served cold, whereas the traditional dish is always served hot.",
      "Le Thai's uses a sweet sauce, while the traditional dish uses a very spicy one."
    ]
  },
  {
    question: "What specific elements make Le Thai's Short Rib Fried Rice unequivocally its 'crowning glory' and 'most famous' dish?",
    answer: "The use of pulled beef from short ribs and the direct integration of Le Thai's proprietary Waterfall Sauce into the stir-fry itself.",
    options: [
      "Its exceptionally low price point compared to other dishes.",
      "Its simple, straightforward preparation without complex ingredients.",
      "The use of pulled beef from short ribs and the direct integration of Le Thai's proprietary Waterfall Sauce into the stir-fry itself.",
      "Its status as a purely vegetarian dish, appealing to a wide audience."
    ]
  },
  {
    question: "What is the meaning behind the popular name 'Drunken Noodles' for Pad Kee Mao?",
    answer: "It alludes to its potent spiciness, supposedly enough to sober one up.",
    options: [
      "It is traditionally eaten by people who are intoxicated.",
      "It is made with a significant amount of rice wine.",
      "It alludes to its potent spiciness, supposedly enough to sober one up.",
      "It is a celebratory dish often served at parties."
    ]
  },
  {
    question: "What are the key components of traditional Thai Iced Tea (Cha Yen) before any alcohol is added?",
    answer: "Strongly brewed black tea (Ceylon or Assam), often infused with spices, sweetened with sugar and condensed milk, and topped with evaporated milk or half-and-half, served over ice.",
    options: [
      "Green tea with honey and fresh lemon juice.",
      "Strongly brewed black tea (Ceylon or Assam), often infused with spices, sweetened with sugar and condensed milk, and topped with evaporated milk or half-and-half, served over ice.",
      "A blend of fruit juices and sparkling water.",
      "Herbal tea with ginger and a touch of coconut milk."
    ]
  },
  {
    question: "What is Mekhong, a likely spirit used in Le Thai's 'Spike Thai Tea', technically classified as?",
    answer: "A rum-like spirit, predominantly made from molasses (95%) and rice (5%), blended with Thai herbs and spices.",
    options: [
      "A pure single malt whiskey.",
      "A clear, unaged vodka.",
      "A classic London Dry Gin.",
      "A rum-like spirit, predominantly made from molasses (95%) and rice (5%), blended with Thai herbs and spices."
    ]
  }
];

// Main App component
function App() {
  const [currentMode, setCurrentMode] = useState('home'); // 'home', 'flashcard', 'quiz'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Shuffle questions when component mounts or mode changes
  useEffect(() => {
    shuffleQuestions();
  }, [currentMode]);

  const shuffleQuestions = () => {
    // Create a shallow copy to shuffle, so the original array is not modified
    const shuffledContent = [...studyContent];
    for (let i = shuffledContent.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledContent[i], shuffledContent[j]] = [shuffledContent[j], shuffledContent[i]];
    }
    // Update studyContent to be the shuffled version for the current session
    // Note: In a real app, you might manage this more robustly with state
    // or ensure studyContent is not a const if it's meant to be mutable.
    // For this example, we'll just re-assign.
    Object.assign(studyContent, shuffledContent); // This updates the original array in place.

    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleNextFlashcard = () => {
    setShowAnswer(false);
    if (currentQuestionIndex < studyContent.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Loop back to the beginning or indicate end of flashcards
      setCurrentQuestionIndex(0);
      // Using a custom message box instead of alert()
      // In a real application, replace this with a custom modal component.
      console.log('You have gone through all flashcards! Starting over.');
    }
  };

  const handlePreviousFlashcard = () => {
    setShowAnswer(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Using a custom message box instead of alert()
      // In a real application, replace this with a custom modal component.
      console.log('You are at the first flashcard!');
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const correct = option === studyContent[currentQuestionIndex].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    if (currentQuestionIndex < studyContent.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    shuffleQuestions();
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Le Thai Study App</h1>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Welcome! Use this app to learn and memorize the content of your Le Thai research document.
      </p>
      <a
        href="https://docs.google.com/document/d/1KWtSeg4gBm89PbhbvU0NOakFp4FtB2NfNFYYc3IRnX4/edit?usp=drivesdk"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-6 py-3 mb-6 text-xl font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105 text-center"
      >
        Study the Document
      </a>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Once you've studied, choose a mode to test your knowledge:
      </p>
      <button
        onClick={() => setCurrentMode('flashcard')}
        className="w-full px-6 py-3 mb-4 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Flashcard Mode
      </button>
      <button
        onClick={() => setCurrentMode('quiz')}
        className="w-full px-6 py-3 text-xl font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Quiz Mode
      </button>
    </div>
  );

  const renderFlashcard = () => (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg w-full max-w-2xl min-h-[400px]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Flashcard Mode</h2>
      <div
        className="relative w-full h-64 rounded-lg perspective-1000 cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div
          className={`flashcard-flipper absolute w-full h-full transition-transform duration-500 ease-in-out transform ${showAnswer ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face (Question) */}
          <div
            className="flashcard-face flashcard-front absolute w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-center p-4 text-xl font-medium text-gray-700 border-2 border-dashed border-gray-300 backface-hidden"
          >
            {studyContent[currentQuestionIndex].question}
          </div>
          {/* Back Face (Answer) */}
          <div
            className="flashcard-face flashcard-back absolute w-full h-full bg-blue-100 rounded-lg flex items-center justify-center text-center p-4 text-xl font-medium text-blue-700 border-2 border-dashed border-blue-300 backface-hidden"
            style={{ transform: 'rotateY(180deg)' }} // Initially rotated to be hidden
          >
            {studyContent[currentQuestionIndex].answer}
          </div>
        </div>
      </div>
      <div className="flex mt-8 space-x-4 w-full justify-center">
        <button
          onClick={handlePreviousFlashcard}
          className="px-6 py-3 text-lg font-semibold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Previous
        </button>
        <button
          onClick={handleNextFlashcard}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Next
        </button>
      </div>
      <button
        onClick={() => setCurrentMode('home')}
        className="mt-6 px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Back to Home
      </button>
    </div>
  );

  const renderQuiz = () => (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg w-full max-w-2xl min-h-[500px]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz Mode</h2>
      {quizCompleted ? (
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-4">Quiz Completed!</p>
          <p className="text-xl text-gray-700 mb-6">Your score: {score} out of {studyContent.length}</p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => setCurrentMode('home')}
            className="mt-4 px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105 ml-4"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <>
          <p className="text-xl font-medium text-gray-700 mb-6 text-center">{studyContent[currentQuestionIndex].question}</p>
          <div className="w-full grid grid-cols-1 gap-4">
            {studyContent[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
                className={`w-full px-6 py-3 text-left text-lg font-medium rounded-lg shadow-sm transition duration-300 ease-in-out
                  ${selectedOption === option
                    ? (isCorrect ? 'bg-green-200 text-green-800 border-2 border-green-500' : 'bg-red-200 text-red-800 border-2 border-red-500')
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }
                  ${selectedOption !== null && option === studyContent[currentQuestionIndex].answer && selectedOption !== studyContent[currentQuestionIndex].answer
                    ? 'bg-green-200 text-green-800 border-2 border-green-500' // Highlight correct answer if wrong option was selected
                    : ''
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption !== null && (
            <div className={`mt-4 text-center text-xl font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect.'}
            </div>
          )}
          <button
            onClick={handleNextQuizQuestion}
            disabled={selectedOption === null}
            className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex < studyContent.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
          <button
            onClick={() => setCurrentMode('home')}
            className="mt-4 px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Home
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4 font-sans">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Basic styles for the flashcard flip effect */
          .perspective-1000 {
            perspective: 1000px;
          }
          .flashcard-flipper {
            transform-style: preserve-3d;
          }
          .flashcard-face {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden; /* For Safari */
          }
          .flashcard-back {
            transform: rotateY(180deg);
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
      {currentMode === 'home' && renderHome()}
      {currentMode === 'flashcard' && renderFlashcard()}
      {currentMode === 'quiz' && renderQuiz()}
    </div>
  );
}

export default App;
