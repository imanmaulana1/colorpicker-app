import React, { useState, useRef } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);
  const colorRefs = useRef([]);

  const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Magenta', hex: '#FF00FF' },
  ];

  const handleClick = (obj) => {
    setSelectedColor((prevState) => ({
      ...prevState,
      hex: obj.hex,
      name: obj.name,
    }));
  };

  const handleMouseEnter = (hex) => {
    setSelectedColor((prevState) => ({ ...prevState, hex: hex }));
  };

  const handleMouseLeave = () => {
    setSelectedColor({ hex: null, name: null });
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      let nextIndex = (index + 1) % colors.length;
      setFocusedIndex(nextIndex);
      setSelectedColor(colors[nextIndex]);
      colorRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      let prevIndex = (index - 1 + colors.length) % colors.length;
      setFocusedIndex(prevIndex);
      setSelectedColor(colors[prevIndex]);
      colorRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className='color-picker'>
      <h1>Color Picker</h1>
      <div className='color-list'>
        {colors.map((color, index) => (
          <div
            key={index}
            ref={(el) => (colorRefs.current[index] = el)}
            className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color.hex)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          >
            {selectedColor.hex === color.hex && (
              <span className='color-code'>
                {selectedColor.name || color.hex}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
