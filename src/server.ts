import { httpServer, app } from "./app";


/**
 * Start Express server.
 */
const server = httpServer.listen(app.get("port"), async () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");

});

export default server;
