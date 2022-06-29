const pool = require('../utils/pool');

module.exports = class Item {
  id;
  item;
  bought;
  user_id;
  amount;

  constructor(row) {
    this.id = row.id;
    this.item = row.item;
    this.bought = row.bought;
    this.user_id = row.user_id;
    this.amount = row.amount;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows.map((item) => new Item(item));
  }
};
