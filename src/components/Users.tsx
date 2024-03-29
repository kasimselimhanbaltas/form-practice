import { User } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setInitialFormValues } from "../store/UserStore";
import { useCallback } from "react";


export const Users = () => {
    const dispatch = useDispatch();
    const users: User[] = useSelector((state: any) => state.UserState.users);
    const selectedUser = useSelector((state: any) => state.UserState.selectedUser);

    const handleSelectChange = useCallback((user: User) => {
        console.log("handlereset")
        dispatch(setSelectedUser(user))
        dispatch(setInitialFormValues({ name: user.name, username: user.username, email: user.email }))
    }, [selectedUser]);

    const listItems = users.map(user =>
        <button className="userButton" onClick={() => {
            if (user.username !== selectedUser.username)
                handleSelectChange(user)
        }
        } key={user.id}>
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
                <select value={selectedUser.id} className="selectUser" onChange={(e) => {
                    let user = getUser(parseInt(e.target.value, 10) - 1);
                    handleSelectChange(user);
                }}>
                    <option value="">Select a user</option>
                    {optionItems}
                </select>
            </div>
        </>

    );
}
