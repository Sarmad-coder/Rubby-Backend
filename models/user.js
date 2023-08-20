let mogoose = require("mongoose")

let userSchema = mogoose.Schema({
  // username: String,
  // name: String,
  first_name:String,
  last_name:String,
  email: String,
  password: String,
  profiles: [
    {
      type: mogoose.SchemaTypes.ObjectId,
      ref: "profile"
    }
  ]
  // conformation:Boolean
})
let User = mogoose.model("user", userSchema)
module.exports = User;
