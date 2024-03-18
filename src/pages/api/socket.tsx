import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting Socket.IO");
    const io = new Server(res.socket.server);
    const rooms: any = {};
    io.on("connection", (socket) => {
      console.log(`Socket ${socket.id} connected.`);

      socket.on("createRoom", (roomId, userName) => {
        rooms[roomId] = { users: [{ id: socket.id, name: userName }] };
        io.emit("roomCreated", roomId);
        socket.join(roomId);
      });

      socket.on("leaveRoom", (roomId) => {
        if (rooms[roomId]) {
          rooms[roomId].users = rooms[roomId].users.filter(
            (user: any) => user.id !== socket.id
          );
          if (rooms[roomId].users.length === 0) {
            delete rooms[roomId];
          }
          socket.leave(roomId);
        }
      });

      socket.on("joinRoom", (roomId, userName) => {
        if (rooms[roomId] && rooms[roomId].users.length < 2) {
          rooms[roomId].users.push({ id: socket.id, name: userName });
          if (rooms[roomId].users.length === 2) {
            const [user1, user2] = rooms[roomId].users;
            io.to(user2.id).emit("userJoined", user1.name);
            io.to(user1.id).emit("userJoined", user2.name);
          }
          socket.join(roomId);
        } else {
          socket.emit("roomFull");
        }
      });

      socket.on("new-move", (data) => {
        io.to(data.roomid).emit("update-board", { newBoard : data.newBoard, isXNext: data.isXNext });
      });

      socket.on("reset-game", (roomid) => {
        io.to(roomid).emit("reset-board");
      });

      socket.on("change-score", (data) => {
        console.log(data);
        io.to(data.roomid).emit("update-score", data.newCount);
      });

      socket.on("disconnect", () => {
        Object.keys(rooms).forEach((roomId) => {
          rooms[roomId].users = rooms[roomId].users.filter(
            (user: any) => user.id !== socket.id
          );
        });
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
