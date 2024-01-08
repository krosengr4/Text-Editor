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


//logic to a method that accepts some content and adds it to the database
//todo: Fix the "cannot find objectStore error"
export const putDb = async (content) => {
  console.log ('PUT IN THE DATABASE');

  // Create a connection to the database.
  const jateDb = await openDB('jate', 1);

  // Create new transaction & specify the DB and privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // 
  const store = tx.objectStore('jate'); //?<--- Fix the "cannot find objectStore error"

  // use .add() on the store to pass in the content
  const request = store.add({ content: content });

  console.log('CONTENT:', content);

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET FROM THE DATABASE');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result value: ', result);
  return result;
};

initdb();
