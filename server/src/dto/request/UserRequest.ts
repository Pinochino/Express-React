import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, Min, MinLength } from "class-validator";
import UserInterface from "@/interfaces/UserInterface";
import 'reflect-metadata';


class UserRequest implements UserInterface{

    @MinLength(3)
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(3)
    @IsNotEmpty()
    password: string;

    @IsOptional()
    avatar?: string;

    @IsOptional()
    avatarUrl?: string;

    @IsBoolean()
    isDeleted?: boolean = false;

    @IsDate()
    createdAt?: Date = new Date();

    @IsDate()
    updatedAt?: Date = new Date();
    constructor(
      data: UserInterface
    ) {
        this.username = data.username,
        this.email = data.email,
        this.password = data.password,
        this.avatar= data.avatar,
        this.avatarUrl= data.avatarUrl,
        this.isDeleted= data.isDeleted ?? this.isDeleted,
        this.createdAt= data.createdAt ?? this.createdAt,
        this.updatedAt= data.updatedAt ?? this.updatedAt
    }
}
export default UserRequest;