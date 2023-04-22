import { Database, PostgresConnector, Relationships } from 'denodb/mod.ts';
import {User,TC_userEstado, TC_userPerfil} from './model/User.ts'

const connector = new PostgresConnector({
  database: 'ttec-euromillones',
  host: 'postgresql-118326-0.cloudclusters.net',
  username: 'aure',
  password: 'jas11jas11',
  port: 18718, // optional
});

const db = new Database(connector);


// Relationships.belongsTo(User, TC_userEstado);
// Relationships.belongsTo(User, TC_userPerfil);

db.link([TC_userEstado, TC_userPerfil, User]);
try{
  await  db.sync();
  //await  db.sync({drop : true});
}
catch(ex){
  console.log(ex);
}


const models = {
    user: User,
    usEstado : TC_userEstado
  }
  export {db, models}; 