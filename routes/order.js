var express = require('express');
var router = express.Router();
let Order = require("../models/order")
let User = require("../models/user")

router.post("/create-order", async (req, res) => {

  let order = new Order(req.body)
  order.email = req.body.orderData.email
  // order.first_name="saif"
  // order.last_name="sarmad"
  let user = await User.findById(req.body.userID)
  if (user) {
    order.user.push(user)
    await order.save()
    res.json(order)
  } else {
    await order.save()
    res.json(order)
  }

})
router.put("/update-order-by-id", async (req, res) => {

  Order.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );


})
router.get("/get-order-by-email", async (req, res) => {

  let order = await Order.findOne({
    email: req.query.email
  })
  if (order) {

    res.json(true)
  } else {
    res.json(false)
  }


})

router.get("/get-order", async (req, res) => {

  let order = await Order.findOne({
    email: req.query.email
  })
  res.json(order)
})

router.get("/get-order-by-id", async (req, res) => {

  let order = await Order.findOne({
    "orderData.id": req.query.id
  })

  res.json(order)
})

module.exports = router;
