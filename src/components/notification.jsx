import { useState } from "react";
import { Bell } from "lucide-react";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New follower: John Doe", time: "2m ago" },
    { id: 2, message: "Alice liked your post", time: "10m ago" },
    { id: 3, message: "Your tweet was retweeted!", time: "30m ago" },
    { id: 4, message: "You have a new message from Bob", time: "1h ago" },
  ]);

  return (
    <div className="flex flex-col w-full mx-auto bg-white dark:bg-[var(--color-dark)] text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-[#0000005c] bg-opacity-90 backdrop-blur-md text-black dark:text-white font-bold text-lg py-4 px-6 border-b border-black dark:border-[#2f3336] shadow-md z-10 text-center transition-colors duration-300">
        Notifications
      </div>

      {/* Notifications List */}
      <div className="flex flex-col mb-16 md:mb-0">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#16181c] hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <p className="text-sm font-medium">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">No notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
