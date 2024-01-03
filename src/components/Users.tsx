import { useEffect, useState } from "react";
import { User } from "../App";
import { UserService } from "../services/UserService";


export const Users = ({ onUserSelected, updatedUser }: { onUserSelected: (arg0: User) => any, updatedUser: User | null }) => {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number>();

    // Fetching user list from jsonplaceholder
    useEffect(() => {
        UserService.getUsers().then((response) => {
            setUsers(response.data);
            console.log("Fetch successful: ", response.data)
        });
    }, []);

    // Listening the prop to react changes
    useEffect(() => {
        if (updatedUser) {
            // users[updatedUser.id - 1] = updatedUser;
            // immutable approach for setting state
            setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        }

    }, [updatedUser]);

    if (!users) return null;

    const listItems = users.map(user =>
        <button className="userButton" onClick={() => {
            onUserSelected(user)
            setSelectedUserId(user.id)
        }} key={user.id}>
            <p>
                <b>{user.name}</b>
            </p>
        </button>
    );
    const optionItems = users.map(user => (
        <option key={user.id} value={user.id} >
            {user.name}
        </option>
    ));
    const getUser = (id: number): User => {
        return users[id];
    }

    return (
        <>
            {/* This list of buttons are for visualize the list and select a user */}
            <div className="buttonWrapper">
                {listItems}
            </div>
            {/* This select element is for selecting a user to edit */}
            <div>
                <select value={selectedUserId} className="selectUser" onChange={(e) => {
                    onUserSelected(getUser(parseInt(e.target.value, 10) - 1));
                    setSelectedUserId(parseInt(e.target.value, 10));
                }}>
                    <option value="">Select a user</option>
                    {optionItems}
                </select>
            </div>
        </>

    );
}
