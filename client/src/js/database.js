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
};

initdb();
