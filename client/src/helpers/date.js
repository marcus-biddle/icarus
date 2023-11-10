export function getCurrentMonth() {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];
  
    return [currentMonth];
  }

  export function getMonthsInCurrentYear() {
    // const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Adding 1 to get the month in the 1-12 range
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const monthsArray = [];
    
    for (let month = 0; month < currentMonth; month++) {
      monthsArray.push(monthNames[month]);
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
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Months are zero-based
    let day = today.getDate();
  
    // Add leading zero for single-digit months and days
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    // Format: YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  