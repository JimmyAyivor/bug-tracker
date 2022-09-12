const request = require("supertest");

const tickets = require("../app.js");
const db = require("../db/dbConfig.js");


describe("Basic root route", () => {
  describe("/", () => {
    it("is able to make a successful get request to /, that returns a string", async () => {
      const response = await request(tickets).get("/");
      expect(response.text).toBe("Welcome to your BugTracker Api - brought to you by Jimmy");
    });
  });
});

describe("tickets", () => {
  beforeEach(async () => {
    await db.none("DELETE FROM tickets WHERE true");
    await db.none("ALTER SEQUENCE tickets_id_seq RESTART");
    await db.none(`INSERT INTO tickets (title, description, priority, created_by_user_id, closed_by_user_id, created_on, closed_on, ticket_type) VALUES
    ("Bug Title 1", "Bug Description 1", 2, 1, 1, "2022-08-26", "2022-08-26", 1);`);
  });

  afterAll(() => {
    db.$pool.end();
  });

  describe("/tickets/:id", () => {
    describe("GET", () => {
      it("with correct id - fetches the correct ticket", async () => {
        const response = await request(tickets).get("/tickets/1");
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.title).toEqual("Bug Title 1");
      });

      it("with incorrect id - sets status to 404 and returns error key", async () => {
        const response = await request(tickets).get("/tickets/98989898");
        const parsedRes = JSON.parse(response.text);

        expect(response.statusCode).toEqual(404);
        expect(parsedRes.success).toBe(false);
        expect(parsedRes.payload).toMatch(/not found/);
      });
    });
    describe("DELETE", () => {
      it("with valid id - deletes the correct ticket", async () => {
        const response = await request(tickets).delete("/tickets/1").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.name).toEqual("Strawberries");
      });

      it("with invalid id - does not delete anything", async () => {
        const response = await request(tickets).delete("/tickets/99999").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(false);
        expect(parsedRes.payload.id).toBe(undefined);
      });
    });
  });

  describe("/tickets", () => {
    describe("GET", () => {
      it("returns all tickets", async () => {
        const expected = [
          {
            id: 1,
            name: "Strawberries",
            image: "https://picsum.photos/id/1080/300/300",
            fiber: 20,
            protein: 10,
            added_sugar: 0,
            is_healthy: true,
          },
          {
            id: 2,
            name: "Raspberries",
            image: "https://picsum.photos/id/102/300/300",
            fiber: 16,
            protein: 4,
            added_sugar: 0,
            is_healthy: true,
          },
          {
            id: 3,
            name: "Honey Covered Granola",
            image: "https://picsum.photos/id/312/300/300",
            fiber: 30,
            protein: 12,
            added_sugar: 22,
            is_healthy: false,
          },
          {
            id: 4,
            name: "New Wave Nuts",
            image: "https://picsum.photos/id/139/300/300",
            fiber: 11,
            protein: 55,
            added_sugar: 9,
            is_healthy: true,
          },
          {
            id: 5,
            name: "Raw Onions & Turnips",
            image: "https://picsum.photos/id/292/300/300",
            fiber: 11,
            protein: 9,
            added_sugar: 9,
            is_healthy: true,
          },
          {
            id: 6,
            name: "Healthy Birthday Cake Square",
            image:
              "https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg",
            fiber: 4,
            protein: 8,
            added_sugar: 19,
            is_healthy: false,
          },
        ];

        const response = await request(tickets).get("/tickets").expect(200);
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.payload).toEqual(expect.arrayContaining(expected));
      });
    });

    describe("POST", () => {
      it("with valid ticket name and image - can create a ticket", async () => {
        const response = await request(tickets).post("/tickets").send({
          name: "Spiders on a Log",
          image:
            "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-ticket-Spider-Peanut-Butter-Celery.jpg",
          fiber: 6,
          protein: 6,
          added_sugar: 12,
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.image).toEqual(
          "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-ticket-Spider-Peanut-Butter-Celery.jpg"
        );
      });
      it("with valid ticket name, but no image- can create a ticket with default image", async () => {
        const response = await request(tickets).post("/tickets").send({
          name: "banana",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Banana");
        expect(parsedRes.payload.image).toEqual(
          "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
        );
      });

      it("with valid ticket name but lowercase - can create a capitalized ticket (will NOT capitalize words with 2 letter or less)", async () => {
        const response = await request(tickets).post("/tickets").send({
          name: "spiders on a log",
          image:
            "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-ticket-Spider-Peanut-Butter-Celery.jpg",
          fiber: 6,
          protein: 6,
          added_sugar: 12,
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Spiders on a Log");
      });

      it("with valid ticket name, will capitalize as expected", async () => {
        const response = await request(tickets).post("/tickets").send({
          name: "COMBOS",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Combos");
      });

      it("with valid ticket name mixed capitalization - can create a properly capitalized ticket", async () => {
        const response = await request(tickets).post("/tickets").send({
          name: "FLAMIN' hot Cheetoes",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Flamin' Hot Cheetoes");
      });

      it("with invalid fiber, protein or added_sugar- can NOT determine health of ticket", async () => {
        const response = await request(tickets).post("/tickets").send({
          name: "Combos",
          added_sugar: null,
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.is_healthy).toBe(null);
      });
    });

    // describe("PUT", () => {
    //   it("with valid ticket and id - updates the correct ticket", async () => {
    //     const response = await request(tickets).put("/tickets/1").send({
    //       name: "ticket Platter",
    //       image:
    //         "https://www.freshcravings.com/wp-content/uploads/2017/12/FC_Mexicanticket-Platter-1-1480x1480@2x.jpg",
    //       fiber: 6,
    //       protein: 5,
    //       added_sugar: 1,
    //     });

    //     const parsedRes = JSON.parse(response.text);

    //     expect(parsedRes.success).toBe(true);
    //     expect(parsedRes.payload.id).toEqual(1);
    //     expect(parsedRes.payload.name).toEqual("ticket Platter");
    //   });

    //   it("with invalid ticket or id - responds with 422 and message", async () => {
    //     const response = await request(tickets)
    //       .put("/tickets/1")
    //       .send({ image: "http://no-name.test" });

    //     const parsedRes = JSON.parse(response.text);

    //     expect(response.statusCode).toEqual(422);
    //     expect(parsedRes.success).toBe(false);
    //     expect(parsedRes.payload).toMatch(/include all fields/);
    //   });
    // });
  });
  describe("ticket Health Check", () => {
    describe("ticket Health: ♥ Enough fiber", () => {
      it("Checks if fiber is above five and added_sugar is below 5", () => {
        expect(confirmHealth({ protein: 4, fiber: 5, added_sugar: 1 })).toBe(
          true
        );
      });
    });

    describe("ticket Health: ♥ Enough protein", () => {
      it("Checks if protein is above 5 and added_sugar is below 5", () => {
        expect(confirmHealth({ protein: 6, fiber: 2, added_sugar: 0 })).toBe(
          true
        );
      });
    });

    describe("ticket Health: ♥ Enough fiber and protein", () => {
      it("Checks if protein is above 5 or fiber is above five and added_sugar is below 5", () => {
        expect(confirmHealth({ protein: 8, fiber: 9, added_sugar: 3 })).toBe(
          true
        );
      });
    });

    describe("ticket Health: ♡ Enough fiber, too much sugar", () => {
      it("Checks if fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 2, fiber: 8, added_sugar: 10 })).toBe(
          false
        );
      });
    });

    describe("ticket Health: ♡ Enough protein, too much sugar", () => {
      it("Checks if protein is above 5 and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 22, fiber: 3, added_sugar: 11 })).toBe(
          false
        );
      });
    });

    describe("ticket Health: ♡ Enough protein and fiber, too much sugar", () => {
      it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 5, fiber: 5, added_sugar: 13 })).toBe(
          false
        );
      });
    });

    describe("ticket Health: ♡ Not enough protein nor fiber, too much sugar", () => {
      it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 1, fiber: 0, added_sugar: 6 })).toBe(
          false
        );
      });
    });

    describe("ticket Health: ♡ Not enough protein nor fiber, nor too much sugar", () => {
      it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5", () => {
        expect(confirmHealth({ protein: 1, fiber: 0, added_sugar: 2 })).toBe(
          false
        );
      });
    });

    describe("ticket Health: Missing info", () => {
      it("Checks if protein, fiber and added_sugar have valid values", () => {
        expect(
          confirmHealth({ protein: "", fiber: "c", added_sugar: null })
        ).toBe(null);
      });
    });
  });
});
