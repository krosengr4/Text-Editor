import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {
  console.error('inside putDb function');

  // Create a connection to the database.
  const jateDb = await openDB('jate', 1);

  // Create new transaction & specify the DB and privileges
  const tx = tx.objectStore('jate');` `

  // use .add() on the store to pass in the content
  const request = store.add({ content: content });

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => console.error('getDb not implemented');

initdb();
