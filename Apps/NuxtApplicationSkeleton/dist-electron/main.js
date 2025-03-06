import { app as n, BrowserWindow as i, ipcMain as s } from "electron";
import o from "node:path";
const p = o.join(process.env.APP_ROOT, "dist-electron"), r = o.join(process.env.APP_ROOT, ".output/public");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? o.join(process.env.APP_ROOT, "public") : r;
let e;
function t() {
  e = new i({
    webPreferences: {
      preload: o.join(p, "preload.js")
    }
  }), process.env.VITE_DEV_SERVER_URL ? (e.loadURL(process.env.VITE_DEV_SERVER_URL), e.webContents.openDevTools()) : e.loadFile(o.join(process.env.VITE_PUBLIC, "index.html"));
}
function c() {
  s.handle("app-start-time", () => (/* @__PURE__ */ new Date()).toLocaleString());
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && t();
});
n.whenReady().then(() => {
  c(), t();
});
export {
  p as MAIN_DIST,
  r as RENDERER_DIST
};
