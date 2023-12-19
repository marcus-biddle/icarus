export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const todaysDate = [`${getCurrentMonth()} ${new Date().getDate()}`];

export function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];
  
    return [currentMonth];
  }

  export const getCurrentMonthNumber = () => {
    const currentDate = new Date();
    return currentDate.getMonth() + 1; // Adding 1 because months are zero-based (0-11)
  };

  export const getMonthName = (monthNumber) => {
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1]; // Adjusting for zero-based indexing
    } else {
      return 'Invalid month number';
    }
  };

  export function getMonthsInCurrentYear() {
    // const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Adding 1 to get the month in the 1-12 range
    
    const monthsArray = [];
    
    for (let month = 0; month < currentMonth; month++) {
      monthsArray.push(months[month]);
    }
    
    return monthsArray;
  }

  export function getCurrentMonthSundays() {
    const sundays = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    const date = new Date(currentYear, currentMonth, 1); // Set the date to the first day of the current month
  
    // Loop through the days of the current month
    while (date.getMonth() === currentMonth) {
      if (date.getDay() === 0) {
        // If the day of the week (0 for Sunday) matches, it's a Sunday
        sundays.push(new Date(date).toDateString()); // Add the Sunday to the list
      }
      date.setDate(date.getDate() + 1); // Move to the next day
    }
  
    return sundays;
  }

  export function getCurrentDate() {
    const today = new Date();
    const monthName = months[today.getMonth()];
    const dayNumber = today.getDate();
    const yearNumber = today.getFullYear();

    const formattedDate = `${monthName} ${dayNumber}, ${yearNumber}`;
    return formattedDate;
  }
  
  export function formatDateString(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
  
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  }

  export function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  export function formatTimestamp(timestamp) {
    // Assuming the input timestamp is in milliseconds
    const date = new Date(timestamp);
  
    // Extracting date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Creating a formatted string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  }