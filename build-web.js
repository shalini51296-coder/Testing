// Makes www/ fully self-contained so the app works with NO internet:
//   1. compiles Tailwind CSS (replaces the cdn.tailwindcss.com script)
//   2. copies Font Awesome CSS + font files (replaces the cdnjs link)
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const www = path.join(root, "www");

// 1. Tailwind
execSync(
  "npx tailwindcss -c tailwind.config.js -i src/input.css -o www/tailwind.css --minify",
  { stdio: "inherit", cwd: root }
);

// 2. Font Awesome (css/all.min.css refers to ../webfonts/, so keep that layout)
const fa = path.join(root, "node_modules", "@fortawesome", "fontawesome-free");
const faOut = path.join(www, "fa");
fs.rmSync(faOut, { recursive: true, force: true });
fs.mkdirSync(path.join(faOut, "css"), { recursive: true });
fs.copyFileSync(
  path.join(fa, "css", "all.min.css"),
  path.join(faOut, "css", "all.min.css")
);
fs.cpSync(path.join(fa, "webfonts"), path.join(faOut, "webfonts"), {
  recursive: true,
});

// 3. Safety checks: fail the build instead of shipping an app that needs internet
const html = fs.readFileSync(path.join(www, "index.html"), "utf8");
for (const bad of ["cdn.tailwindcss.com", "cdnjs.cloudflare.com"]) {
  if (html.includes(bad)) throw new Error("index.html still references " + bad);
}
const css = fs.statSync(path.join(www, "tailwind.css")).size;
if (css < 3000) throw new Error("tailwind.css looks empty (" + css + " bytes)");
console.log("Web assets ready. tailwind.css = " + css + " bytes");
