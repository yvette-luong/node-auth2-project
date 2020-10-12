exports.seed = function (knex) {
  return knex("users").insert([
      { username: "", password: "" },
      // { username: "test1", password: "testone" },
      // { username: "test2", password: "test 2" },
  ]);
};