import { app, BrowserWindow } from "electron";
import * as path from "path";
let mainWindow = null;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.ts"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    const url = process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : `file://${path.join(__dirname, "../dist/index.html")}`;
    mainWindow.loadURL(url);
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});
app.on("activate", () => {
    if (mainWindow === null)
        createWindow();
});
