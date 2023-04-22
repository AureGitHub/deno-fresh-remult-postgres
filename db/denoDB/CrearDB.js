import { Database, PostgresConnector, Relationships } from "denodb/mod.ts";
import { User, TC_userEstado, TC_userPerfil } from "./model/User.ts";
import { enumUserEstado, enumUserPrefil } from "../../constantes/enums.ts";

const connector = new PostgresConnector({
  database: "ttec-euromillones",
  host: "postgresql-118326-0.cloudclusters.net",
  username: "aure",
  password: "jas11jas11",
  port: 18718, // optional
});

// deno run -A CrearBD.js

try {
  const db = new Database(connector);

  Relationships.belongsTo(User, TC_userEstado);
  Relationships.belongsTo(User, TC_userPerfil);

  db.link([TC_userEstado, TC_userPerfil, User]);
  await db.sync({ drop: true });

  await TC_userEstado.create({
    descripcion: enumUserEstado[enumUserEstado.activo]
  });
  await TC_userEstado.create({
    descripcion: enumUserEstado[enumUserEstado.inactivo]
  });
  await TC_userEstado.create({
    descripcion: enumUserEstado[enumUserEstado.bloqueado]
  });

  await TC_userPerfil.create({
    descripcion: enumUserPrefil[enumUserPrefil.super]
  });
  await TC_userPerfil.create({
    descripcion: enumUserPrefil[enumUserPrefil.admin]
  });
  await TC_userPerfil.create({
    descripcion: enumUserPrefil[enumUserPrefil.normal]
  });


  // esto sería lo ideal, pero tengo que tener los id de las TC como incremental. Si no, me da error al crear el modelo

  // for (const enumMember in enumUserPrefil) {
  //   await userPerfil.create({ id: parseInt(enumMember),   descripcion: enumUserPrefil[enumMember].toString() });
  // }

  await User.create(
    {
      name: "Aure",
      email: "aure.desande@gmail.com",
      password: "jas11jas11",
      tc_userestado_id: enumUserEstado.activo,
      tc_userperfil_id: enumUserPrefil.super,
    },
  );
} catch (ex) {
  console.log(ex);
}
