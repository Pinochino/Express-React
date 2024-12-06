import { Expose } from "class-transformer";
import UserInterface from "@/interfaces/UserInterface";
import 'reflect-metadata';
import RoleResponse from "./RoleResponse";


class UserResponse implements UserInterface {
    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    avatar?: string;

    @Expose()
    avatarUrl?: string;

    @Expose()
    isDeleted?: boolean = false;

    @Expose()
    createdAt?: Date = new Date();

    @Expose()
    updatedAt?: Date = new Date();

    @Expose()
    roles: RoleResponse[];

    constructor(
        data: UserInterface
    ) {
            this.username = data.username,
            this.email = data.email,
            this.password = data.password,
            this.avatar = data.avatar,
            this.avatarUrl = data.avatarUrl,
            this.isDeleted = data.isDeleted ?? false,
            this.createdAt = data.createdAt ??  new Date(),
            this.updatedAt = data.updatedAt ?? new Date(),
            this.roles = data.roles
    }
}
export default UserResponse;