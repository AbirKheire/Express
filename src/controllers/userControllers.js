const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users); 
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}; 

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;

    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.sendStatus(201).send({id: result.insertID});
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
  .query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?",
    [firstname, lastname, email, city, language]
  )
  .then(([result]) => {
    if(result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  updateUser,
};