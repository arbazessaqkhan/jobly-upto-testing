import { User } from "@/payload-types"
import { Access } from "payload";


export const isAdminOnlyAccess: Access =({req}) => {
          //read by admins and application managers
          const user: User | null = req?.user;
          return user?.role === 'admin'
}