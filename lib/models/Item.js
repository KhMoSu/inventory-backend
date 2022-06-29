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

  static async insert({ item, amount }) {
    const { rows } = await pool.query(
      `
      INSERT INTO items (item, amount)
      VALUES ($1, $2)
      RETURNING *
      `,
      [item, amount]
    );

    return new Item(rows[0]);
  }
  static async getById(id){
    const { rows } = await pool.query('SELECT * FROM items WHERE items.id=$1',
      [id]);
    if(!rows) return null;
    return(rows[0]);
  }
  static async updateById(id, attrs) {
    const items = await Item.getById(id);
    if (!items) return null;
    const { item, amount, bought } = { ...items, ...attrs };
    const { rows } = await pool.query(
      ` UPDATE items
      set item=$2, amount=$3, bought=$4
      WHERE id=$1 
      RETURNING *`,
      [id, item, amount, bought]
    );
    return new Item(rows[0]);
  }
};
