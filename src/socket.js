// src/socket.js
import { io } from "socket.io-client";
const socket = io("http://localhost:3001"); // 若部署到 Render，要改成公開網址
export default socket;
