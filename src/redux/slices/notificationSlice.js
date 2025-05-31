import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notifications: [
    // Example initial notifications (optional)
    // { id: nanoid(), message: "Welcome!", read: false },
  ],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { message } = action.payload;
      state.notifications.push({
        id: nanoid(),
        message,
        read: false,
      });
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        read: true,
      }));
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    removeNotification: (state, action) => {
      const idToRemove = action.payload;
      state.notifications = state.notifications.filter((n) => n.id !== idToRemove);
    },
  },
});

export const {
  addNotification,
  markAllAsRead,
  clearNotifications,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;


