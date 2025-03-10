//src/modules/users/users.service.ts
"use client";

import {CrudApiService} from "@lib/crud";
import {User, UserDto} from "@/modules/users/users.schema";

export class UsersService extends CrudApiService<UserDto, User>{

}
