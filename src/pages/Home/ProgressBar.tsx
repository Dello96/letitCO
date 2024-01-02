import React from 'react';
// import { ChangeEvent, useState } from 'react';
import { StBookTitle, StCompletedPercent } from './style';
interface ProgressBar {
  percentage: number;
  title?: string;
}

function ProgressBar({ percentage, title }: ProgressBar) {
  //   const [inputValue, setInputValue] = useState<number>(0);
  //   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const newValue = parseFloat(event.target.value);
  //     setInputValue(newValue);
  //   };

  const calculatePercentage = () => {
    const clampedValue = Math.min(100, Math.max(0, percentage));
    return clampedValue;
  };

  return (
    <div>
      <StBookTitle> 📖 {title}</StBookTitle>

      <div style={{ marginTop: '40px' }}>
        <div
          style={{
            position: 'relative',
            height: '30px;',
            width: '910px;',
            backgroundColor: '#d8d8d8',
            borderRadius: '20px'
          }}
        >
          <div
            style={{
              width: `${calculatePercentage()}%`,
              height: '30px',
              backgroundColor: 'lightblue',
              borderRadius: '20px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>
      <StCompletedPercent>{`${Math.floor(calculatePercentage())}% 책 읽기 완료!`}</StCompletedPercent>
    </div>
  );
}

export default ProgressBar;
