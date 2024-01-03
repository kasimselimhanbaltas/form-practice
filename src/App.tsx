import { useState } from "react";
import { Users } from "./components/Users";
import { EditUser } from "./components/EditUser";

export interface User {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": string,
      "lng": string
    }
  }
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string
  }
}
export interface FormModel {
  name: string, username: string, email: string
}


const App = () => {
  const [initialFormValues, setInitialFormValues] = useState<FormModel>({ name: "", username: "", email: "" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);


  function handleUserSelected(user: User) {
    setSelectedUser(user);
    setInitialFormValues({ name: user.name, username: user.username, email: user.email });
  }

  const handleUserUpdated = (formValue: FormModel) => {
    console.log("Submitted: ", formValue)
    if (selectedUser) { // check if user is selected
      let user: User = {
        ...selectedUser,
        name: formValue.name,
        username: formValue.username,
        email: formValue.email
      }
      setUserToUpdate(user);
    }
  }

  // initalValuesP = { initialValuesProp }
  return (
    <div className="App">
      <center>
        <div>
          <Users onUserSelected={handleUserSelected} updatedUser={userToUpdate} ></Users>
          {selectedUser && (
            <>
              <h1>Selected user: {selectedUser.name}</h1>
              <EditUser initialValuesProp={initialFormValues} onUpdateUser={handleUserUpdated}></EditUser>
            </>
          )}
        </div>
      </center>
    </div>
  );
}
export default App;