"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const morgan_1 = __importDefault(require("morgan"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const swagger_1 = __importDefault(require("./lib/swagger"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const file_route_1 = __importDefault(require("./routes/file.route"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4040;
// swtup swagger
app.use(swagger_1.default);
// setup routes without bodyParser
app.use("/upload", upload_route_1.default);
// setup middelware
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
// setup routes
app.use("/auth", auth_route_1.default);
app.use("/user", user_route_1.default);
app.use("/products", product_route_1.default);
app.use("/categories", category_route_1.default);
app.use("/carts", cart_route_1.default);
app.use("/orders", order_route_1.default);
app.use("/files", file_route_1.default);
app.get("*", (req, res) => {
    res.status(404).send("Endpoint notfound 404 !");
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
