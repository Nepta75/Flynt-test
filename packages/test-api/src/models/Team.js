import { model, Schema } from "mongoose";

const TeamSchema = new Schema({
    name: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isCompleted: { type: Boolean, required: [true, 'Champ requis'] }
});

export const TeamModel = model("Team", TeamSchema);
