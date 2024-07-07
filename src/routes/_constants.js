const strings = {
  website: "https://pattern.monster",
  title: "Pattern Monster",
  description:
    "A simple online pattern generator to create repeatable SVG patterns.",
  description2: "Speed up your website without compromising on image quality.",
  description3: 
    "Perfect for website backgrounds, apparel, branding, packaging design and more.",
  keywords:
    "svg patterns, patterns, svg backgrounds, vector wallpaper, pattern generator, pattern maker",
  pages: [
    {
      page: "index",
      title: "SVG Pattern Generator",
      keywords: "",
      description: "",
      image: "",
    },
    {
      page: "changelog",
      title: "Changelog",
      keywords: "changelog",
      description: "Changelog for Pattern Monster.",
      image: "",
    },
    {
      page: "downloads",
      title: "Downloads",
      keywords: "downloads",
      description: "Downloads for Pattern Monster.",
      image: "",
    },
    {
      page: "features",
      title: "Features",
      keywords: "features",
      description: "Features for Pattern Monster.",
      image: "",
    },
    {
      page: "privacy-policy",
      title: "Privacy Policy",
      keywords: "privacy policy",
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
  versions: [{"lang":"en","name":"English","website":"https://pattern.monster"},{"lang":"de","name":"Deutsch","website":"https://de.pattern.monster"},{"lang":"pl","name":"Polski","website":"https://pl.pattern.monster"},{"lang":"tr","name":"Türkçe","website":"https://tr.pattern.monster"},{"lang":"es","name":"Español","website":"https://es.pattern.monster"},{"lang":"it","name":"Italiano","website":"https://it.pattern.monster"},{"lang":"ro","name":"Română","website":"https://ro.pattern.monster"},{"lang":"fr","name":"Français","website":"https://fr.pattern.monster"},{"lang":"ar","name":"العربية","website":"https://ar.pattern.monster"},{"lang":"pt","name":"Português","website":"https://pt.pattern.monster"},{"lang":"zh-cn","name":"中文(简体)","website":"https://cn.pattern.monster"},{"lang":"nl","name":"Nederlands","website":"https://nl.pattern.monster"},{"lang":"sv","name":"Svenska","website":"https://sv.pattern.monster"},{"lang":"uk","name":"Українська","website":"https://uk.pattern.monster"},{"lang":"ru","name":"Русский","website":"https://ru.pattern.monster"},{"lang":"hu","name":"Magyar","website":"https://hu.pattern.monster"},{"lang":"af","name":"Afrikaans","website":"https://af.pattern.monster"},{"lang":"ca","name":"Català","website":"https://ca.pattern.monster"},{"lang":"zh-tw","name":"中文 (繁體)","website":"https://tw.pattern.monster"},{"lang":"cs","name":"Čeština","website":"https://cs.pattern.monster"},{"lang":"da","name":"Dansk","website":"https://da.pattern.monster"},{"lang":"fi","name":"Suomi","website":"https://fi.pattern.monster"},{"lang":"ja","name":"日本語","website":"https://ja.pattern.monster"},{"lang":"ko","name":"한국어","website":"https://ko.pattern.monster"}],
  langs:[{"id":"af","name":"Afrikaans","code":"af","translation":100,"approval":100},{"id":"ar","name":"Arabic","code":"ar","translation":100,"approval":100},{"id":"ca","name":"Catalan","code":"ca","translation":100,"approval":100},{"id":"zh-CN","name":"Chinese Simplified","code":"zh-cn","translation":100,"approval":100},{"id":"zh-TW","name":"Chinese Traditional","code":"zh-tw","translation":100,"approval":100},{"id":"cs","name":"Czech","code":"cs","translation":100,"approval":100},{"id":"da","name":"Danish","code":"da","translation":100,"approval":100},{"id":"nl","name":"Dutch","code":"nl","translation":100,"approval":100},{"id":"fi","name":"Finnish","code":"fi","translation":100,"approval":100},{"id":"fr","name":"French","code":"fr","translation":100,"approval":100},{"id":"de","name":"German","code":"de","translation":100,"approval":100},{"id":"el","name":"Greek","code":"el","translation":57,"approval":57},{"id":"he","name":"Hebrew","code":"he","translation":15,"approval":15},{"id":"hu","name":"Hungarian","code":"hu","translation":100,"approval":100},{"id":"id","name":"Indonesian","code":"id","translation":65,"approval":65},{"id":"it","name":"Italian","code":"it","translation":100,"approval":100},{"id":"ja","name":"Japanese","code":"ja","translation":3,"approval":3},{"id":"ko","name":"Korean","code":"ko","translation":2,"approval":2},{"id":"nb","name":"Norwegian Bokmal","code":"nb","translation":2,"approval":2},{"id":"nn-NO","name":"Norwegian Nynorsk","code":"nn-no","translation":2,"approval":2},{"id":"pl","name":"Polish","code":"pl","translation":100,"approval":100},{"id":"pt-PT","name":"Portuguese","code":"pt","translation":12,"approval":7},{"id":"pt-BR","name":"Portuguese, Brazilian","code":"pt-br","translation":100,"approval":100},{"id":"ro","name":"Romanian","code":"ro","translation":100,"approval":100},{"id":"ru","name":"Russian","code":"ru","translation":100,"approval":100},{"id":"sr","name":"Serbian (Cyrillic)","code":"sr","translation":2,"approval":2},{"id":"es-ES","name":"Spanish","code":"es","translation":100,"approval":100},{"id":"sv-SE","name":"Swedish","code":"sv","translation":100,"approval":100},{"id":"tr","name":"Turkish","code":"tr","translation":100,"approval":100},{"id":"uk","name":"Ukrainian","code":"uk","translation":100,"approval":100},{"id":"vi","name":"Vietnamese","code":"vi","translation":43,"approval":43}]
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
        