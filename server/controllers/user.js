const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const modelUser = mongoose.model("User");

let userController = {};

userController.allUsers = (req, res) => {
  modelUser
    .find()
    .then(results => res.json(results))
    .catch(err => res.send(err));
};

module.exports = userController;

userController.newUser = (req, res) => {
  if (req.body.username && req.body.password && req.body.email) {
    if (req.body.password2 && req.body.password == req.body.password2) {
      modelUser.findOne({ username: req.body.username }).then(user => {
        if (user) {
          res.json({ success: false, message: "Usuario já existente!" });
        } else {
          modelUser
            .findOne({ email: req.body.email })
            .then(doc => {
              if (doc) {
                res.json({ success: false, message: "E-mail já existe!" });
              } else {
                bcrypt
                  .hash(req.body.password, 10)
                  .then(hash => {
                    let encryptedPassword = hash;
                    let newUser = new modelUser({
                      username: req.body.username,
                      password: encryptedPassword,
                      email: req.body.email,
                      isAdmin: req.body.isAdmin
                    });
                    newUser
                      .save()
                      .then(() =>
                        res.json({
                          success: true,
                          message: "Conta criada com sucesso",
                          statusCode: 201
                        })
                      )
                      .catch(err =>
                        res.json({
                          success: false,
                          message: err,
                          statusCode: 500
                        })
                      );
                  })
                  .catch(err =>
                    res.json({ success: false, message: err, statusCode: 500 })
                  );
              }
            })
            .catch(err =>
              res.json({ success: false, message: err, statusCode: 500 })
            );
        }
      });
    } else {
      res.json({
        success: false,
        message: "Confirmação de senha incorreta",
        statusCode: 400
      });
    }
  } else {
    res.json({
      success: false,
      message: "Campos de usuario e senha obrigatorios",
      statusCode: 400
    });
  }
};
