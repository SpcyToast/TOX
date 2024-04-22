export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('lobby').del()

  // Inserts seed entries
  await knex('lobby').insert([])
}
