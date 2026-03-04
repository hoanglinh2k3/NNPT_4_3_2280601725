const express = require("express");
const router = express.Router();
const { dataUser, dataRole } = require("../utils/data2");

// GET ALL USERS
router.get("/", (req, res) => {
  res.json(dataUser);
});

// GET USER BY USERNAME
router.get("/:username", (req, res) => {
  const user = dataUser.find(u => u.username === req.params.username);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// CREATE USER
router.post("/", (req, res) => {
  const role = dataRole.find(r => r.id === req.body.roleId);
  if (!role)
    return res.status(400).json({ message: "Invalid roleId" });

  const newUser = {
    ...req.body,
    role,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dataUser.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE USER
router.put("/:username", (req, res) => {
  const index = dataUser.findIndex(
    u => u.username === req.params.username
  );

  if (index === -1)
    return res.status(404).json({ message: "User not found" });

  dataUser[index] = {
    ...dataUser[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json(dataUser[index]);
});

// DELETE USER
router.delete("/:username", (req, res) => {
  const index = dataUser.findIndex(
    u => u.username === req.params.username
  );

  if (index === -1)
    return res.status(404).json({ message: "User not found" });

  const deleted = dataUser.splice(index, 1);
  res.json(deleted);
});

module.exports = router;