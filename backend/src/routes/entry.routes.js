const { Router } = require("express");
const router = Router(); // para crear rutas
const entries = require("../services/entry.services");

//router.route("/").get((req, res) => res.send("entries "));
router.post("/", entries.createEntry);
router.get("/", entries.getEntries);
router.get("/:id", entries.getEntry);
router.put("/:id", entries.updateEntry);
router.delete("/:id", entries.deleteEntry);

module.exports = router; // enrutador del archivo
