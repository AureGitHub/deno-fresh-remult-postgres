import { DataTypes, Model  } from 'denodb/mod.ts';

export class User extends Model {

    static table = 'users';

    static timestamps = true;

    // static defaults = {
    //     name: 'Something About Us',
    // };
      
    static fields = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,        
        email: { type: DataTypes.STRING, unique: true, allowNull: false},       
        password: DataTypes.STRING,       
    };

     static estado() {
        return this.hasOne(TC_userEstado);
    }

    static perfil() {
        return this.hasOne(TC_userPerfil);
    }

}

// si le quito el autoIncrement, no se pueden lllamar las claves con el mismo nombre :-((((

export class TC_userEstado  extends Model {
    static table = 'TC_userEstados';
     static fields = {       
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
        descripcion: DataTypes.STRING,                
    };

}


export class TC_userPerfil  extends Model {
    static table = 'TC_userPerfiles';
     static fields = {       
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
        descripcion: DataTypes.STRING,                
    };

}


