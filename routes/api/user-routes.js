const router = require("express").Router();

// const { where } = require("sequelize/types");
const { User } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  // findAll() method let us query all of the users from the user table in DB
  // Equivalent SELECT * FROM users;
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  // findOne() method like the following SQL query: SELECT * FROM users WHERE id = 1
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: 'Lernatino', email: 'lernantino@gmail.com', password: 'password1234'}
  // To insert data, use .create() method. pass in key/value pairs
  // In SQL, this command would look like to:
  /**
   * INSERT INTO users
   *    (username, email, password)
   * VALUES
   *    ("Lernantino", "lernantino@gmail.com", "password1234");
   */
  User.create({
    username: req.body.username,
    email: req.body.email,
    passwork: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  /**
   * UPDATE users
   * SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
   * WHERE id = 1;
   */
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;