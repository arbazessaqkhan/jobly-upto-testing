import { User } from "@/payload-types"
import { Access } from "payload";


export const adminAndRoleAccess = (role: User['role']) => {
    const access: Access = ({req}) => {
          //read by admins and application managers
          const user: User | null = req?.user;
          return user?.role === 'admin' || user?.role === role
    }

    return access
}
