// const fs = require("fs");
// const fsextra = require("fs-extra");

// const xlsxFile = require("read-excel-file/node");

// const minify = require("@node-minify/core");
// const cleanCSS = require("@node-minify/clean-css");
// const glob = require("glob");

import fs from "fs";
import fsextra from "fs-extra";
import xlsxFile from "read-excel-file/node";
import minify from "@node-minify/core";
import cleanCSS from "@node-minify/clean-css";
import glob from "glob";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

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

let prog = async () => {
  const CROWDIN = process.env.VITE_CROWDIN;

  var requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${CROWDIN}` },
    redirect: "follow",
  };

  const targetLanguages = await (
    await fetch(
      "https://api.crowdin.com/api/v2/projects/431524?limit=50",
      requestOptions
    )
  ).json();

  // console.log(JSON.stringify(targetLanguages.data))

  const targetLang = await targetLanguages.data.targetLanguages.map((val) => ({
    id: val.id,
    name: val.name,
    code:
      val.editorCode.length > 2
        ? val.editorCode.slice(0, 2) + "-" + val.editorCode.substring(2)
        : val.editorCode,
  }));

  const progress = await (
    await fetch(
      "https://api.crowdin.com/api/v2/projects/431524/languages/progress?limit=50",
      requestOptions
    )
  ).json();

  const translationStatus = progress.data.map((val) => ({
    id: val.data.languageId,
    translation: val.data.translationProgress,
    approval: val.data.approvalProgress,
  }));

  const mergedArray = targetLang.map((lang) => {
    const status = translationStatus.find((status) => status.id === lang.id);
    return { ...lang, ...status };
  });

  mergedArray.sort((a, b) => a.name.localeCompare(b.name));

  return mergedArray;
};

let langs = await prog();

let languages = [
  {
    lang: "en",
    name: "English",
    col: 1,
    site: "https://pattern.monster",
    path: "../",
  },
  {
    lang: "de",
    name: "Deutsch",
    col: 2,
    site: "https://de.pattern.monster",
    path: "../de.pattern.monster/",
  },
  {
    lang: "pl",
    name: "Polski",
    col: 3,
    site: "https://pl.pattern.monster",
    path: "../pl.pattern.monster/",
  },
  {
    lang: "tr",
    name: "Türkçe",
    col: 4,
    site: "https://tr.pattern.monster",
    path: "../tr.pattern.monster/",
  },
  {
    lang: "es",
    name: "Español",
    col: 5,
    site: "https://es.pattern.monster",
    path: "../es.pattern.monster/",
  },
  {
    lang: "it",
    name: "Italiano",
    col: 6,
    site: "https://it.pattern.monster",
    path: "../it.pattern.monster/",
  },
  {
    lang: "ro",
    name: "Română",
    col: 7,
    site: "https://ro.pattern.monster",
    path: "../ro.pattern.monster/",
  },
  {
    lang: "fr",
    name: "Français",
    col: 8,
    site: "https://fr.pattern.monster",
    path: "../fr.pattern.monster/",
  },
  {
    lang: "ar",
    name: "العربية",
    col: 9,
    site: "https://ar.pattern.monster",
    path: "../ar.pattern.monster/",
  },
  {
    lang: "pt",
    name: "Português",
    col: 10,
    site: "https://pt.pattern.monster",
    path: "../pt.pattern.monster/",
  },
  {
    lang: "zh-cn",
    name: "中文(简体)",
    col: 11,
    site: "https://cn.pattern.monster",
    path: "../cn.pattern.monster/",
  },
  {
    lang: "nl",
    name: "Nederlands",
    col: 12,
    site: "https://nl.pattern.monster",
    path: "../nl.pattern.monster/",
  },
  {
    lang: "sv",
    name: "Svenska",
    col: 13,
    site: "https://sv.pattern.monster",
    path: "../sv.pattern.monster/",
  },
  {
    lang: "uk",
    name: "Українська",
    col: 14,
    site: "https://uk.pattern.monster",
    path: "../uk.pattern.monster/",
  },
  {
    lang: "ru",
    name: "Русский",
    col: 15,
    site: "https://ru.pattern.monster",
    path: "../ru.pattern.monster/",
  },
  {
    lang: "hu",
    name: "Magyar",
    col: 16,
    site: "https://hu.pattern.monster",
    path: "../hu.pattern.monster/",
  },
  {
    lang: "af",
    name: "Afrikaans",
    col: 17,
    site: "https://af.pattern.monster",
    path: "../af.pattern.monster/",
  },
  {
    lang: "ca",
    name: "Català",
    col: 18,
    site: "https://ca.pattern.monster",
    path: "../ca.pattern.monster/",
  },
  {
    lang: "zh-tw",
    name: "中文 (繁體)",
    col: 19,
    site: "https://tw.pattern.monster",
    path: "../tw.pattern.monster/",
  },
  {
    lang: "cs",
    name: "Čeština",
    col: 20,
    site: "https://cs.pattern.monster",
    path: "../cs.pattern.monster/",
  },
  {
    lang: "da",
    name: "Dansk",
    col: 21,
    site: "https://da.pattern.monster",
    path: "../da.pattern.monster/",
  },
  {
    lang: "fi",
    name: "Suomi",
    col: 22,
    site: "https://fi.pattern.monster",
    path: "../fi.pattern.monster/",
  },
];

let versions = languages.map((language) => ({
  lang: language.lang,
  name: language.name,
  website: language.site,
}));

xlsxFile("../../../../OneDrive/Documents/Patterns.xlsm", {
  sheet: "Patterns",
}).then((rows) => {
  languages.forEach((language) => {
    xlsxFile("../../../../OneDrive/Documents/Patterns.xlsm", {
      sheet: "Translation",
    }).then((transRows) => {
      let array = getArray(language.col);

      function getArray(col) {
        let o = {};
        for (let j = 63; j < transRows.length; j++) {
          o[transRows[j][1].toLowerCase()] =
            transRows[j][col] === "" || !transRows[j][col]
              ? transRows[j][1]
              : transRows[j][col];
        }

        return o;
      }

      let translations = getTranslation(language.col);

      function getTranslation(col) {
        let o = {};
        for (let j = 0; j < transRows.length; j++) {
          o[transRows[j][0]] =
            transRows[j][col] === "" || !transRows[j][col]
              ? transRows[j][1]
              : transRows[j][col];
        }

        return o;
      }

      function getStrings(col) {
        let o = {};
        for (let j = 1; j < transRows.length; j++) {
          o[transRows[j][0]] =
            transRows[j][col] === "" || !transRows[j][col]
              ? transRows[j][1]
              : transRows[j][col];
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
          %sapper.head%
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2799761399763923"
     crossorigin="anonymous"></script>
        </head>
        <body>
          <div id="sapper">%sapper.html%</div>
      
          %sapper.scripts%
          <!-- Cloudflare Web Analytics -->
          <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "477d2f960abf4a47b775638d604c616a"}'></script>
          <!-- End Cloudflare Web Analytics -->
        </body>
      </html>`;

      fs.writeFile(
        language.path + "src/template.html",
        templateFile,
        function (err) {
          if (err) return console.log(err);
        }
      );

      // _lang.js
      let writeStream = fs.createWriteStream(
        language.path + "src/routes/_lang.js"
      );
      writeStream.write("const strings = ");
      writeStream.write(JSON.stringify(getStrings(language.col)));
      writeStream.write(";export default { strings };");

      writeStream.on("finish", () => {
        console.log("Created strings");
      });
      writeStream.end();

      // stores.js
      writeStream = fs.createWriteStream(
        language.path + "src/routes/stores.js"
      );
      writeStream.write(`import { writable } from "svelte/store";

export const themeStore = writable("light");
export const langStore = writable("${language.lang}");`);

      writeStream.on("finish", () => {
        console.log("Created ");
      });
      writeStream.end();

      // robots.txt
      writeStream = fs.createWriteStream(language.path + "static/robots.txt");
      writeStream.write(`Sitemap: ${language.site}/sitemap.xml
User-agent: * 
Crawl-Delay: 20`);

      writeStream.on("finish", () => {
        console.log("Created ");
      });
      writeStream.end();

      // _index.js
      let langValues = printObject(language.col);

      writeStream = fs.createWriteStream(
        language.path + "src/routes/_index.js"
      );
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
      writeStream.write(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
      );
      writeStream.write("    <url>\n");
      writeStream.write("        <loc>" + language.site + "</loc>\n");
      writeStream.write("        <lastmod>" + date + "</lastmod>\n");
      writeStream.write("        <priority>1.0</priority>\n");
      writeStream.write("    </url>\n");

      sitePath.forEach((path) => {
        writeStream.write("    <url>\n");
        writeStream.write(
          "        <loc>" + language.site + "/" + path + "/</loc>\n"
        );
        writeStream.write("        <lastmod>" + date + "</lastmod>\n");
        writeStream.write("        <priority>0.8</priority>\n");
        writeStream.write("    </url>\n");
      });

      langValues.forEach((path) => {
        writeStream.write("    <url>\n");
        writeStream.write(
          "        <loc>" + language.site + "/" + path.slug + "/</loc>\n"
        );
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

      // package.json
      writeStream = fs.createWriteStream(language.path + "package.json");
      writeStream.write(`{
  "name": "${language.site}",
  "description": "SVG Patterns",
  "version": "0.0.1",
  "scripts": {
    "dev": "sapper dev",
    "build": "sapper build --legacy",
    "export": "sapper export --entry \\"index api features confirmed herringbone-7 herringbone-8 flower-1 flower-2 flower-3 flower-4 flower-5 flower-6 flower-7 plus-1 plus-2 plus-3 plus-4 circles-1 circles-2 circles-3 circles-4 circles-5 circles-6 circles-7 concentric-circles-1 concentric-circles-2 concentric-circles-3 adjointed-circles adjointed-diamonds diamonds-1 diamonds-2 diamonds-3 hexagon-1 hexagon-2 hexagon-3 hexagon-4 hexagon-5 hexagon-6 hexagon-7 hexagon-8 overlapping-hexagons squares-and-squares-1 squares-and-squares-2 squares-and-diamonds squares-and-circles-1 squares-and-circles-2 squares-and-plus-1 squares-and-plus-2 squares-and-stars-1 squares-and-stars-2 stars-and-lines-1 stars-and-lines-2 triangles-1 triangles-2 triangles-3 triangles-4 triangles-5 triangles-6 triangles-7 triangles-8 triangles-9 triangles-10 inverted-triangles checkerboard japanese-pattern-1 japanese-pattern-2 japanese-pattern-3 japanese-pattern-4 japanese-pattern-5 japanese-pattern-6 eyes-1 eyes-2 eyes-3 eyes-4 jigsaw railroad octagons-1 octagons-2 lines-1 lines-2 scales-1 scales-2 scales-3 scales-4 leaves-1 leaves-2 leaves-3 leaves-4 leaves-5 leaves-6 leaves-7 leaves-8 pipes zebra memphis-1 memphis-2 memphis-3 memphis-4 memphis-5 memphis-6 greek-key chinese-1 chinese-2 chinese-3 chinese-4 chinese-9 chinese-5 chinese-6 chinese-7 chinese-8 new-1 new-2 new-3 new-4 new-5 new-6 new-7 new-8 new-9 new-10 new-11 new-12 new-13 new-14 new-15 new-16 new-17 double-bubble-1 double-bubble-2 stars-1 stars-2 stars-3 stars-4 stars-5 stars-6 semicircles-1 songket-1 christmas-tree-1 candy-cane-1 christmas-bells-1 christmas-pattern-1 christmas-pattern-2 christmas-pattern-3 snowflakes-1 christmas-tree-balls santa-claus christmas-gift cubes-1 cubes-2 cubes-3 stained-glass tiles-1 rectangles-and-squares-1 mexican-pattern-1 mexican-pattern-2 ethnic-pattern-1 ethnic-pattern-2 ethnic-pattern-3 plaid-pattern-1 plaid-pattern-2 plaid-pattern-3 plaid-pattern-4 doodle-1 doodle-2 batik-1 batik-2 batik-3 batik-4 batik-5 batik-6 african-1 african-2 african-3 african-4 triangles-11 hexagon-9 tiles-2 tiles-3 tribal-1 tribal-2 waves-8 leaves-9 blobs african-5 triangles-12 squares-and-triangles-1 tribal-3 circles-8 triangles-13 triangles-14 triangles-15 triangles-16 circles-9 concentric-circles-4 concentric-circles-5 concentric-circles-6 stripes-1 stripes-2 chevron-4 chevron-5 terrazzo-1 geometric-1 halloween-1 halloween-2 halloween-3 halloween-4 halloween-5 halloween-6 hexagon-10 hexagon-11 squares-1 squares-2 sprinkles-1 cubes-4 geometric-2 geometric-3 geometric-4 circles-10 circles-11 circles-12 triangles-17 triangles-18 geometric-5 geometric-6 squiggle-1 moroccan-1 moroccan-2 japanese-pattern-7 waves-9 christmas-pattern-4 christmas-pattern-5 plaid-pattern-5 plaid-pattern-6 circles-13 circles-14 interlocked-hexagons-1 interlocked-hexagons-2 interlocked-hexagons-3 lanterns-1 leaves-10 lines-3 rope-1 waves-10 waves-11 lines-4 lines-5 lines-6 plus-5 plus-6 scales-5 scales-6 scales-7 scales-8 scales-9 triangles-19 triangles-20 batik-7 circles-15 circles-16 circles-17 circles-and-diamonds diamonds-4 diamonds-5 diamonds-6 geometric-7 geometric-8 geometric-9 geometric-10 waves-12 waves-13 waves-14 waves-15 double-bubble-3 double-bubble-4 patches squares-3 squares-4 squares-5 squares-6 triangles-21 triangles-22 triangles-23 tribal-4 tribal-5 chinese-10 chinese-11 diamonds-7 diamonds-8 diamonds-9 waves-16 waves-17 waves-18 waves-19 waves-20\\"",
    "start": "node __sapper__/build",
    "test": "run-p --race dev cy:run"
  },
  "dependencies": {
    "@rollup/plugin-json": "^4.1.0",
    "@simonwep/pickr": "^1.8.2",
    "compression": "^1.7.4",
    "dayjs": "^1.11.9",
    "dotenv": "^16.3.1",
    "polka": "next",
    "prettier": "^2.8.8",
    "save-svg-as-png": "^1.4.17",
    "sirv": "^1.0.7"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^16.0.0",
    "@rollup/plugin-node-resolve": "^10.0.0",
    "@rollup/plugin-replace": "^2.3.4",
    "npm-run-all": "^4.1.5",
    "rollup": "^2.33.3",
    "rollup-plugin-svelte": "^6.1.1",
    "rollup-plugin-terser": "^7.0.2",
    "sapper": "^0.29.1"`);

      if (language.lang == "en")
        writeStream.write(`,
    "svelte": "^3.59.1",
    "fs-extra": "^11.1.1",
    "@node-minify/clean-css": "^8.0.6",
    "@node-minify/core": "^8.0.6",
    "read-excel-file": "^5.6.1",
    "glob": "^8.1.0",
    "tinycolor2": "^1.6.0",
    "sharp": "^0.32.3",
    "convert-svg-to-png": "^0.6.4"`);
      writeStream.write(`
  }
}`);

      writeStream.on("finish", () => {
        console.log("Created ");
      });
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
        if (language.lang !== "en")
          copyFile(
            "../src/routes/" + filename,
            language.path + "src/routes/" + filename
          );
      });

      copyFile(
        "../src/css/" + globalCSS,
        language.path + "static/" + globalCSS
      );
      copyFile("../src/css/" + pickrCSS, language.path + "static/" + pickrCSS);
      copyFile("../src/server.js", language.path + "src/server.js");

      function copyFile(source, dest) {
        fs.copyFile(source, dest, (err) => {
          if (err) throw err;
        });
      }

      let createConstants = () => {
        let writeStream = fs.createWriteStream(
          `${language.path}src/routes/_constants.js`
        );

        writeStream.write(`const strings = {
  website: "${language.site}",
  title: "Pattern Monster",
  description:
    "${translations.description}",
  description2: "${translations.description2}",
  description3: 
    "${translations.description3}",
  keywords:
    "${translations.keywords}",
  pages: [
    {
      page: "index",
      title: "${translations.title}",
      keywords: "",
      description: "",
      image: "",
    },
    {
      page: "changelog",
      title: "${translations.changelog}",
      keywords: "${translations.changelog.toLowerCase()}",
      description: "Changelog for Pattern Monster.",
      image: "",
    },
    {
      page: "downloads",
      title: "${translations.downloads}",
      keywords: "${translations.downloads.toLowerCase()}",
      description: "Downloads for Pattern Monster.",
      image: "",
    },
    {
      page: "features",
      title: "${translations.features}",
      keywords: "${translations.features.toLowerCase()}",
      description: "Features for Pattern Monster.",
      image: "",
    },
    {
      page: "privacy-policy",
      title: "${translations.privacy}",
      keywords: "${translations.privacy.toLowerCase()}",
      description: "Privacy Policy for Pattern Monster.",
      image: "",
    },
    {
      page: "api",
      title: "API",
      keywords: "api",
      description: "API for Pattern Monster.",
      image: "",
    },
  ],
  versions: ${JSON.stringify(versions)},
  langs:${JSON.stringify(langs)}
};

const pageDetails = (page) => {
  let imagePrefix = "https://giguom.com/pattern.monster/images/";
  let pageValues =
    strings.pages.filter((currentPage) => currentPage.page === page)[0] ||
    strings.pages.filter((currentPage) => currentPage.page === "index")[0];

  let website = strings.website;
  let title = strings.title + " - " + strings.pages[0].title;
  let url = website;
  let keywords = strings.keywords;
  let desc = strings.description + " " + strings.description3;
  let image =
    pageValues.image == "" ? imagePrefix + "/TwitterBG2.png" : pageValues.image;

  let versions = strings.versions.map((version) => {
    return {
      lang: version.lang,
      website: version.website + (page === "index" ? "" : "/" + page + "/"),
    };
  });

  if (page != "index") {
    title =
      pageValues.title + " - " + strings.title + " | " + strings.pages[0].title;
    url = website + "/" + page + "/";
    desc =
      pageValues.description +
      " " +
      strings.description +
      " " +
      strings.description3;
    keywords = pageValues.keywords + ", " + strings.keywords;
  }

  return { title, url, keywords, desc, image, versions };
};

let lightColors = [
  "hsla(0,0%,100%,1)",
  "hsla(258.5,59.4%,59.4%,1)",
  "hsla(339.6,82.2%,51.6%,1)",
  "hsla(198.7,97.6%,48.4%,1)",
  "hsla(47,80.9%,61%,1)",
];
let darkColors = [
  "hsla(240,6.7%,17.6%,1)",
  "hsla(47,80.9%,61%,1)",
  "hsla(4.1,89.6%,58.4%,1)",
  "hsla(186.8,100%,41.6%,1)",
  "hsla(258.5,59.4%,59.4%,1)",
];

export default { strings, pageDetails, lightColors, darkColors };
        `);
        // writeStream.write(JSON.stringify(getStrings(language.col)));
        // writeStream.write(';export default { strings };');

        writeStream.on("finish", () => {
          console.log("Created strings");
        });
        writeStream.end();
      };

      createConstants();

      function printObject(col) {
        let p = [];
        for (let j = 1; j < rows.length; j++) {
          // for (let j = 1; j < 12; j++) {
          let row = rows[j];
          let title = rows[j][1];
          let tags = rows[j][11];

          var newTitle =
            title.indexOf(" -") > 0
              ? title.substring(0, title.indexOf(" -"))
              : title;
          var newArray = tags.split(",");
          let newTag = newArray;

          newArray.forEach((val) => {
            if (
              array[val.toLowerCase()] &&
              array[val.toLowerCase()].toLowerCase() !== val
            )
              newTag.push(array[val.toLowerCase()].toLowerCase());
          });

          p.push({
            title: array[newTitle.toLowerCase()]
              ? title.replace(newTitle, array[newTitle.toLowerCase()])
              : title,
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
