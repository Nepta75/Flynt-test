import { model, Schema } from "mongoose";

export const USER_ROLE_ENUM = {
    SQUAD_LEADER: "SQUAD_LEADER",
    SQUAD_MEMBER: "SQUAD_MEMBER",
    INTERN: "INTERN"
}

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE_ENUM),
        default: USER_ROLE_ENUM.INTERN,
    },
});

export const userModel = model("User", UserSchema);
