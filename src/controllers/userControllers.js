const database = require("../../database");
const argon2 = require('argon2');
const { hashPassword } = require("../middlewares/auth");


const getUsers = (req, res) => {
  let sql = " select * from users ";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " where language = ? ";
    sqlValues.push(req.query.language);

  if (req.query.city != null) {
    sql += " and city = ? ";
    sqlValues.push(req.query.city);
  }
}
  else if (req.query.city != null) {
    sql += " where city = ? ";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users); 
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error retrieving data from database");
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


const postUser = async (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;

        database
        .query(
            "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?,?,?,?,?,?)",
            [firstname, lastname, email, city, language, hashedPassword]
        )
        .then(([result]) => {
            res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
      };


const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
    if (req.user.id !== id) {
        res.sendStatus(403);
    }
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    database
      .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?", [firstname, lastname, email, city, language, hashedPassword, id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
         res.sendStatus(404);
      } else {
         res.sendStatus(200);
      }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
};

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
  .query(
    "delete from users where id = ?", [id])
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

//const postLogin = async (req, res) => {
  //const { email, hashedPassword } = req.body;

 // database
 // .query(
 //   "INSERT INTO users(email, hashedPassword) VALUES (?,?)",
 //   [email, hashedPassword]
  //)
  //.then(([result]) => {
  //  res.status(201).json({id: result.insertId});
  //})
 // .catch((err) => {
 //   console.error(err);
 //   res.sendStatus(401);
 // })
//};

//const isItDwight = (req, res) => {
  //if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    //res.send("Credentials are valid");
  //} else {
   // res.sendStatus(401);
  //}};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  
  database
    
    .query("select * from users where email = ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];

    next();
   } else {
    res.sendStatus(401);
  }
})
     .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };




module.exports = {
  getUserById,
  getUsers,
  postUser,
  updateUser,
  deleteUserById,
  //isItDwight,
  getUserByEmailWithPasswordAndPassToNext,
}