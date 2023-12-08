/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {name: "Sahil",email:"sahil@gmail.com",password:"sahil123"},
  ]);
};
