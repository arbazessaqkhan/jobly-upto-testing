import type { CollectionBeforeChangeHook } from 'payload'
import { Job } from '@/payload-types'; 


export const commonCollectionBeforeChangeCreatedByUpdatedByHook: CollectionBeforeChangeHook<Job> = async({ data, req, operation }: Parameters<CollectionBeforeChangeHook<Job>>[0]) => {
    // data.salary = data.salary + 1 || data.salary
    // data.title = data.title + ' updated by before change hook'
    // data.description = data.description + ' updated by before change hook dfghjkl'
    // console.log(data, operation)
    console.log('user', req.user) //gives loged in user
    const {user} = req;
    if (user) {
        if(operation === 'create') {
            data.createdBy = user.id
        }
        if (operation === 'update') {
            data.updatedBy = user.id
        }
    }
    
    return data

}