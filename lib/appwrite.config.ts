import * as sdk from 'node-appwrite'   



export const { 
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT
} = process.env

const client = new sdk.Client();

client
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!)
    
;


export const  users  =   new sdk.Users(client)
export const  databases  =   new sdk.Databases(client)
export const  storage  =   new sdk.Storage(client)
export const  messaging  =   new sdk.Messaging(client)



// try {
//     let res =  users.create(sdk.ID.unique(), "email@example.com", "+123456789", "password", "Walter O'Brien");
//     console.log({res})
// } catch(e:any) {
//     console.log(e.message);
// }