import { Remult } from "remult";
import { useState } from "preact/hooks";
import { User } from "../model/user.ts";
import { inputStyle } from "../style.tsx";

const remult = new Remult();
const userRepo = remult.repo(User);

export default function Todos({ data }: { data: User[] }) {
  const [users, setUsers] = useState<User[]>(data);

  const addTUser = () => {
    setUsers([...users, new User()]);
  };

  return (
    <div class="p-2 m-2">

<button onClick={addTUser}  class="rounded-md mt-3 border-transparent bg-blue-200 px-4 py-2">Add User</button>

      {users.map((user) => {
        const handleChange = (values: Partial<User>) => {
          setUsers(users.map((t) => t === user ? { ...user, ...values } : t));
        };

        const saveUser = async () => {
          const savedUser = await userRepo.save(user);
          setUsers(users.map((t) => t === user ? savedUser : t));
        };

        const deleteUser = async () => {
          if (confirm("seguro??")) {
            await userRepo.delete(user);
            setUsers(users.filter((t) => t !== user));
          }
        };
        return (
          <div class="p-2 m-20" key={user.id}>
            <h1 class="text-xl">User</h1>
            <div class="mt-1 flex">
              <input
                class={`${inputStyle}`}
                value={user.name}
                onInput={(e) => handleChange({ name: e.currentTarget.value })}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div class="mt-1 flex">
              <input
                class={`${inputStyle}`}
                value={user.email}
                onInput={(e) => handleChange({ email: e.currentTarget.value })}
                type="email"
                placeholder="Email"
              />
            </div>

            <div class="mt-1 flex">
              <input
                class={`${inputStyle}`}
                value={user.password}
                onInput={(e) =>
                  handleChange({ password: e.currentTarget.value })}
                type="password"
                placeholder="Password"
              />
            </div>

            <div class="mt-1 flex">
              <select
                value={user.perfil}
                onChange={(e) =>
                  handleChange({ perfil: e.currentTarget.value })}
                class={`${inputStyle}`}
              >
                <option value="super">super</option>
                <option value="admin">admin</option>
                <option value="normal" selected>normal</option>
              </select>
            </div>

            <button
              onClick={saveUser}
              class="rounded-md mt-3 border-transparent bg-purple-200 px-4 py-2"
            >
              Save
            </button>

            <button
              onClick={deleteUser}
              class="rounded-md mt-3 border-transparent bg-red-200 px-4 py-2"
            >
              Delete
            </button>
          </div>
        );
      })}
      
    </div>
  );
}
