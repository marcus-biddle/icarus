const logRecentChange = async (user, type, description) => {
    try {
      // Create a new RecentChanges record
      const recentChange = new RecentChanges({
        user: user, // The user who made the change
        type: type, // Type of change (e.g., "update", "delete")
        description: description, // A brief description of the change
      });
  
      // Save the record to the database
      await recentChange.save();
  
      console.log('Change logged successfully.');
    } catch (error) {
      console.error('Error logging change:', error);
    }
  };
  