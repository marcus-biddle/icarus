export function formatAndCapitalize(inputString) {
    // Replace "-" with an empty space
    const stringWithoutHyphen = inputString.replace(/\//g, '').replace(/-/g, ' ');
  
    // Capitalize each word
    const formattedString = stringWithoutHyphen
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    return formattedString;
  }