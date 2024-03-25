import {Account, Avatars, Client, Databases} from "appwrite";

export const appwriteConfig = {
    PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    ENDPOINT_URI: import.meta.env.VITE_APPWRITE_ENDPOINT_URI,
    DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    USERS_COLLECTION_ID: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    NOTES_COLLECTION_ID: import.meta.env.VITE_APPWRITE_NOTES_COLLECTION_ID
}


const client = new Client().setEndpoint(appwriteConfig.ENDPOINT_URI).setProject(appwriteConfig.PROJECT_ID)

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
export const avatars = new Avatars(client)