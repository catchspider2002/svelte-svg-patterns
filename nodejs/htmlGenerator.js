const fs = require("fs");
const fsextra = require("fs-extra");

const xlsxFile = require("read-excel-file/node");

const minify = require("@node-minify/core");
const cleanCSS = require("@node-minify/clean-css");
const glob = require("glob");

let timestamp = Math.round(+new Date() / 1000);
let globalCSS = "global-" + timestamp + ".min.css";
let pickrCSS = "pickr-" + timestamp + ".min.css";

minify({
  compressor: cleanCSS,
  input: "../src/css/global.css",
  output: "../src/css/" + globalCSS,
  callback: function (err, min) {},
});

minify({
  compressor: cleanCSS,
  input: "../src/css/pickr.css",
  output: "../src/css/" + pickrCSS,
  callback: function (err, min) {},
});

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
    { lang: "ar", name: "العربية", col: 9, site: "https://ar.pattern.monster", path: "../../ar.pattern.monster/" },

    // { lang: "uk", name: "Українська", col: 7, path: "../../uk.pattern.monster/" },
    // { lang: "af", name: "Afrikaans", col: 8, path: "../../af.pattern.monster/" },
  ];

  languages.forEach((language) => {
    xlsxFile("../../../../OneDrive/Documents/Patterns.xlsm", { sheet: "Translation" }).then((transRows) => {
      let array = getArray(language.col);

      function getArray(col) {
        let o = {};
        for (let j = 63; j < transRows.length; j++) {
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

      glob(language.path + "static/global*.css", function (er, files) {
        for (const file of files) {
          try {
            fs.unlinkSync(file);
          } catch (err) {
            console.error(err);
          }
        }
      });

      glob(language.path + "static/pickr*.css", function (er, files) {
        for (const file of files) {
          try {
            fs.unlinkSync(file);
          } catch (err) {
            console.error(err);
          }
        }
      });

      let direction = ``;
      if (language.lang === "ar") direction = ` dir="rtl"`;
      let templateFile = `<!DOCTYPE html>
      <html lang="${language.lang}"${direction}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      
          %sapper.base%
          <link rel="manifest" href="manifest.json" crossorigin="use-credentials" />
          <link rel="sitemap" type="application/xml" href="${language.site}/sitemap.xml" />
          <link rel="icon" type="image/png" href="favicon.png" />
          <link rel="apple-touch-icon" href="logo-512.png" />
          <link rel="stylesheet" href="${globalCSS}" />
          <link rel="preload" href="${pickrCSS}" as="style" onload="this.onload=null;this.rel='stylesheet'" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet" />
      
          <meta name="author" content="Naveen CS" />
          <meta name="theme-color" content="#44337a" />
          <meta name="google" content="notranslate" />
          <meta name="robots" content="index,follow" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#44337a" />
          <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/icons/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/icons/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/icons/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/icons/mstile-310x310.png" />
          <meta property="og:site_name" content="Pattern.Monster" />
          <meta property="og:type" content="website" />
          <meta name="twitter:site" content="@pattern_monster" />
          <meta name="twitter:card" content="summary_large_image" />
      
          %sapper.styles%
      
          <!-- This contains the contents of the <svelte:head> component, if
             the current page has one -->
          %sapper.head%
        </head>
        <body>
          <div id="sapper">%sapper.html%</div>
      
          %sapper.scripts%
          <!-- Cloudflare Web Analytics -->
          <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "477d2f960abf4a47b775638d604c616a"}'></script>
          <!-- End Cloudflare Web Analytics -->
        </body>
      </html>`;

      fs.writeFile(language.path + "src/template.html", templateFile, function (err) {
        if (err) return console.log(err);
      });

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
        "_values.js",
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
        if (language.lang !== "en") copyFile("../src/routes/" + filename, language.path + "src/routes/" + filename);
      });

      copyFile("../src/css/" + globalCSS, language.path + "static/" + globalCSS);
      copyFile("../src/css/" + pickrCSS, language.path + "static/" + pickrCSS);

      function copyFile(source, dest) {
        fs.copyFile(source, dest, (err) => {
          if (err) throw err;
        });
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
