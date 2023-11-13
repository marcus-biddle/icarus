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
      return data.sort((a, b) => b.pushupsThisMonth - a.pushupsThisMonth );
    case 'Lowest Count This Month':
      return data.sort((a, b) => a.pushupsThisMonth - b.pushupsThisMonth );
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

export const formatDatasets = (array, option) => {
  // this is formatting for month
  const datasets = [];
  const colors = [
    "#ff5733",
    "#ffbd33",
    "#33ff57",
    "#33d0ff",
    "#8c33ff",
    "#ff3385",
    "#ff3333",
    "#ffd633",
    "#33ffcc",
    "#338cff",
    "#ff33e6",
    "#33ffbd"
  ];

  if (option === 'year') {
    array.forEach((user, index) => {
      const label = user.username;
      const totals = [];
      
      
      for (let i = 1; i <= 12; i++) {
        const pushups = user.totalPushups.filter(obj => obj.month === i)
        if (pushups.length > 0) {
          totals.push(pushups[0].total)
        } else {
          totals.push(0)
        }
      }
  
      datasets.push({ label, data: totals, backgroundColor: colors[index] });
    })
  } else if (option === 'today') {
    array.forEach((user, index) => {
      const label = user.userName;
      const total = user.totalPushupsToday;

      datasets.push({ label, data: [total], backgroundColor: colors[index] });
    })
  }
  

  return datasets;
}