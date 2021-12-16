import { model, Schema } from "mongoose";

export const USER_ROLE_ENUM = {
    SQUAD_LEADER: "SQUAD_LEADER",
    SQUAD_MEMBER: "SQUAD_MEMBER",
    INTERN: "INTERN"
}

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Champ requis']
    },
    lastName: {
        type: String,
        required: [true, 'Champ requis']
    },
    password: {
        type: String,
        required: [true, 'Champ requis']
    },
    createdAt: { type: Date, default: Date.now },
    email: {
        type: String,
        unique: true,
        required: [true, 'Champ requis']
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE_ENUM),
        default: USER_ROLE_ENUM.INTERN,
    },
});

export const UserModel = model("User", UserSchema);
