export function getCurrentMonth() {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];
  
    return currentMonth;
  }