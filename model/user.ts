import { Entity, Fields, Validators } from "remult";


@Entity("users", {
    allowApiCrud: true
})
export class User {
   @Fields.cuid()
    id:string

    @Fields.string({
      validate: Validators.required
    })
    name = '';

   @Fields.string({
    validate: Validators.required
  })
    email = '';

   @Fields.string({
    validate: Validators.required
  })
    password = '';


  @Fields.object({
    validate: Validators.required
  })
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
