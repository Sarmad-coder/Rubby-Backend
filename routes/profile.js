var express = require('express');
var router = express.Router();
let multer = require("multer")
// let Orders=require("../models/order")
let Profile = require("../models/profile")
let User = require("../models/user")
const ipaddr = require('ipaddr.js');
const geoip = require('geoip-lite');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = './public/images/thumbnails'

    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage, limits: { fieldSize: 20971520 } })


var getIP = (req) => {
  const ip = (
    (typeof req.headers['x-forwarded-for'] === 'string' &&
      req.headers['x-forwarded-for'].split(',').shift()) ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  );

  try {
    return ipaddr.process(ip).toString();
  } catch (e) {
    console.error('Failed to process IP address:', e);
    return null;
  }
}

router.post("/create-profile",  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), async (req, res) => {
  if (req.files.thumbnail) {
    req.body.thumbnail = req.files.thumbnail[0].originalname
    console.log(req.body)
  }
  if (req.files.coverPhoto) {
    req.body.coverPhoto = req.files.coverPhoto[0].originalname
    console.log(req.body)
  }else{
    req.body.coverPhoto=""
  }
  let profile = new Profile(req.body)
  let user = await User.findById(req.body.userID)
  profile.user.push(user)
  await profile.save()


  user.profiles.push(profile)
  await user.save()

  // let profile = await Profile.findById(req.body.userID)
  // user.profiles.push(profile)
  // await user.save()

  // if (user) {
  //     jsonwebtoken.sign({
  //         ID: user._id
  //     }, "hello hello hello",
  //         {
  //             expiresIn: "10 days"
  //         },
  //         (err, token) => {
  //             console.log(token)
  //             res.json(
  //                 {
  //                     user,
  //                     token
  //                 }
  //             )

  //         }
  //     )
  // } else {
  //     res.json(null)
  // }
  res.json(profile)
})

router.get("/get-profile-by-id", async (req, res) => {

  let profile = await Profile.findById(req.query.id)
  res.json(profile);


})

router.get("/get-profile-by-slug", async (req, res) => {
  let profile = await Profile.findOne({
    slug: req.query.slug
  })
  res.json(profile)
})

router.put("/update-profile",  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), (req, res) => {

  if (req?.files?.thumbnail) {
    req.body.thumbnail = req.files.thumbnail[0].originalname
    
  }
  if (req?.files?.coverPhoto) {
    req.body.coverPhoto = req.files.coverPhoto[0].originalname
  }
  delete req.body.slug
  console.log(req.body)


  Profile.findByIdAndUpdate(req.body._id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
});


router.get("/get-all-profiles", async (req, res) => {
  let profile = await Profile.find({
    user: req.query.userID
  })
  res.json(profile)
})
router.get("/views", async (req, res) => {
  const ip =
    { ip: getIP(req) }


  let profile = await Profile.findOne({
    slug: req.query.slug
  })
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  ip.date = dateStr
  const geo = geoip.lookup(ip.ip);
  ip.viewData=geo
  console.log(ip);
  profile.views.push(ip)
  await profile.save()


})
// router.get("/get-view-data", async (req, res) => {
//   let profile = await Profile.findOne({
//     slug: req.query.slug
//   })
//   let viewData = profile.views.map((item) => {
//     const geo = geoip.lookup(item.ip);

//     if (geo) {
//       return {
//         country: geo.country,
//         region: geo.region,
//         city: geo.city,
//         latitude: geo.ll[0],
//         longitude: geo.ll[1],
//       };
//     } else {
//       return null;
//     }
//   });
//   res.json(viewData)

// })


// router.put("/update-profile", (req, res) => {
//     User.findByIdAndUpdate(req.body._id, req.body).then(
//         (x) => res.json(x), // success
//         (e) => res.status(400).send(e) // error
//     );
// });


module.exports = router;
