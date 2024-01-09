import { Users } from "./components/Users";
import { EditUser } from "./components/EditUser";
// import { Practice } from "./components/Practice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UserService } from "./services/UserService";
import { setUsers } from "./store/UserStore";
import ApiCaller from "./components/ApiCaller";

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

  const selectedUser = useSelector((state: any) => state.UserState.selectedUser);
  const dispatch = useDispatch();

  // Fetching user list from jsonplaceholder
  useEffect(() => {
    UserService.getUsers().then((response) => {
      dispatch(setUsers(response.data));
      console.log("Fetch successful: ", response.data)
    });
  }, []);



  return (
    <div className="App">
      <center>
        <div>
          {/* <Practice></Practice> */}
          <ApiCaller></ApiCaller>
          {/* <Users></Users>
          {selectedUser.name && (
            <>
              <h1>Selected user: {selectedUser.name}</h1>
              <EditUser></EditUser>
            </>
          )} */}
        </div>
        {/* <Users onUserSelected={handleUserSelected} updatedUser={userToUpdate} ></Users> */}
        {/* <EditUser initialValuesProp={initialFormValues} onUpdateUser={handleUserUpdated}></EditUser> */}
      </center>
    </div>
  );
}
export default App;