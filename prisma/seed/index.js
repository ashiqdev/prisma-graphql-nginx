const { createUser } = require("./user");

async function seedDb() {
  await createUser();
  return "seed complete...";
}

seedDb().then(console.log);
