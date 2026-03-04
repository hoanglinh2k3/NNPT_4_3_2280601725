const express = require("express");
const router = express.Router();
const { dataRole, dataUser } = require("../utils/data2");

// GET ALL ROLES
router.get("/", (req, res) => {
  res.json(dataRole);
});

// GET ROLE BY ID
router.get("/:id", (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
});

// CREATE ROLE
router.post("/", (req, res) => {
  const newRole = {
    id: "r" + (dataRole.length + 1),
    ...req.body,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dataRole.push(newRole);
  res.status(201).json(newRole);
});

// UPDATE ROLE
router.put("/:id", (req, res) => {
  const index = dataRole.findIndex(r => r.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Role not found" });

  dataRole[index] = {
    ...dataRole[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json(dataRole[index]);
});

// DELETE ROLE
router.delete("/:id", (req, res) => {
  const index = dataRole.findIndex(r => r.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Role not found" });

  const deleted = dataRole.splice(index, 1);
  res.json(deleted);
});


// ===============================
// GET USERS IN ROLE
// ===============================
router.get("/:id/users", (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id);
  if (!role)
    return res.status(404).json({ message: "Role not found" });

  const users = dataUser.filter(u => u.role.id === req.params.id);

  res.json({
    role,
    users
  });
});

module.exports = router;