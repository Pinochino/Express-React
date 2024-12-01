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
}
export default UserInterface;