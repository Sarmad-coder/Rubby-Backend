let mogoose = require("mongoose")

let profileSchema = mogoose.Schema({
  user: [
    {
      type: mogoose.SchemaTypes.ObjectId,
      ref: "user"
    }
  ],
  username: String,
  thumbnail: String,
  coverPhoto: String,
  name: String,
  email: String,
  bio: String,
  slug: String,
  removePageFromDiscovery: Boolean,
  socialLayout: Array,
  socialWhatsapp: String,
  socialFacebook: String,
  socialInstagram: String,
  socialTwitter: String,
  socialYoutube: String,
  phoneNo: String,
  website: String,
  companyName: String,
  jobTitle: String,
  location: String,
  taxOffice: String,
  taxId: String,
  iban: String,
  schoolName: String,
  fieldOfStudy: String,
  video: String,
  videoDiscription: String,
  acceptButtonColor: String,
  acceptButtonIcon: String,
  acceptButtonRadius: String,
  acceptButtonText: String,
  acceptButtonTextColor: String,
  pageSkin: String,
  views: Array
  // conformation:Boolean
})
let Profile = mogoose.model("profile", profileSchema)
module.exports = Profile;
