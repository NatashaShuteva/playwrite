import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'qatest.sedc.mk',
  port: 3307,
  user: 'user', // replace with your MariaDB username
  password: 'user', // replace with your MariaDB password
  database: 'north_wind',  // replace with your MariaDB database
});

export async function queryDatabase(query: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(query);
    return rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection
  }
}

// New method to return the values of the specified property in a list
export function getPropertyListFromResult(result: any[], propertyName: string): any[] {
  const propertyList: any[] = [];
  result.forEach(row => {
    if (row.hasOwnProperty(propertyName)) {
      propertyList.push(row[propertyName]);
    } else {
      console.warn(`Property "${propertyName}" not found in row`, row);
    }
  });
  return propertyList;
}