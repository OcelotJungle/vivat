const fileUpload = require("express-fileupload");
const forceSSL = require("express-force-ssl");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const server = require("express")();
const https = require("https");
const http = require("http");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTP_PORT = process.env.HTTP_PORT || 80;

const seo = require("./routes/seo.js");
const api = require("./routes/api.js");
const mail = require("./routes/mail.js");
const auth = require("./routes/auth.js");
const user = require("./routes/user.js");
const admin = require("./routes/admin.js");

(async () => {
    try {
        await app.prepare();
        
        const options = {
            ca: fs.readFileSync("ssl/ca.crt"),
            cert: fs.readFileSync("ssl/cert.crt"),
            key: fs.readFileSync("ssl/private.key")
        }
        
        http.createServer(server).listen(HTTP_PORT);
        https.createServer(options, server).listen(HTTPS_PORT);
        server.use(forceSSL);

        // if(dev || true) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        
        server.use(fileUpload({}));
        server.use(cookieParser());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));
        
        const dynamicFileHandler = (req, res) => res.sendFile(__dirname + path.normalize(decodeURI(req.path)));
        server.post("/documents/*", dynamicFileHandler);
        server.get("/documents/*", dynamicFileHandler);
        server.post("/images/*", dynamicFileHandler);
        server.get("/images/*", dynamicFileHandler);

        server.use("/sitemap.xml", seo.sitemap);
        server.use("/robots.txt", seo.robots);
        server.use("/api/admin", admin);
        server.use("/api/user", user);
        server.use("/api/auth", auth);
        server.use("/api/mail", mail);
		server.use("/api", api);
        
		server.get("*", (request, response) => handle(request, response));

        console.log(`--> Process environment: '${process.env.NODE_ENV}'`);
        console.log(`--> Is app in development mode: ${dev}`);
        console.log(`-> Ready on port ${HTTP_PORT} for HTTP`);
        console.log(`-> Ready on port ${HTTPS_PORT} for HTTPS`);
	} catch(e) {
		console.error(e.stack);
		process.exit(1);
	}
})();