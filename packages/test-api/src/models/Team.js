import { model, Schema } from "mongoose";

const TeamSchema = new Schema({
    name: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const teamModel = model("Team", TeamSchema);
