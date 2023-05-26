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

      socket.on("notifications", async (notification) => {
        console.log(notification);
        const recipientSocket =
          socketInstances[notification.notificationTo.id]?.socket;
        if (recipientSocket) {
          recipientSocket.emit("notifications", notification);
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
