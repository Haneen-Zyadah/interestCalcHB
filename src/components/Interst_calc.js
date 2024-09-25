// src/App.js

import React, { useState } from "react";

function App() {
  // State to hold the price, interest rate, result, integer length, and modified result without decimals
  const [price, setPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);
  const [integerLength, setIntegerLength] = useState(null);
  const [modifiedResult, setModifiedResult] = useState(null);

  // Function to handle the calculation of the price with interest
  const calculateInterest = () => {
    const priceValue = parseFloat(price);
    const interestValue = parseFloat(interestRate);

    if (isNaN(priceValue) || isNaN(interestValue)) {
      alert("Please enter valid numbers for both price and interest rate.");
      return;
    }

    // Calculate interest amount and final price
    const interestAmount = (priceValue * interestValue) / 100;
    const finalPrice = priceValue + interestAmount;

    const finalPriceFormatted = finalPrice.toFixed(2); // Set result with 2 decimal places
    setResult(finalPriceFormatted);

    // Call function to get the length of the integer part of the result
    const length = getIntegerLength(finalPriceFormatted);
    setIntegerLength(length);

    // Transform the last two digits and set the modified result without decimals
    const transformedPrice = transformLastTwoDigits(finalPriceFormatted);
    setModifiedResult(transformedPrice);
  };

  // Function to get the length of the integer part before the decimal point
  const getIntegerLength = (number) => {
    const integerPart = number.toString().split(".")[0];
    return integerPart.length;
  };

  // Function to transform the last two digits of the integer part and return integer-only result
  const transformLastTwoDigits = (number) => {
    const [integerPart] = number.toString().split("."); // Get only the integer part before the decimal
    const lastTwoDigits = parseInt(integerPart.slice(-2)); // Get the last two digits as a number

    // Determine whether to transform to 49 or 99
    const transformedLastTwo = lastTwoDigits <= 49 ? 49 : 99;

    // Replace the last two digits of the integer part with the transformed value
    const transformedIntegerPart =
      integerPart.slice(0, -2) + transformedLastTwo.toString().padStart(2, "0");

    // Return the modified price without decimals (integer only)
    return transformedIntegerPart;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Interest Calculator</h2>
      
      <div>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </label>
      </div>
      
      <div>
        <label>
          Interest Rate (%):
          <input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter interest rate"
          />
        </label>
      </div>

      <button onClick={calculateInterest}>Calculate</button>

      {result && (
        <div>
          <h3> Final Price (with interest): <span className="result">${result}</span></h3>
          <h3>Transformed Final Price : <span className="modifiedResult">${modifiedResult}</span></h3>
        </div>
      )}
    </div>
  );
}

export default App;
