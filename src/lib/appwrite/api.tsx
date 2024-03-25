import { account, appwriteConfig, avatars, database } from "./config.tsx";
import { ID, Query } from "appwrite";

export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface INewNote {
  userId: string;
  title: string;
  content?: string;
  colour: string;
  category: string;
}
export const createNewAccount = async (user: INewUser) => {
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name,
  );

  if (!newAccount) {
    throw new Error();
  }

  const avatar = avatars.getInitials(user.username);

  return saveUserToDB({
    email: newAccount.email,
    name: newAccount.name,
    username: user.username,
    profilePic: avatar,
    accountId: newAccount.$id,
  });
};

export const saveUserToDB = async (user: {
  accountId: string;
  username: string;
  name: string;
  profilePic: URL;
  email: string;
}) => {
  return await database.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.USERS_COLLECTION_ID,
    ID.unique(),
    user,
  );
};

export const getCurrentAccount = async () => {
  const currentAccount = await account.get();

  const currentUser = await database.listDocuments(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.USERS_COLLECTION_ID,
    [Query.equal("accountId", currentAccount.$id)],
  );

  if (!currentUser) {
    new Error("Could not find current user");
  }
  return currentUser.documents[0];
};
export const loginAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const signInAccount = await account.createEmailSession(
      user.email,
      user.password,
    );

    if (!signInAccount) {
      new Error("Could not sign into account");
    }

    return signInAccount;
  } catch (err) {
    new Error("Could not sign into account");
  }
};

export const logoutUser = async () => {
  return await account.deleteSession("current");
};

export const createNewNote = async (note: INewNote) => {
  try {
    const newNote = await database.createDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.NOTES_COLLECTION_ID,
      ID.unique(),
      {
        creator: note.userId,
        title: note.title,
        colour: note.colour,
        category: note.category,
        content: note.content,
      },
    );

    if (!newNote) {
      new Error();
    }

    return newNote;
  } catch (err) {
    console.log(err);
  }
};

export const getNotes = async (userId: string) => {
  try {
    const notes = await database.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.NOTES_COLLECTION_ID,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")],
    );

    return notes.documents;
  } catch (error) {
    throw new Error("Failed to fetch notes.");
  }
};

export const getNote = async (noteId: string) => {
  try {
    return await database.getDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.NOTES_COLLECTION_ID,
      noteId,
    );
  } catch (err) {
    console.log("Failed to fetch note");
  }
};

export const updateNote = async (
  noteId: string,
  content: string,
  category: string,
  colour: string,
  title: string,
) => {
  try {
    return await database.updateDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.NOTES_COLLECTION_ID,
      noteId,
      {
        content: content,
        category: category,
        colour: colour,
        title: title,
      },
    );
  } catch (err) {
    console.log("Failed to update note");
  }
};

export const deleteNote = async (noteId: string) => {
  try{
    return await database.deleteDocument(appwriteConfig.DATABASE_ID, appwriteConfig.NOTES_COLLECTION_ID, noteId)
  }catch (err) {
    console.log("Failed to delete note");
  }
}
