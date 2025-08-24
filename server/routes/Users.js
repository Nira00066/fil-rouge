const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Users_FILE = path.join(__dirname, "..", "data", "user.json");
// Question 1 pourquoi deja ce direname ?
const SECRET = process.env.SECRET;

function readUsers() {
  try {
    const data = fs.readFileSync(Users_FILE, "utf-8");
    return JSON.stringify(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.readFileSync, JSON.stringify(users, null, 2);
}

router.post("/insciption", async (req, res) => {
  const { email, password } = req.body;

  //   recupere l'email et le password
  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Utilisateur déja inscrit" });
  }
  //  Verifier que l'email ne sois pas deja pris par un autre utilisateur  sinon rejecter
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash });
  writeUsers(users)

  res.status(201).json({message: 'utilisateur Crée'});

});

router.post('/login', async (req,res)=> {
    const {email , password} = req.body;
    const users = readUsers(users);


    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({message: 'identifiants invalides'})
    
        const valid = await bcrypt.compare(password , user.passwordHash);
        if(!valid) return res.status(401).json({message: "Mot de passe incorrect"})

    const token = jwt.sign({email}, SECRET,{expiresIn: '1h'});
    res.json({token});

    });


router.update('/profil', async (req,res)=> {
    
})
    module.exports = router;
