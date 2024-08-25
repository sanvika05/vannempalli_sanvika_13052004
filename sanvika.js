import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInputJson(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(inputJson);
      setIsValidJson(true);

      const apiResponse = await axios.post('https://testbfhl.herokuapp.com/bfhl', jsonData);
      setResponse(apiResponse.data);
    } catch (error) {
      setIsValidJson(false);
      setResponse(null);
      console.error('Invalid JSON or API error:', error);
    }
  };

  const handleDropdownChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { alphabets, numbers, highest_lowercase } = response;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest Lowercase Alphabet') && highest_lowercase.length > 0 && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{highest_lowercase[0]}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <textarea
        value={inputJson}
        onChange={handleInputChange}
        placeholder='Enter JSON: {"data": ["A", "B", "c", "1", "2", "3"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {!isValidJson && <p style={{ color: 'red' }}>Invalid JSON input!</p>}

      {response && (
        <div>
          <h2>Choose what to display:</h2>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
