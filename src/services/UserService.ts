import axios from "axios";
import { User } from "../App";

const baseURL = "https://jsonplaceholder.typicode.com";


export class UserService {

    static getUsers() {
        return axios.get(baseURL + '/users')
    }
}