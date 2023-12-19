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

export function getInitials(name) {
  // Split the name into words
  const words = name.split(" ");

  // Extract the first letter of each word
  const initials = words.map(word => word[0]);

  // Join the initials to form the result
  return initials.join("").toUpperCase();
}