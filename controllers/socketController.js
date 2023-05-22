const knexConfig = require("../knexfile");
const { knex } = require("knex");
const db = knex(knexConfig);

const io = require("socket.io");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.socketController = (io) => {
  const onlineFriends = new Map();

  io.on("connection", async (socket) => {
    console.log(`A user connected ${socket.id}`);
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
      const userId = decoded.user_id;

      await db("user").where("user_id", userId).update({ is_online: 1 });

      socket.join(userId);

      socket.on("userFriends", async (friendsList) => {
        const user = await db("user")
          .where({
            user_id: userId,
          })
          .first();

        onlineFriends.set(userId, user);

        friendsList.forEach((friend) => {
          socket.join(friend.friend);
        });

        const onlineUsers = await db("user")
          .whereIn(
            "user_id",
            friendsList.map((friend) => friend.friend)
          )
          .andWhere("is_online", 1);

        onlineUsers.forEach((user) => onlineFriends.set(user.user_id, user));

        const onlineFriendList = Array.from(onlineFriends.values())

        socket.broadcast.emit("onlineUsers", onlineFriendList);
        socket.emit("onlineUsers", onlineFriendList);
      });

      socket.on("disconnect", async () => {
        await db("user").where("user_id", userId).update({ is_online: 0 });

        onlineFriends.delete(userId);

        const onlineFriendList = Array.from(onlineFriends.values())

        socket.broadcast.emit("onlineUsers", onlineFriendList);

        console.log(`${socket.id} disconnected`);
      });

    } catch (error) {
      console.error("Authentication error:", error.message);
      socket.disconnect();
    }
  });
};
