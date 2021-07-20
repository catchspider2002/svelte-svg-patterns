const fs = require("fs");
const fsextra = require("fs-extra");

const xlsxFile = require("read-excel-file/node");

// let array = { waves: "Wellen", chevron: "Zickzack", "straight lines": "Gerade Linien", lines: "Linien" };

xlsxFile("../../../../OneDrive/Documents/Patterns.xlsm", { sheet: "Patterns" }).then((rows) => {
  let languages = [
    { lang: "en", name: "English", col: 1, site: "https://pattern.monster", path: "../" },
    { lang: "de", name: "Deutsch", col: 2, site: "https://de.pattern.monster", path: "../../de.pattern.monster/" },
    { lang: "pl", name: "Polski", col: 3, site: "https://pl.pattern.monster", path: "../../pl.pattern.monster/" },
    { lang: "tr", name: "Türkçe", col: 4, site: "https://tr.pattern.monster", path: "../../tr.pattern.monster/" },
    { lang: "es", name: "Español", col: 5, site: "https://es.pattern.monster", path: "../../es.pattern.monster/" },
    { lang: "it", name: "Italiano", col: 6, site: "https://it.pattern.monster", path: "../../it.pattern.monster/" },
    { lang: "ro", name: "Română", col: 7, site: "https://ro.pattern.monster", path: "../../ro.pattern.monster/" },
    { lang: "fr", name: "Français", col: 8, site: "https://fr.pattern.monster", path: "../../fr.pattern.monster/" },
    // { lang: "uk", name: "Українська", col: 7, path: "../../uk.pattern.monster/" },
    // { lang: "af", name: "Afrikaans", col: 8, path: "../../af.pattern.monster/" },
  ];

  languages.forEach((language) => {
    xlsxFile("../../../../OneDrive/Documents/Patterns.xlsm", { sheet: "Translation" }).then((transRows) => {
      let array = getArray(language.col);
      // console.log(array);

      function getArray(col) {
        let o = {};
        for (let j = 63; j < transRows.length; j++) {
          // for (let j = 1; j < 4; j++) {
          o[transRows[j][1].toLowerCase()] = transRows[j][col] === "" || !transRows[j][col] ? transRows[j][1] : transRows[j][col];
        }

        return o;
      }

      function getStrings(col) {
        let o = {};
        for (let j = 1; j < transRows.length; j++) {
          o[transRows[j][0]] = transRows[j][col] === "" || !transRows[j][col] ? transRows[j][1] : transRows[j][col];
        }

        return o;
      }

      // _lang.js
      let writeStream = fs.createWriteStream(language.path + "src/routes/_lang.js");
      writeStream.write("const strings = ");
      writeStream.write(JSON.stringify(getStrings(language.col)));
      writeStream.write(";export default { strings };");

      writeStream.on("finish", () => {
        console.log("Created strings");
      });
      writeStream.end();

      // _index.js
      let langValues = printObject(language.col);

      writeStream = fs.createWriteStream(language.path + "src/routes/_index.js");
      writeStream.write("const index = ");
      writeStream.write(JSON.stringify(langValues));
      writeStream.write("; export default index;");

      writeStream.on("finish", () => {
        console.log("Created ");
      });
      writeStream.end();

      let sitePath = ["features", "downloads", "changelog", "privacy-policy"];

      // sitemap.xml
      writeStream = fs.createWriteStream(language.path + "static/sitemap.xml");

      let date = new Date().toISOString();

      writeStream.write('<?xml version="1.0" encoding="UTF-8"?>\n');
      writeStream.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');
      writeStream.write("    <url>\n");
      writeStream.write("        <loc>" + language.site + "</loc>\n");
      writeStream.write("        <lastmod>" + date + "</lastmod>\n");
      writeStream.write("        <priority>1.0</priority>\n");
      writeStream.write("    </url>\n");

      sitePath.forEach((path) => {
        writeStream.write("    <url>\n");
        writeStream.write("        <loc>" + language.site + "/" + path + "/</loc>\n");
        writeStream.write("        <lastmod>" + date + "</lastmod>\n");
        writeStream.write("        <priority>0.8</priority>\n");
        writeStream.write("    </url>\n");
      });

      langValues.forEach((path) => {
        writeStream.write("    <url>\n");
        writeStream.write("        <loc>" + language.site + "/" + path.slug + "/</loc>\n");
        writeStream.write("        <lastmod>" + date + "</lastmod>\n");
        writeStream.write("        <priority>0.8</priority>\n");
        writeStream.write("    </url>\n");
      });

      writeStream.write("</urlset>");

      // the finish event is emitted when all data has been flushed from the stream
      writeStream.on("finish", () => {
        console.log("Created sitemap");
      });

      // close the stream
      writeStream.end();

      // fs.copyFile("global.css", lang + "/css/global.css", (err) => {
      //   if (err) throw err;
      // });
      // copyFile("../src/routes/_error.svelte", language.path + "src/components");

      if (language.lang !== "en") {
        fsextra
          .copy("../src/components", language.path + "src/components")
          .then(() => console.log("Files copied successfully!"))
          .catch((err) => console.error(err));
      }

      let routesFiles = [
        "_error.svelte",
        "_layout.svelte",
        "[slug].json.js",
        "[slug].svelte",
        "changelog.svelte",
        "confirmed.svelte",
        "downloads.svelte",
        "features.svelte",
        "index.json.js",
        // "index.svelte", -- Don't copy this - have to change the language
        "privacy-policy.svelte",
      ];

      routesFiles.forEach((filename) => {
        copyFile("../src/routes/" + filename, language.path + "src/routes/" + filename);
      });

      copyFile("../static/global.css", language.path + "static/global.css");

      function copyFile(source, dest) {
        if (language.lang !== "en") {
          fs.copyFile(source, dest, (err) => {
            if (err) throw err;
          });
        }
      }

      function printObject(col) {
        let p = [];
        for (let j = 1; j < rows.length; j++) {
          // for (let j = 1; j < 12; j++) {
          let row = rows[j];
          let title = rows[j][1];
          let tags = rows[j][11];

          var newTitle = title.indexOf(" -") > 0 ? title.substring(0, title.indexOf(" -")) : title;
          var newArray = tags.split(",");
          let newTag = newArray;

          newArray.forEach((val) => {
            if (array[val.toLowerCase()] && array[val.toLowerCase()].toLowerCase() !== val) newTag.push(array[val.toLowerCase()].toLowerCase());
          });

          p.push({
            title: array[newTitle.toLowerCase()] ? title.replace(newTitle, array[newTitle.toLowerCase()]) : title,
            slug: row[2],
            mode: row[3],
            colors: row[4],
            maxStroke: row[5],
            maxScale: row[6],
            maxSpacing: JSON.parse(row[7]),
            width: row[8],
            height: row[9],
            vHeight: row[10],
            tags: newTag,
            path: row[12],
            creationDate: row[13],
          });
        }

        return p;
      }
    });
  });
});
