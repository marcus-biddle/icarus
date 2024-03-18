interface CurrentStreak {
    endDate: string;
    lastExtendedDate: string;
    length: number;
    startDate: string;
  }
  
  interface LongestStreak {
    achieveDate: string;
    endDate: string;
    length: number;
    startDate: string;
  }
  
  interface PreviousStreak {
    endDate: string;
    lastExtendedDate: string;
    length: number;
    startDate: string;
  }
  
  interface StreakData {
    eventId: string;
    currentStreak: CurrentStreak;
    longestStreak: LongestStreak;
    previousStreak: PreviousStreak;
  }
  
  interface eventEntry {
    event: string;
    time: number;
    reps: number;
    xp: number;
  }
  
  interface XpSummary {
    date: number;
    gainedXp: number;
    numUpdateCounts: number;
    streakExtended: boolean;
    totalUpdatedCounts: number;
    userId: number;
  }
  
  interface EventTotals {
    event: string;
    totalDays: number;
    totalReps: number;
    totalXp: number;
    lastUpdatedDate: string;
  }
  
  interface LeaderboardHistory {
    ranking: number;
    leagueId: string;
    monthlyXp: number;
    date: string;
  }
  
  interface Leaderboard {
    ranking: number;
    leagueId: string;
    monthlyXp: number;
  }
  
  interface Statistic {
    eventId: string;
    weeklyAverage: number;
    currentStreak: number;
    personalBest: number;
  }
  
  export interface User {
    eventIds: string[];
    currentEventId: string;
    currentEvent: string;
    eventTotals: EventTotals[];
    email: string;
    name?: string;
    username?: string;
    level: number;
    levelCompletionRate: number;
    xpRequiredForNextLevel: number;
    id: string;
    creationDate: number;
    // weeklyXp: number;
    // monthlyXp: number;
    totalXp: number;
    streak?: number;
    updateCounts?: number;
    streakData?: StreakData[];
    eventEntries: eventEntry[];
    xpSummaries?: XpSummary[];
    leaderboardHistory?: LeaderboardHistory[];
    currentLeaderboard?: Leaderboard;
    statistics: Statistic[];
    graphs?: [{
      graphType: string;
      graphData: {
        userData: number[],
        averageUsers: number[] | null,
        binSizes: number[]
      }
    }] | any[]
  }
  