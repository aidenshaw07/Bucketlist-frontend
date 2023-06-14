import { create } from "zustand";

// Sign Up Page Store States and Actions

interface signUpPageStoreState {
  email: string;
  password: string;
  username: string;
  passwordCheck: string;
}

interface signUpPageStoreActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
}

export const useStoreForSignUpPage = create<
  signUpPageStoreState & signUpPageStoreActions
>((set) => ({
  email: "",
  password: "",
  username: "",
  passwordCheck: "",
  setEmail: (email) => set((state) => ({ ...state, email })),
  setPassword: (password) => set((state) => ({ ...state, password })),
  setUsername: (username) => set((state) => ({ ...state, username })),
  setPasswordCheck: (passwordCheck) =>
    set((state) => ({ ...state, passwordCheck })),
}));

// Login Page Store States and Actions

interface loginPageStoreState {
  loading: boolean;
  loggedIn: boolean;
  userId: string;
  userName: string;
}

interface loginPageStoreActions {
  setLoading: (loading: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
}

export const useStoreForLoginPage = create<
  loginPageStoreState & loginPageStoreActions
>((set) => ({
  loading: true,
  loggedIn: false,
  userId: "",
  userName: "",
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  setLoggedIn: (loggedIn) => set((state) => ({ ...state, loggedIn })),
  setUserId: (userId) => set((state) => ({ ...state, userId })),
  setUserName: (userName) => set((state) => ({ ...state, userName })),
}));

// Bucket List Page Store States and Actions

interface bucketListPageStoreState {
  title: string;
  description: string;
  editingItemId: string;
  updatedTitle: string;
  updatedDescription: string;
}

interface bucketListPageStoreActions {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setEditingItemId: (editingItemId: string) => void;
  setUpdatedTitle: (updatedTitle: string) => void;
  setUpdatedDescription: (updatedDescription: string) => void;
}

export const useStoreForBucketListPage = create<
  bucketListPageStoreState & bucketListPageStoreActions
>((set) => ({
  title: "",
  description: "",
  editingItemId: "",
  updatedTitle: "",
  updatedDescription: "",
  setTitle: (title) => set((state) => ({ ...state, title })),
  setDescription: (description) => set((state) => ({ ...state, description })),
  setEditingItemId: (editingItemId) =>
    set((state) => ({ ...state, editingItemId })),
  setUpdatedTitle: (updatedTitle) =>
    set((state) => ({ ...state, updatedTitle })),
  setUpdatedDescription: (updatedDescription) =>
    set((state) => ({ ...state, updatedDescription })),
}));
