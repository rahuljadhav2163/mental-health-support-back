import { Schema, model } from "mongoose"

const Userschema = new Schema({
    fullName: {
        type: "String",
        default: "-"
    },
    mobile: {
        type: "String",
        unique: true
    },
    password: {
        type: "String",
        required: true,
    },
}
)

const User = model('user', Userschema);
export default User;