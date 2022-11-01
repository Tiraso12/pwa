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
  console.log('POST to database');
  //connect to database
  const appDb = await openDB('jate', 1);
  //creates new transaction and specify the store data privileges
  const tx = appDb.transaction('jate', 'readwrite');
  //opens the object
  const store = tx.objectStore('jate');
  //use the .add() method on the store and pass in the content
  const request = store.add({ id: 1 , value: content})
  //gets confirmation of the request
  const result = await request;
  console.log('data saved', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  console.log('GET from the database');

  // create a connection to the indexDB database & the version we want to use
  const appDb = await openDB('jate', 1);

  // create a new transaction and specify the store and data privileges
  const tx = appDb.transaction('jate', 'readonly');

  // open up the desired object store
  const store = tx.objectStore('jate');

  // use the .getAll() method to get all data in the database
  const request = store.get(1);

  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
