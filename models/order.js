let mogoose = require("mongoose")

let orderSchema = mogoose.Schema({
  orderData: mogoose.Schema.Types.Mixed,
  email: String,
  acknowledgement: String,
  logo: String,
  name: String,
  orientation: String,
  qrCode: String,
  size: String,
  cardName: String,
  user: [
    {
      type: mogoose.SchemaTypes.ObjectId,
      ref: "user"
    }
  ],
})
let Orders = mogoose.model("order", orderSchema)
module.exports = Orders;
