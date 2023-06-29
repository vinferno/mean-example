"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "client", "public")));
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "client", "public", "index.html"));
});
io.on("connection", function (socket) {
    socket.on("joinRoom", function (roomId, username) {
        socket.join(roomId);
        io.to(roomId).emit("sendMessage", username + " joined room " + roomId);
    });
    socket.on("sendMessage", function (message, roomId, username) {
        io.to(roomId).emit("sendMessage", message, username);
    });
});
var port = process.env.PORT || 5000;
server.listen(port);
