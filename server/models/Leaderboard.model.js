import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    ranking: { type: Number, required: true },
    name: { type: String, required: true },
    xp: { type: Number, required: true },
    userId: { type: String, required: true },
  });
  
  const leagueGroupSchema = new Schema({
    leagueId: { type: String, required: true },
    users: { type: [userSchema], required: true },
  });
  
  const leaderboardSchema = new Schema({
    leagueIds: { type: [String], required: true },
    leagueGroups: { type: [leagueGroupSchema], required: true },
  });
  
  const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);
  
  export default LeaderboardModel;