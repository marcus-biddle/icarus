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