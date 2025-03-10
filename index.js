document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById('text');
  
  // Configuration
  const config = {
    typingSpeed: 100,
    eraseSpeed: 50,
    pauseBetweenTexts: 2000,
    pauseBeforeErasing: 2000
  };
  
  const commonPrefix = "> Welcome!<br>I'm Varun Muppalla, ";
  
  const textVariations = [
    "and I'm passionate about all things data!",
    "a finance enthusiast!",
    "I love basketball!"
  ];
  
  let currentTextIndex = 0;
  const cursorChar = '<span class="typing-cursor"></span>';
  
  function typeText(text, index = 0) {
    if (index < text.length) {
      // Handle HTML tags (type them at once)
      if (text[index] === '<') {
        const tagEnd = text.indexOf('>', index);
        if (tagEnd !== -1) {
          const tag = text.substring(index, tagEnd + 1);
          textElement.innerHTML = text.substring(0, index) + tag + cursorChar;
          setTimeout(() => typeText(text, tagEnd + 1), 0);
          return;
        }
      }
      
      textElement.innerHTML = text.substring(0, index + 1) + cursorChar;
      setTimeout(() => typeText(text, index + 1), config.typingSpeed);
    } else {
      setTimeout(() => eraseText(), config.pauseBeforeErasing);
    }
  }
  
  function eraseText() {
    const displayedText = textElement.innerHTML;
    const textWithoutCursor = displayedText.replace(/<span class="typing-cursor"><\/span>/, '');
    
    if (textWithoutCursor.length > commonPrefix.length) {
      textElement.innerHTML = textWithoutCursor.substring(0, textWithoutCursor.length - 1) + cursorChar;
      setTimeout(eraseText, config.eraseSpeed);
    } else {
      currentTextIndex = (currentTextIndex + 1) % textVariations.length;
      textElement.innerHTML = commonPrefix + cursorChar;
      
      setTimeout(() => {
        typeText(commonPrefix + textVariations[currentTextIndex], commonPrefix.length);
      }, config.pauseBetweenTexts);
    }
  }
  
  // Start the typing animation
  typeText(commonPrefix + textVariations[currentTextIndex]);
});