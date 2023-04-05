import { Entity, Fields } from "remult";


@Entity("users", {
    allowApiCrud: true
})
export class User {
   @Fields.cuid()
    id:string

    @Fields.string()
    name = '';

   @Fields.string()
    email = '';

   @Fields.string()
    password = '';


  @Fields.object()
  perfil = Perfil.normal
  

  @Fields.createdAt()
createdAt = new Date()

  @Fields.updatedAt()
updatedAt = new Date()
  
}


export enum Perfil {
  super,
  admin,
  normal
}
