import RoleInterface from "./RoleInterface";

interface UserInterface {
    id?: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    avatarUrl?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    roles: RoleInterface[];
}
export default UserInterface;