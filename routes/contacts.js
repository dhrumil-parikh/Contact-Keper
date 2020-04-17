const express = require("express");
const router = express.Router();

//@route     GET api/contacts
//@desc      Get all users contacts
//@access    Private

router.get("/", (req, res) => {
  res.send("Get all contacts");
});

//@route     POST api/contacts
//@desc      Add new users contacts
//@access    Private

router.post("/", (req, res) => {
  res.send("Add new Contacts");
});

//@route     PUT api/contact/:id;
//@desc      Upate a contact
//@access    Private

router.put("/:id", (req, res) => {
  res.send("Update a contact");
});

//@route     DELETE api/contact/:id;
//@desc      delete contact
//@access    Private

router.delete("/:id", (req, res) => {
  res.send("Delete a contact");
});

module.exports = router;
