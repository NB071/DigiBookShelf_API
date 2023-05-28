const knexConfig = require("../knexfile");
const { knex } = require("knex");
const db = knex(knexConfig);

const io = require("socket.io");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.socketController = (io) => {
  const socketInstances = {};

  io.on("connection", async (socket) => {
    console.log(`A user connected ${socket.id}`);
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
      const userId = decoded.user_id;

      await db("user").where("user_id", userId).update({ is_online: 1 });
      const user = await db("user").where("user_id", userId).first();

      socket.join(userId);

      const onlineFriendList = Object.values(socketInstances).map(
        (instance) => instance.user
      );
      socket.emit("onlineUsers", onlineFriendList);

      socketInstances[userId] = { socket, user };

      socket.on("userFriends", async (friendsList) => {
        friendsList.forEach((friend) => {
          socket.join(friend.friend);
        });

        const onlineUsers = await db("user")
          .whereIn(
            "user_id",
            friendsList.map((friend) => friend.friend)
          )
          .andWhere("is_online", 1);

        onlineUsers.forEach((user) => {
          socketInstances[user.user_id] = {
            socket: socketInstances[user.user_id]?.socket || socket,
            user: user,
          };
        });

        const updatedOnlineFriendList = Object.values(socketInstances).map(
          (instance) => instance.user
        );
        socket.broadcast.emit("onlineUsers", updatedOnlineFriendList);
      });

      socket.on("getNotifications", async () => {
        try {
          const userNotifications = await db("notifications")
            .join("user", "notifications.sender_id", "=", "user.user_id")
            .where({ recipient_id: userId })
            .select(
              "notifications.*",
              "user.avatar_image AS sender_avatar",
              "user.username AS sender_username"
            )
            .orderBy("notifications.created_at", "desc");
          socket.emit("notifications", userNotifications);
        } catch (error) {
          console.log("error: ", error);
        }
      });

      socket.on("sendNotification", async (notification) => {
        try {
          await db("notifications").insert({
            recipient_id: notification.recipient_id,
            notification_type: notification.notification_type,
            sender_id: notification.sender_id,
            message: notification.message,
          });

          const recipientSocket =
            socketInstances[notification.recipient_id]?.socket;
          if (recipientSocket) {
            const userNotifications = await db("notifications")
              .join("user", "notifications.sender_id", "=", "user.user_id")
              .where({ recipient_id: notification.recipient_id })
              .select(
                "notifications.*",
                "user.avatar_image AS sender_avatar",
                "user.username AS sender_username"
              )
              .orderBy("notifications.created_at", "desc");

            recipientSocket.emit("notifications", userNotifications);
          }
        } catch (error) {
          console.log("error: ", error);
        }
      });

      socket.on("disconnect", async () => {
        await db("user").where("user_id", userId).update({ is_online: 0 });

        delete socketInstances[userId];

        const updatedOnlineFriendList = Object.values(socketInstances).map(
          (instance) => instance.user
        );

        socket.broadcast.emit("onlineUsers", updatedOnlineFriendList);

        console.log(`${socket.id} disconnected`);
      });
    } catch (error) {
      console.error("Authentication error:", error.message);
      socket.disconnect();
    }
  });
};
