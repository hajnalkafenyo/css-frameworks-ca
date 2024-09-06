// This file runs during build time and copies the required font to the dist folder

const files = [
    {
        from: "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff",
        to: "dist/css/fonts/bootstrap-icons.woff"
    },
    {
        from: "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2",
        to: "dist/css/fonts/bootstrap-icons.woff2"
    }
];

const fs = require("fs");

files.forEach(file => {
    // Check if directory exists, if not create it
    const dir = file.to.substring(0, file.to.lastIndexOf("/"));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.copyFile(file.from, file.to, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Copied ${file.from} to ${file.to}`);
        }
    });
}
);
