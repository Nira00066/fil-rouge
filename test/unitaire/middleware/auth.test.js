const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./authenticateToken");

const app = express();


app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Accès autorisé", user: req.user });
});

describe("Middleware authenticateToken", () => {
  it("renvoie 401 si aucun token ", async () => {
    const res = await request(app).get("/profile");
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "Non connecté" });
  });

  it("renvoie 403 si le token est invalide", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer mauvais_token");
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({ message: "Token invalide" });
  });

  it("autorise l'accès avec un token valide", async () => {
    const user = { id: 1, name: "Nina" };
    const token = jwt.sign(user, "SECRET_KEY"); 

    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      message: "Accès autorisé",
      user: { id: 1, name: "Nina" },
    });
  });
});
