const express = require("express");
const router = express.Router();
const { hashedPassword } = require("../Utilities/hashing");

// Importing the model
const apiModel = require("../models/model");

// Check for persona type and set the table
const checkPersona = (personaType, res) => {
  if (personaType.toLowerCase() === "cu") {
    return "customers";
  } else if (personaType.toLowerCase() === "ho") {
    return "hotels";
  } else {
    return;
  }
};

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { personaType, email, password } = req.body;
    let table = await checkPersona(personaType, res);
    if (!table) res.status(500).send("Persona not specified.");
    else {
      // Invoke the query
      const results = await apiModel.login(table, email);
      if (results.length > 0) {
        if (hashedPassword(password) === results[0].password) {
          // Return the response
          res.json(JSON.parse(JSON.stringify(results[0])));
        } else {
          // Auth Error
          res.status(401).json({
            error: "Incorrect Password",
          });
        }
      } else {
        // Auth Error
        res.status(401).json({
          error: "Incorrect Email or Password",
        });
      }
    }
  } catch (e) {
    // Server Error
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error: Please try again",
    });
  }
});

// Register User
router.post("/register", async (req, res, next) => {
  // TO-DO: check if email already exists
  try {
    let personaType = req.body.personaType;
    delete req.body.personaType;
    // Hash the password
    req.body.password = hashedPassword(req.body.password);
    let table = await checkPersona(personaType, res);
    if (!table) res.status(500).send("Persona not specified.");
    else {
      // Invoke the querybuilder
      await apiModel.register(req.body, table);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Success");
    }
  } catch (e) {
    // Server Error
    console.error(e);
    res.status(500).json({
      error: e,
    });
  }
});

router.post("/admin/sign_in", (req, res) => {
  const { body } = req;
  const { name, pwd } = body;
  if (process.env.ADMIN_USER === name && process.env.ADMIN_PRIVILEGES === pwd) {
    return res.status(200).send({});
  };
  return res.status(400).send({});
})

module.exports = router;
