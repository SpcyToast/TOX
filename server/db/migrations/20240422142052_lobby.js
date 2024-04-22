export async function up(knex) {
  return knex.schema.createTable('lobby', (table) => {
    table.increments('id')
    table.string('player 1')
    table.string('player 2')
    table.string('lobby code')
    table.string('game state')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('lobby')
}
