import { mongoose } from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dietPlan: {
    type: String,
    required: false,
  },
});
// const User = mongoose.model("User", userSchema);
// module.exports = User;
// export default { User };
export default mongoose.model("User", userSchema);
