import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewAccount,
  createNewNote,
  deleteNote,
  getNote,
  getNotes,
  INewNote,
  INewUser,
  loginAccount,
  logoutUser,
  updateNote,
} from "../appwrite/api.tsx";
import { QUERY_KEYS } from "./QueryKeys.tsx";

export const useCreateNewAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewAccount(user),
  });
};

export const useLoginAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      loginAccount(user),
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

export const useCreateNewNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: INewNote) => createNewNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTES] });
    },
  });
};

export const useGetNotes = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTES, userId],
    queryFn: () => getNotes(userId),
  });
};

export const useGetNote = (noteId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTE, noteId],
    queryFn: () => getNote(noteId),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteId,
      content,
      category,
      colour,
      title,
    }: {
      noteId: string;
      content: string;
      category: string;
      colour: string;
      title: string;
    }) => updateNote(noteId, content, category, colour, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTES] });
    },
  });
};

export const useDeleteNode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ noteId }: { noteId: string }) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTES] });
    },
  });
};
