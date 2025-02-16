import { useState } from "react";

const CreatePollForm = ({ 
  onSubmit,
  onCancel 
}: { 
  onSubmit: (question: string, options: string[]) => void,
  onCancel: () => void
}) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  
  const addOptionInput = () => {
    setOptions([...options, '']);
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };
  
  const handleSubmit = () => {
    // Validate inputs
    if (question.trim() === '' || options.some(opt => opt.trim() === '')) {
      alert('Please fill in all fields');
      return;
    }
    
    const filteredOptions = options.filter(opt => opt.trim() !== '');
    if (filteredOptions.length < 2) {
      alert('Please add at least two options');
      return;
    }
    
    onSubmit(question, filteredOptions);
    setQuestion('');
    setOptions(['', '']);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create a New Poll</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="question">
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your question..."
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Options</label>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addOptionInput}
          className="text-blue-500 hover:text-blue-600 text-sm mt-2"
        >
          + Add another option
        </button>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default CreatePollForm;