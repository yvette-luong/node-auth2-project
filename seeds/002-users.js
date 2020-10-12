
exports.seed = function(knex) {
  const users = [
    {
      username:"", // will get id 1
      password:""
    },
    // {
    //   username:"", // will get id 2
    //   password:""
    // },
    // {
    //   username: "", // will get id 3
    //   password:""
    // },
    // {
    //   username: "", // will get id 4
    //   password:""
    // },
  
  ];

      // Inserts seed entries
      return knex('users').insert(users);

};
