var express = require('express');
var router = express.Router();
let jsonwebtoken = require("jsonwebtoken");
// let Orders=require("../models/order")
let User = require("../models/user")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/create-user", async (req, res) => {
  let user = new User(req.body)
  await user.save()
  if (user) {
    jsonwebtoken.sign({
      ID: user._id
    }, "hello hello hello",
      {
        expiresIn: "10 days"
      },
      (err, token) => {
        console.log(token)
        res.json(
          {
            user,
            token
          }
        )

      }
    )
  } else {
    res.json(null)
  }
})
router.get("/get-user", async (req, res) => {
  // console.log(req)
  let user = await User.findOne({
    email: req.query.email,
    password: req.query.password
  })
  if (user) {
    jsonwebtoken.sign({
      ID: user._id
    }, "hello hello hello",
      {
        expiresIn: "10 days"
      },
      (err, token) => {
        console.log(token)
        res.json(
          {
            user,
            token
          }
        )

      }
    )
  } else {
    res.json(null)
  }
})
router.get("/get-user-by-email", async (req, res) => {
  let user = await User.findOne({
    email: req.query.email
  })
  res.json(user)
})

router.get("/get-user-by-token", (req, res) => {
  jsonwebtoken.verify(req.query.token, "hello hello hello", async (err, data) => {
    if (data) {
      // let user = users.find(user => user._id == data.meriID)
      let user = await User.findById(data.ID)
      res.json(user);
    } else {
      res.json(null)
    }
  })
})
router.put("/change-password", (req, res) => {
  jsonwebtoken.verify(req.body.token, "hello hello hello", async (err, data) => {
    if (data.ID) {
      delete req.body.token
      User.findByIdAndUpdate(data.ID, req.body).then(
        (x) => res.json(x), // success
        (e) => res.status(400).send(e) // error
      );

    } else {
      res.json(null)
    }
  })
})

module.exports = router;
