import {Account, Avatars, Client, ID, Databases, Query } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.host.tokiro',
    projectId: '67d89d10001fbf360cf8',
    databaseId: '67d89e870006f56f8d7c',
    eventsCollectionId: '67d89ea6000bd512bf31',
    usersCollectionId: '67d89edc001b52167a90',
    storageId: '67d8a07c001120080489'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
// Register User
export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password)
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
            
    } catch(error){
        console.log(error);
        throw new Error(error);
    }

}


export const signIn = async (email, password) => {
    try{
        const session = await account.createEmailPasswordSession(email,password);
        return session;
    } catch(error){
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal]('accountId', currentAccount.$id)
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0]
    }catch(error){
        console.log(error)
    }
}