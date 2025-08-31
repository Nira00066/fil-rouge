const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.test" });
let db;

describe("Event table tests", () => {
  test("créer un nouvel événement (cas valide)", async () => {
    const [result] = await db.execute(
      `INSERT INTO event (title, date_start, date_end, hour_start, hour_end, address) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "Test Event",
        "2025-09-01 10:00:00",
        "2025-09-01 18:00:00",
        "10:00:00",
        "18:00:00",
        "123 rue Test",
      ]
    );

    expect(result.affectedRows).toBe(1);

    const [rows] = await db.execute("SELECT * FROM event WHERE id = ?", [
      result.insertId,
    ]);
    expect(rows.length).toBe(1);
    expect(rows[0].title).toBe("Test Event");

    test("échoue si title est manquant (cas erreur)", async () => {
      await expect(
        db.execute(
          `INSERT INTO event (date_start, date_end, hour_start, hour_end, address) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            "2025-09-01 10:00:00",
            "2025-09-01 18:00:00",
            "10:00:00",
            "18:00:00",
            "123 rue Test",
          ]
        )
      ).rejects.toThrow(); 
    });
  });

  test("insertion d'un événement avec des valeurs limites (cas limite)", async () => {
    const longTitle = "A".repeat(255); // titre max
    const [result] = await db.execute(
      `INSERT INTO event (title, date_start, date_end, hour_start, hour_end, address, price) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        longTitle,
        "2025-09-01 10:00:00",
        "2025-09-01 10:00:00", 
        "10:00:00",
        "10:00:00",
        "456 rue Limite",
        99999999.99,
      ]
    );

    expect(result.affectedRows).toBe(1);

    const [rows] = await db.execute("SELECT * FROM event WHERE id = ?", [
      result.insertId,
    ]);
    expect(rows.length).toBe(1);
    expect(rows[0].title).toBe(longTitle);
    expect(rows[0].price).toBeCloseTo(99999999.99);
  });
});
