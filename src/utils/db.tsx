import {dbData} from '../types';

var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'SightCards.db',
  createFromLocation: 1,
});
export default async (name: string, query: string) => {
  return name != ''
    ? new Promise<any>((resolve, reject) => {
        let data: any = [];
        db.transaction((tx: any) => {
          tx.executeSql(
            query != '' ? query : `SELECT * FROM ${name}`,
            [],
            (tx: any, results: any) => {
              let len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                data.push(row);
              }
              resolve(data);
            },
            (err: any) => {
              console.log(err);
              reject(err);
            },
          );
        });
      })
    : [];
};
