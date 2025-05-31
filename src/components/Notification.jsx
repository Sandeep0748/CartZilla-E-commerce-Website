import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAllAsRead } from "../redux/slices/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FFA725]">
        Notifications
      </h2>

      {unreadNotifications.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No New Notifications.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {unreadNotifications.map((notification) => (
              <li
                key={notification.id}
                className="p-3 rounded shadow flex justify-between items-center bg-white border-l-4 border-blue-500"
              >
                <span>{notification.message}</span>
                {notification.timestamp && (
                  <span className="text-xs text-gray-500 ml-4">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Mark All as Read
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;




