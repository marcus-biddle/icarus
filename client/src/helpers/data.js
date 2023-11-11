export function sortByRank(users, month) {
    const sortedUsers = users.sort((a, b) => {
        // Find the total pushup data for month 10 for each user
        const pushupsA = a.totalPushups.find((pushup) => pushup.month === month);
        const pushupsB = b.totalPushups.find((pushup) => pushup.month === month);

        const totalA = pushupsA ? pushupsA.total : 0;
        const totalB = pushupsB ? pushupsB.total : 0;
      
        // Compare the total pushups for month 10 for both users
        return totalB - totalA;
      });

    return sortedUsers;
}

export const sortData = (data, sortingOption) => {
  switch (sortingOption) {
    case 'Highest Count This Month':
      return data.sort((a, b) => {
        const aTotal = a.totalPushups.length > 0 ? a.totalPushups[a.totalPushups.length - 1].total : 0;
        const bTotal = b.totalPushups.length > 0 ? b.totalPushups[b.totalPushups.length - 1].total : 0;
      
        return bTotal - aTotal;
      })
    case 'Lowest Count This Month':
      return data.sort((a, b) => {
        const aTotal = a.totalPushups.length > 0 ? a.totalPushups[a.totalPushups.length - 1].total : 0;
        const bTotal = b.totalPushups.length > 0 ? b.totalPushups[b.totalPushups.length - 1].total : 0;
      
        return aTotal - bTotal;
      })
    // case 'Active':
    //   // Assuming 'active' is a boolean property in your objects
    //   return data.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
    // case 'Recently Joined':
    //   // Assuming 'joinedDate' is a Date property in your objects
    //   return data.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
    default:
      return data;
  }
};