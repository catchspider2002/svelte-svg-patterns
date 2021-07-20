const strings = {
  website: "https://pattern.monster",
  title: "Pattern Monster",
  description: "A simple online pattern generator to create repeatable SVG patterns.",
  description2: "Speed up your website without compromising on image quality.",
  description3: "Perfect for website backgrounds, apparel, branding, packaging design and more.",
  keywords: "svg patterns, patterns, svg backgrounds, vector wallpaper, pattern generator, pattern maker",
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
      keywords: "privacy-policy",
      description: "Privacy Policy for Pattern Monster.",
      image: "",
    },
  ],
  versions: [
    {
      lang: "en",
      website: "https://pattern.monster",
    },
    {
      lang: "de",
      website: "https://de.pattern.monster",
    },
    {
      lang: "pl",
      website: "https://pl.pattern.monster",
    },
    {
      lang: "tr",
      website: "https://tr.pattern.monster",
    },
    {
      lang: "es",
      website: "https://es.pattern.monster",
    },
    {
      lang: "it",
      website: "https://it.pattern.monster",
    },
    {
      lang: "ro",
      website: "https://ro.pattern.monster",
    },
    {
      lang: "fr",
      website: "https://fr.pattern.monster",
    },
  ],
};

const pageDetails = (page) => {
  let imagePrefix = "https://giguom.com/pattern.monster/images/";
  let pageValues =
    strings.pages.filter((currentPage) => currentPage.page === page)[0] || strings.pages.filter((currentPage) => currentPage.page === "index")[0];

  let website = strings.website;
  let title = strings.title + " - " + strings.pages[0].title;
  let url = website;
  let keywords = strings.keywords;
  let desc = strings.description + " " + strings.description3;
  let image = pageValues.image == "" ? imagePrefix + "/TwitterBG2.png" : pageValues.image;

  let versions = strings.versions.map((version) => {
    return { lang: version.lang, website: version.website + (page === "index" ? "" : "/" + page + "/") };
  });

  if (page != "index") {
    title = pageValues.title + " - " + strings.title + " | " + strings.pages[0].title;
    url = website + "/" + page + "/";
    desc = pageValues.description + " " + strings.description + " " + strings.description3;
    keywords = pageValues.keywords + ", " + strings.keywords;
  }

  return { title, url, keywords, desc, image, versions };
};

const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

// const randomAngle = () => Math.floor(Math.random() * 6) * 5;
const randomAngle = () => Math.floor(Math.random() * 37) * 5;

const randomColor = (opacity) =>
  "hsla(" +
  Math.round(randomNumber(0, 360), 2) +
  "," +
  Math.round(randomNumber(0, 100), 2) +
  "%," +
  Math.round(randomNumber(0, 100), 2) +
  "%, " +
  opacity +
  ")";

const hexToHSL = (H) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsla(" + h + "," + s + "%," + l + "%,1)";
};

function HSLAToHexA(hsla) {
  let sep = hsla.indexOf(",") > -1 ? "," : " ";
  hsla = hsla.substr(5).split(")")[0].split(sep);

  // Strip the slash
  if (hsla.indexOf("/") > -1) hsla.splice(3, 1);

  let h = hsla[0],
    s = hsla[1].substr(0, hsla[1].length - 1) / 100,
    l = hsla[2].substr(0, hsla[2].length - 1) / 100,
    a = hsla[3];

  if (h.indexOf("deg") > -1) h = h.substr(0, h.length - 3);
  else if (h.indexOf("rad") > -1) h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
  if (h >= 360) h %= 360;

  // s /= 100;
  // l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  if (a === "ff") return r + g + b;
  else return r + g + b + a;
}

const colorPalettes = [
  [hexToHSL("#264653"), hexToHSL("#2A9D8F"), hexToHSL("#E9C46A"), hexToHSL("#F4A261"), hexToHSL("#E76F51")],
  [hexToHSL("#E63946"), hexToHSL("#F1FAEE"), hexToHSL("#A8DADC"), hexToHSL("#457B9D"), hexToHSL("#1D3557")],
  [hexToHSL("#FFCDB2"), hexToHSL("#FFB4A2"), hexToHSL("#E5989B"), hexToHSL("#B5838D"), hexToHSL("#6D6875")],
  [hexToHSL("#CB997E"), hexToHSL("#EDDCD2"), hexToHSL("#FFF1E6"), hexToHSL("#F0EFEB"), hexToHSL("#DDBEA9")],
  [hexToHSL("#003049"), hexToHSL("#D62828"), hexToHSL("#F77F00"), hexToHSL("#FCBF49"), hexToHSL("#EAE2B7")],
  [hexToHSL("#000000"), hexToHSL("#14213D"), hexToHSL("#FCA311"), hexToHSL("#E5E5E5"), hexToHSL("#FFFFFF")],
  [hexToHSL("#FFADAD"), hexToHSL("#FFD6A5"), hexToHSL("#FDFFB6"), hexToHSL("#CAFFBF"), hexToHSL("#9BF6FF")],
  [hexToHSL("#03045E"), hexToHSL("#023E8A"), hexToHSL("#0077B6"), hexToHSL("#0096C7"), hexToHSL("#00B4D8")],
  [hexToHSL("#2B2D42"), hexToHSL("#8D99AE"), hexToHSL("#EDF2F4"), hexToHSL("#EF233C"), hexToHSL("#D90429")],
  [hexToHSL("#05668D"), hexToHSL("#028090"), hexToHSL("#00A896"), hexToHSL("#02C39A"), hexToHSL("#F0F3BD")],
  [hexToHSL("#03071E"), hexToHSL("#370617"), hexToHSL("#6A040F"), hexToHSL("#9D0208"), hexToHSL("#D00000")],
  [hexToHSL("#FFB5A7"), hexToHSL("#FCD5CE"), hexToHSL("#F8EDEB"), hexToHSL("#F9DCC4"), hexToHSL("#FEC89A")],
  [hexToHSL("#D8E2DC"), hexToHSL("#FFE5D9"), hexToHSL("#FFCAD4"), hexToHSL("#F4ACB7"), hexToHSL("#9D8189")],
  [hexToHSL("#EF476F"), hexToHSL("#FFD166"), hexToHSL("#06D6A0"), hexToHSL("#118AB2"), hexToHSL("#073B4C")],
  [hexToHSL("#606C38"), hexToHSL("#283618"), hexToHSL("#FEFAE0"), hexToHSL("#DDA15E"), hexToHSL("#BC6C25")],
  [hexToHSL("#011627"), hexToHSL("#FDFFFC"), hexToHSL("#2EC4B6"), hexToHSL("#E71D36"), hexToHSL("#FF9F1C")],
  [hexToHSL("#FFBE0B"), hexToHSL("#FB5607"), hexToHSL("#FF006E"), hexToHSL("#8338EC"), hexToHSL("#3A86FF")],
  [hexToHSL("#7400B8"), hexToHSL("#6930C3"), hexToHSL("#5E60CE"), hexToHSL("#5390D9"), hexToHSL("#4EA8DE")],
  [hexToHSL("#006D77"), hexToHSL("#83C5BE"), hexToHSL("#EDF6F9"), hexToHSL("#FFDDD2"), hexToHSL("#E29578")],
  [hexToHSL("#1A535C"), hexToHSL("#4ECDC4"), hexToHSL("#F7FFF7"), hexToHSL("#FF6B6B"), hexToHSL("#FFE66D")],
  [hexToHSL("#3D5A80"), hexToHSL("#98C1D9"), hexToHSL("#E0FBFC"), hexToHSL("#EE6C4D"), hexToHSL("#293241")],
  [hexToHSL("#F6BD60"), hexToHSL("#F7EDE2"), hexToHSL("#F5CAC3"), hexToHSL("#84A59D"), hexToHSL("#F28482")],
  [hexToHSL("#FFA69E"), hexToHSL("#FAF3DD"), hexToHSL("#B8F2E6"), hexToHSL("#AED9E0"), hexToHSL("#5E6472")],
  [hexToHSL("#EDC4B3"), hexToHSL("#E6B8A2"), hexToHSL("#DEAB90"), hexToHSL("#D69F7E"), hexToHSL("#CD9777")],
  [hexToHSL("#22223B"), hexToHSL("#4A4E69"), hexToHSL("#9A8C98"), hexToHSL("#C9ADA7"), hexToHSL("#F2E9E4")],
  [hexToHSL("#F94144"), hexToHSL("#F3722C"), hexToHSL("#F8961E"), hexToHSL("#F9C74F"), hexToHSL("#90BE6D")],
  [hexToHSL("#FF9F1C"), hexToHSL("#FFBF69"), hexToHSL("#FFFFFF"), hexToHSL("#CBF3F0"), hexToHSL("#2EC4B6")],
  [hexToHSL("#D8F3DC"), hexToHSL("#B7E4C7"), hexToHSL("#95D5B2"), hexToHSL("#74C69D"), hexToHSL("#52B788")],
  [hexToHSL("#CAD2C5"), hexToHSL("#84A98C"), hexToHSL("#52796F"), hexToHSL("#354F52"), hexToHSL("#2F3E46")],
  [hexToHSL("#5F0F40"), hexToHSL("#9A031E"), hexToHSL("#FB8B24"), hexToHSL("#E36414"), hexToHSL("#0F4C5C")],
  [hexToHSL("#555B6E"), hexToHSL("#89B0AE"), hexToHSL("#BEE3DB"), hexToHSL("#FAF9F9"), hexToHSL("#FFD6BA")],
  [hexToHSL("#355070"), hexToHSL("#6D597A"), hexToHSL("#B56576"), hexToHSL("#E56B6F"), hexToHSL("#EAAC8B")],
  [hexToHSL("#247BA0"), hexToHSL("#70C1B3"), hexToHSL("#B2DBBF"), hexToHSL("#F3FFBD"), hexToHSL("#FF1654")],
  [hexToHSL("#8E9AAF"), hexToHSL("#CBC0D3"), hexToHSL("#EFD3D7"), hexToHSL("#FEEAFA"), hexToHSL("#DEE2FF")],
  [hexToHSL("#FFCBF2"), hexToHSL("#F3C4FB"), hexToHSL("#ECBCFD"), hexToHSL("#E5B3FE"), hexToHSL("#E2AFFF")],
  [hexToHSL("#ECF8F8"), hexToHSL("#EEE4E1"), hexToHSL("#E7D8C9"), hexToHSL("#E6BEAE"), hexToHSL("#B2967D")],
  [hexToHSL("#335C67"), hexToHSL("#FFF3B0"), hexToHSL("#E09F3E"), hexToHSL("#9E2A2B"), hexToHSL("#540B0E")],
  [hexToHSL("#F72585"), hexToHSL("#7209B7"), hexToHSL("#3A0CA3"), hexToHSL("#4361EE"), hexToHSL("#4CC9F0")],
  [hexToHSL("#F08080"), hexToHSL("#F4978E"), hexToHSL("#F8AD9D"), hexToHSL("#FBC4AB"), hexToHSL("#FFDAB9")],
  [hexToHSL("#7BDFF2"), hexToHSL("#B2F7EF"), hexToHSL("#EFF7F6"), hexToHSL("#F7D6E0"), hexToHSL("#F2B5D4")],
  [hexToHSL("#50514F"), hexToHSL("#F25F5C"), hexToHSL("#FFE066"), hexToHSL("#247BA0"), hexToHSL("#70C1B3")],
  [hexToHSL("#007F5F"), hexToHSL("#2B9348"), hexToHSL("#55A630"), hexToHSL("#80B918"), hexToHSL("#AACC00")],
  [hexToHSL("#F8F9FA"), hexToHSL("#E9ECEF"), hexToHSL("#DEE2E6"), hexToHSL("#CED4DA"), hexToHSL("#ADB5BD")],
  [hexToHSL("#283D3B"), hexToHSL("#197278"), hexToHSL("#EDDDD4"), hexToHSL("#C44536"), hexToHSL("#772E25")],
  [hexToHSL("#9C89B8"), hexToHSL("#F0A6CA"), hexToHSL("#EFC3E6"), hexToHSL("#F0E6EF"), hexToHSL("#B8BEDD")],
  [hexToHSL("#FFFFFF"), hexToHSL("#84DCC6"), hexToHSL("#A5FFD6"), hexToHSL("#FFA69E"), hexToHSL("#FF686B")],
  [hexToHSL("#CFDBD5"), hexToHSL("#E8EDDF"), hexToHSL("#F5CB5C"), hexToHSL("#242423"), hexToHSL("#333533")],
  [hexToHSL("#03045E"), hexToHSL("#0077B6"), hexToHSL("#00B4D8"), hexToHSL("#90E0EF"), hexToHSL("#CAF0F8")],
  [hexToHSL("#0B132B"), hexToHSL("#1C2541"), hexToHSL("#3A506B"), hexToHSL("#5BC0BE"), hexToHSL("#6FFFE9")],
  [hexToHSL("#0466C8"), hexToHSL("#0353A4"), hexToHSL("#023E7D"), hexToHSL("#002855"), hexToHSL("#001845")],
  [hexToHSL("#9B5DE5"), hexToHSL("#F15BB5"), hexToHSL("#FEE440"), hexToHSL("#00BBF9"), hexToHSL("#00F5D4")],
  [hexToHSL("#FFFFFF"), hexToHSL("#00171F"), hexToHSL("#003459"), hexToHSL("#007EA7"), hexToHSL("#00A8E8")],
  [hexToHSL("#588B8B"), hexToHSL("#FFFFFF"), hexToHSL("#FFD5C2"), hexToHSL("#F28F3B"), hexToHSL("#C8553D")],
  [hexToHSL("#FE938C"), hexToHSL("#E6B89C"), hexToHSL("#EAD2AC"), hexToHSL("#9CAFB7"), hexToHSL("#4281A4")],
  [hexToHSL("#2D00F7"), hexToHSL("#6A00F4"), hexToHSL("#8900F2"), hexToHSL("#A100F2"), hexToHSL("#B100E8")],
  [hexToHSL("#353535"), hexToHSL("#3C6E71"), hexToHSL("#FFFFFF"), hexToHSL("#D9D9D9"), hexToHSL("#284B63")],
  [hexToHSL("#C9CBA3"), hexToHSL("#FFE1A8"), hexToHSL("#E26D5C"), hexToHSL("#723D46"), hexToHSL("#472D30")],
  [hexToHSL("#463F3A"), hexToHSL("#8A817C"), hexToHSL("#BCB8B1"), hexToHSL("#F4F3EE"), hexToHSL("#E0AFA0")],
  [hexToHSL("#8ECAE6"), hexToHSL("#219EBC"), hexToHSL("#023047"), hexToHSL("#FFB703"), hexToHSL("#FB8500")],
  [hexToHSL("#10002B"), hexToHSL("#240046"), hexToHSL("#3C096C"), hexToHSL("#5A189A"), hexToHSL("#7B2CBF")],
  [hexToHSL("#E2E2DF"), hexToHSL("#D2D2CF"), hexToHSL("#E2CFC4"), hexToHSL("#F7D9C4"), hexToHSL("#FAEDCB")],
  [hexToHSL("#FF595E"), hexToHSL("#FFCA3A"), hexToHSL("#8AC926"), hexToHSL("#1982C4"), hexToHSL("#6A4C93")],
  [hexToHSL("#390099"), hexToHSL("#9E0059"), hexToHSL("#FF0054"), hexToHSL("#FF5400"), hexToHSL("#FFBD00")],
  [hexToHSL("#F94144"), hexToHSL("#F3722C"), hexToHSL("#F8961E"), hexToHSL("#F9844A"), hexToHSL("#F9C74F")],
  [hexToHSL("#F7B267"), hexToHSL("#F79D65"), hexToHSL("#F4845F"), hexToHSL("#F27059"), hexToHSL("#F25C54")],
  [hexToHSL("#70D6FF"), hexToHSL("#FF70A6"), hexToHSL("#FF9770"), hexToHSL("#FFD670"), hexToHSL("#E9FF70")],
  [hexToHSL("#FADDE1"), hexToHSL("#FFC4D6"), hexToHSL("#FFA6C1"), hexToHSL("#FF87AB"), hexToHSL("#FF5D8F")],
  [hexToHSL("#D4E09B"), hexToHSL("#F6F4D2"), hexToHSL("#CBDFBD"), hexToHSL("#F19C79"), hexToHSL("#A44A3F")],
  [hexToHSL("#220901"), hexToHSL("#621708"), hexToHSL("#941B0C"), hexToHSL("#BC3908"), hexToHSL("#F6AA1C")],
  [hexToHSL("#FFFCF2"), hexToHSL("#CCC5B9"), hexToHSL("#403D39"), hexToHSL("#252422"), hexToHSL("#EB5E28")],
  [hexToHSL("#ED6A5A"), hexToHSL("#F4F1BB"), hexToHSL("#9BC1BC"), hexToHSL("#5CA4A9"), hexToHSL("#E6EBE0")],
  [hexToHSL("#114B5F"), hexToHSL("#1A936F"), hexToHSL("#88D498"), hexToHSL("#C6DABF"), hexToHSL("#F3E9D2")],
  [hexToHSL("#540D6E"), hexToHSL("#EE4266"), hexToHSL("#FFD23F"), hexToHSL("#3BCEAC"), hexToHSL("#0EAD69")],
  [hexToHSL("#CB997E"), hexToHSL("#DDBEA9"), hexToHSL("#FFE8D6"), hexToHSL("#B7B7A4"), hexToHSL("#A5A58D")],
  [hexToHSL("#6F1D1B"), hexToHSL("#BB9457"), hexToHSL("#432818"), hexToHSL("#99582A"), hexToHSL("#FFE6A7")],
  [hexToHSL("#233D4D"), hexToHSL("#FE7F2D"), hexToHSL("#FCCA46"), hexToHSL("#A1C181"), hexToHSL("#619B8A")],
  [hexToHSL("#FFAC81"), hexToHSL("#FF928B"), hexToHSL("#FEC3A6"), hexToHSL("#EFE9AE"), hexToHSL("#CDEAC0")],
  [hexToHSL("#4F000B"), hexToHSL("#720026"), hexToHSL("#CE4257"), hexToHSL("#FF7F51"), hexToHSL("#FF9B54")],
  [hexToHSL("#64A6BD"), hexToHSL("#90A8C3"), hexToHSL("#ADA7C9"), hexToHSL("#D7B9D5"), hexToHSL("#F4CAE0")],
  [hexToHSL("#5BC0EB"), hexToHSL("#FDE74C"), hexToHSL("#9BC53D"), hexToHSL("#E55934"), hexToHSL("#FA7921")],
  [hexToHSL("#0D3B66"), hexToHSL("#FAF0CA"), hexToHSL("#F4D35E"), hexToHSL("#EE964B"), hexToHSL("#F95738")],
  [hexToHSL("#CDB4DB"), hexToHSL("#FFC8DD"), hexToHSL("#FFAFCC"), hexToHSL("#BDE0FE"), hexToHSL("#A2D2FF")],
  [hexToHSL("#EEE2DF"), hexToHSL("#EED7C5"), hexToHSL("#C89F9C"), hexToHSL("#C97C5D"), hexToHSL("#B36A5E")],
  [hexToHSL("#797D62"), hexToHSL("#9B9B7A"), hexToHSL("#D9AE94"), hexToHSL("#F1DCA7"), hexToHSL("#FFCB69")],
  [hexToHSL("#DCDCDD"), hexToHSL("#C5C3C6"), hexToHSL("#46494C"), hexToHSL("#4C5C68"), hexToHSL("#1985A1")],
  [hexToHSL("#BCE784"), hexToHSL("#5DD39E"), hexToHSL("#348AA7"), hexToHSL("#525174"), hexToHSL("#513B56")],
  [hexToHSL("#FF99C8"), hexToHSL("#FCF6BD"), hexToHSL("#D0F4DE"), hexToHSL("#A9DEF9"), hexToHSL("#E4C1F9")],
  [hexToHSL("#ECC8AF"), hexToHSL("#E7AD99"), hexToHSL("#CE796B"), hexToHSL("#C18C5D"), hexToHSL("#495867")],
  [hexToHSL("#0D1B2A"), hexToHSL("#1B263B"), hexToHSL("#415A77"), hexToHSL("#778DA9"), hexToHSL("#E0E1DD")],
  [hexToHSL("#FF4800"), hexToHSL("#FF5400"), hexToHSL("#FF6000"), hexToHSL("#FF6D00"), hexToHSL("#FF7900")],
  [hexToHSL("#2D3142"), hexToHSL("#4F5D75"), hexToHSL("#BFC0C0"), hexToHSL("#FFFFFF"), hexToHSL("#EF8354")],
  [hexToHSL("#495867"), hexToHSL("#577399"), hexToHSL("#BDD5EA"), hexToHSL("#F7F7FF"), hexToHSL("#FE5F55")],
  [hexToHSL("#2D3142"), hexToHSL("#BFC0C0"), hexToHSL("#FFFFFF"), hexToHSL("#EF8354"), hexToHSL("#4F5D75")],
  [hexToHSL("#fe4a49"), hexToHSL("#2ab7ca"), hexToHSL("#fed766"), hexToHSL("#e6e6ea"), hexToHSL("#f4f4f8")],
  [hexToHSL("#eee3e7"), hexToHSL("#ead5dc"), hexToHSL("#eec9d2"), hexToHSL("#f4b6c2"), hexToHSL("#f6abb6")],
  [hexToHSL("#011f4b"), hexToHSL("#03396c"), hexToHSL("#005b96"), hexToHSL("#6497b1"), hexToHSL("#b3cde0")],
  [hexToHSL("#051e3e"), hexToHSL("#251e3e"), hexToHSL("#451e3e"), hexToHSL("#651e3e"), hexToHSL("#851e3e")],
  [hexToHSL("#dec3c3"), hexToHSL("#e7d3d3"), hexToHSL("#f0e4e4"), hexToHSL("#f9f4f4"), hexToHSL("#ffffff")],
  [hexToHSL("#4a4e4d"), hexToHSL("#0e9aa7"), hexToHSL("#3da4ab"), hexToHSL("#f6cd61"), hexToHSL("#fe8a71")],
  [hexToHSL("#2a4d69"), hexToHSL("#4b86b4"), hexToHSL("#adcbe3"), hexToHSL("#e7eff6"), hexToHSL("#63ace5")],
  [hexToHSL("#fe9c8f"), hexToHSL("#feb2a8"), hexToHSL("#fec8c1"), hexToHSL("#fad9c1"), hexToHSL("#f9caa7")],
  [hexToHSL("#009688"), hexToHSL("#35a79c"), hexToHSL("#54b2a9"), hexToHSL("#65c3ba"), hexToHSL("#83d0c9")],
  [hexToHSL("#ee4035"), hexToHSL("#f37736"), hexToHSL("#fdf498"), hexToHSL("#7bc043"), hexToHSL("#0392cf")],
  [hexToHSL("#ffffff"), hexToHSL("#d0e1f9"), hexToHSL("#4d648d"), hexToHSL("#283655"), hexToHSL("#1e1f26")],
  [hexToHSL("#eeeeee"), hexToHSL("#dddddd"), hexToHSL("#cccccc"), hexToHSL("#bbbbbb"), hexToHSL("#aaaaaa")],
  [hexToHSL("#ffe9dc"), hexToHSL("#fce9db"), hexToHSL("#e0a899"), hexToHSL("#dfa290"), hexToHSL("#c99789")],
  [hexToHSL("#96ceb4"), hexToHSL("#ffeead"), hexToHSL("#ff6f69"), hexToHSL("#ffcc5c"), hexToHSL("#88d8b0")],
  [hexToHSL("#6e7f80"), hexToHSL("#536872"), hexToHSL("#708090"), hexToHSL("#536878"), hexToHSL("#36454f")],
  [hexToHSL("#4b3832"), hexToHSL("#854442"), hexToHSL("#fff4e6"), hexToHSL("#3c2f2f"), hexToHSL("#be9b7b")],
  [hexToHSL("#3b5998"), hexToHSL("#8b9dc3"), hexToHSL("#dfe3ee"), hexToHSL("#f7f7f7"), hexToHSL("#ffffff")],
  [hexToHSL("#008744"), hexToHSL("#0057e7"), hexToHSL("#d62d20"), hexToHSL("#ffa700"), hexToHSL("#ffffff")],
  [hexToHSL("#3385c6"), hexToHSL("#4279a3"), hexToHSL("#476c8a"), hexToHSL("#49657b"), hexToHSL("#7f8e9e")],
  [hexToHSL("#d2d4dc"), hexToHSL("#afafaf"), hexToHSL("#f8f8fa"), hexToHSL("#e5e6eb"), hexToHSL("#c0c2ce")],
  [hexToHSL("#a8e6cf"), hexToHSL("#dcedc1"), hexToHSL("#ffd3b6"), hexToHSL("#ffaaa5"), hexToHSL("#ff8b94")],
  [hexToHSL("#d11141"), hexToHSL("#00b159"), hexToHSL("#00aedb"), hexToHSL("#f37735"), hexToHSL("#ffc425")],
  [hexToHSL("#6f7c85"), hexToHSL("#75838d"), hexToHSL("#7e8d98"), hexToHSL("#8595a1"), hexToHSL("#8c9da9")],
  [hexToHSL("#ebf4f6"), hexToHSL("#bdeaee"), hexToHSL("#76b4bd"), hexToHSL("#58668b"), hexToHSL("#5e5656")],
  [hexToHSL("#ff77aa"), hexToHSL("#ff99cc"), hexToHSL("#ffbbee"), hexToHSL("#ff5588"), hexToHSL("#ff3377")],
  [hexToHSL("#eeeeee"), hexToHSL("#dddddd"), hexToHSL("#cccccc"), hexToHSL("#bbbbbb"), hexToHSL("#29a8ab")],
  [hexToHSL("#fff6e9"), hexToHSL("#ffefd7"), hexToHSL("#fffef9"), hexToHSL("#e3f0ff"), hexToHSL("#d2e7ff")],
  [hexToHSL("#edc951"), hexToHSL("#eb6841"), hexToHSL("#cc2a36"), hexToHSL("#4f372d"), hexToHSL("#00a0b0")],
  [hexToHSL("#84c1ff"), hexToHSL("#add6ff"), hexToHSL("#d6eaff"), hexToHSL("#eaf4ff"), hexToHSL("#f8fbff")],
  [hexToHSL("#2e003e"), hexToHSL("#3d2352"), hexToHSL("#3d1e6d"), hexToHSL("#8874a3"), hexToHSL("#e4dcf1")],
  [hexToHSL("#8d5524"), hexToHSL("#c68642"), hexToHSL("#e0ac69"), hexToHSL("#f1c27d"), hexToHSL("#ffdbac")],
  [hexToHSL("#343d46"), hexToHSL("#4f5b66"), hexToHSL("#65737e"), hexToHSL("#a7adba"), hexToHSL("#c0c5ce")],
  [hexToHSL("#bfd6f6"), hexToHSL("#8dbdff"), hexToHSL("#64a1f4"), hexToHSL("#4a91f2"), hexToHSL("#3b7dd8")],
  [hexToHSL("#e3c9c9"), hexToHSL("#f4e7e7"), hexToHSL("#eedbdb"), hexToHSL("#cecbcb"), hexToHSL("#cbdadb")],
  [hexToHSL("#01bf2b"), hexToHSL("#f04554"), hexToHSL("#eff9fb"), hexToHSL("#5a3626"), hexToHSL("#290b0a")],
  [hexToHSL("#f0f4f7"), hexToHSL("#c8beb9"), hexToHSL("#fac57d"), hexToHSL("#a81817"), hexToHSL("#344d2f")],
];

const icons = {
  github:
    "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
  dark: "M12 3c0.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
  light:
    "m 3,12 h 1 m 8,-9 v 1 m 8,8 h 1 m -9,8 v 1 M 5.6,5.6 6.3,6.3 M 18.4,5.6 17.7,6.3 m 0,11.4 0.7,0.7 M 6.3,17.7 5.6,18.4 M 16,12 a 4,4 0 0 1 -4,4 4,4 0 0 1 -4,-4 4,4 0 0 1 4,-4 4,4 0 0 1 4,4 z",
  twitter:
    "M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z",
  instagram:
    "M16.5 7.5v.001M15 12a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3zM8 4h8c2.216 0 4 1.784 4 4v8c0 2.216-1.784 4-4 4H8c-2.216 0-4-1.784-4-4V8c0-2.216 1.784-4 4-4z",
  pinterest:
    "M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9zm-10.3 2c.44 1.26 1.43 2 2.55 2 2.07 0 3.75-1.55 3.75-4a5 5 0 10-9.7 1.7M8 20l4-9",
  facebook: "M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3",
  trending: "M14 7h7v7M3 17l6-6 4 4 8-8",
  license: "M9 11h4M9 7h4m2 14H6a3 3 0 01-3-3v-1h10v2a2 2 0 004 0V5a2 2 0 112 2h-2m2-4H8a3 3 0 00-3 3v11",
  release: "M11 9a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zm0-6l9 9a1.5 1.5 0 010 2l-6 6a1.5 1.5 0 01-2 0l-9-9V7a4 4 0 014-4h4",
  download: "M9 14l3 3 3-3m-3-3v6m5 4H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2zM14 3v4a1 1 0 001 1h4",
  search: "M10 3a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7zm5 12l6 6-6-6z",
  cancel: "M6 6l12 12m0-12L6 18",
  bmc: `<svg xmlns="http://www.w3.org/2000/svg" height="4rem" viewBox="0 0 545 153" fill="none">
  <path d="M0 24.48A24.48 24.48 0 0124.48 0H520.2a24.48 24.48 0 0124.48 24.48v104.04A24.48 24.48 0 01520.2 153H24.48A24.48 24.48 0 010 128.52V24.48z" fill="#ffc800"/>
  <path d="M109.52 50.32l-.06-.04-.16-.05c.06.05.14.08.22.09zM110.5 57.31l-.07.02.08-.02zM109.55 50.3h-.03v.02l.03-.01zM109.52 50.32h.02-.02zM110.45 57.3l.11-.06.04-.03.04-.04a.65.65 0 00-.2.13zM109.72 50.47l-.12-.1-.07-.04c.04.07.1.12.19.14zM81.88 118.35a.57.57 0 00-.23.18l.07-.05.16-.13zM98.05 115.17c0-.1-.05-.08-.04.28l.02-.09c0-.06 0-.12.02-.19zM96.38 118.35a.57.57 0 00-.23.18l.07-.05.16-.13zM70.49 119.11a.48.48 0 00-.24-.11l.2.1.04.01zM67.93 116.66a2.38 2.38 0 010 0z" fill="#0D0C22"/>
  <path d="M85.14 72.77C81.62 74.27 77.63 76 72.45 76a24 24 0 01-6.4-.89l3.58 36.74a6.14 6.14 0 006.12 5.63s5.07.26 6.76.26c1.83 0 7.29-.26 7.29-.26a6.14 6.14 0 006.12-5.63l3.83-40.6a16.3 16.3 0 00-5.4-.97c-3.36 0-6.08 1.16-9.21 2.5z" fill="#fff"/>
  <path d="M54.98 57.1l.07.06.03.02a.6.6 0 00-.1-.08z" fill="#0D0C22"/>
  <path d="M116.3 53.71l-.54-2.72c-.48-2.43-1.58-4.74-4.08-5.62-.8-.28-1.72-.4-2.33-.99-.62-.58-.8-1.49-.94-2.33l-.78-4.62c-.23-1.33-.42-2.81-1.03-4.03-.79-1.63-2.43-2.58-4.06-3.21-.83-.32-1.69-.58-2.55-.8-4.08-1.07-8.36-1.46-12.55-1.69-5.03-.28-10.08-.2-15.1.25-3.73.34-7.67.75-11.22 2.04a9.5 9.5 0 00-3.62 2.05 3.92 3.92 0 00-.72 4.67 6.05 6.05 0 002.82 2.37c1.47.66 3 1.16 4.58 1.5 4.39.96 8.93 1.34 13.41 1.5 4.97.2 9.95.04 14.89-.48 1.22-.14 2.44-.3 3.66-.49 1.44-.22 2.36-2.1 1.93-3.4-.5-1.56-1.86-2.17-3.4-1.93l-.68.1-.16.02a95.5 95.5 0 01-4.8.47 107.24 107.24 0 01-19.14-.4l-.47-.07-.1-.01-.48-.07a50.9 50.9 0 01-2.96-.53.44.44 0 010-.87h.02a47.95 47.95 0 013.42-.6c.54-.03 1.08-.13 1.61-.2a102.3 102.3 0 0122.2.1l.56.08.38.05c1.09.16 2.17.36 3.25.6 1.6.34 3.66.45 4.37 2.2.22.56.33 1.18.45 1.76l.16.75.01.04 1.13 5.27a.95.95 0 01-.15.75.97.97 0 01-.66.4h-.01l-.23.04-.23.03a128.48 128.48 0 01-6.45.68 149.64 149.64 0 01-12.9.52 151.25 151.25 0 01-19.17-1.24l-.51-.07-1.19-.17c-1.33-.2-2.64-.45-3.97-.66a6.9 6.9 0 00-4.58.66 6.66 6.66 0 00-2.76 2.86c-.62 1.29-.8 2.7-1.08 4.08-.28 1.39-.72 2.88-.55 4.3a6.87 6.87 0 005.59 6.13 161.9 161.9 0 0046.27 1.53 1.98 1.98 0 012.19 2.17l-.3 2.85a1089465.02 1089465.02 0 01-4.15 40.42c-.17 1.67-.19 3.4-.5 5.04-.5 2.6-2.27 4.2-4.83 4.78-2.35.54-4.76.82-7.17.84-2.67.01-5.34-.1-8.01-.1-2.86.02-6.35-.24-8.55-2.36-1.94-1.87-2.2-4.79-2.47-7.31l-1.04-10.03-1.94-18.59L62.84 70l-.07-.6c-.15-1.43-1.16-2.84-2.76-2.77-1.37.06-2.93 1.23-2.77 2.77l.93 8.92 1.92 18.44 1.64 15.72.31 3.01c.6 5.49 4.8 8.44 9.98 9.27 3.03.5 6.14.6 9.21.64 3.94.06 7.92.22 11.8-.5 5.74-1.05 10.05-4.89 10.67-10.84l.53-5.15 1.75-17.05 1.9-18.58.87-8.51a1.98 1.98 0 011.6-1.74c1.64-.32 3.2-.87 4.38-2.12 1.86-1.99 2.23-4.58 1.57-7.2zm-61.8 1.84c.03-.01-.02.2-.04.3 0-.15 0-.28.05-.3zm.16 1.23c.02 0 .06.04.1.1l-.1-.1zm.16.2c.06.1.09.16 0 0zm.32.26l.02.03a.21.21 0 00-.03-.03zm55.13-.38c-.6.56-1.48.82-2.36.95A166.3 166.3 0 0178.1 59.7a200.69 200.69 0 01-21.24-2.03c-.7-.1-1.44-.23-1.92-.74-.9-.96-.46-2.9-.22-4.06.21-1.06.62-2.48 1.88-2.63 1.98-.23 4.28.6 6.23.9a136.85 136.85 0 0037.57.3c1.84-.26 3.67-.54 5.5-.87 1.62-.3 3.42-.84 4.4.84.67 1.15.76 2.68.66 3.98-.04.56-.28 1.1-.7 1.48z" fill="#0D0C22"/>
  <g aria-label="Buy me a coffee" transform="matrix(9.22544 0 0 9.22544 1026.53 -199.71)" fill="#000" stroke="#000" stroke-width=".11">
    <path d="M-93.23 31.9q.43 0 .76-.3t.33-.69q0-.4-.24-.73-.27.14-.54.14-.6 0-.6-.38 0-.11.14-.2.15-.1.43-.1.29 0 .62.17.32-.34.32-.77 0-.53-.47-.84-.46-.32-1-.32l-.16.01q0 .23-.04.74-.05.76-.05 2.32 0 .6-.08.6-.34 0-.44-.09-.1-.1-.1-.55l.04-.9q.05-.81.05-1.3 0-.5.03-.72-.42.14-.45.46-.03.26-.12.36-.08.1-.22.1-.13 0-.18-.07-.05-.08-.05-.16 0-.69 1.07-.95.14-.54.43-.54.12 0 .12.45.2-.03.5-.03.32 0 .71.12.4.11.7.4.29.3.29.65 0 .67-.64 1.2.44.35.44.83 0 .49-.3.8-.57.58-1.51.58-.64 0-.92-.08-.06-.02-.12-.08-.06-.08-.06-.18 0-.17.33-.17.1 0 .45.12.35.1.53.1zm.68-1.89q-.24-.2-.45-.2-.21 0-.21.09 0 .18.39.18.14 0 .27-.07zM-91.23 31.42l.04-.89q0-.85.08-.93l.28-.23q.2-.15.3-.15.09 0 .11.03.03.03.03.12 0 .35-.15.7-.12.73-.12 1.2 0 .46.15.46.18 0 .43-.32.24-.31.49-.94.07-.8.11-.86l.22-.23q.18-.16.29-.16.12 0 .12.3 0 .08-.05.3-.04.24-.1.34-.08.22-.08 1.37 0 .22.05.22.13-.01.37-.34t.47-.84q.23-.52.28-.52.06 0 .06.06 0 .23-.23.7-.63 1.34-1.06 1.34-.3 0-.47-.12-.05-.06-.05-.35l.02-.63q-.25.54-.5.82-.26.28-.58.28-.3 0-.41-.16-.1-.17-.1-.57z"/>
    <path d="M-88.34 31.42l.05-.89q0-.85.08-.93l.28-.23q.2-.15.3-.15.09 0 .11.03.02.03.02.12 0 .35-.15.7-.11.73-.11 1.2 0 .46.1.46.2 0 .44-.33.26-.34.52-1l.01-.37.02-.28v-.14q.02-.04.23-.21.21-.18.33-.18.12 0 .12.3 0 .08-.05.3-.04.24-.1.34l-.09.98.83-1.04q.06-.05.1-.05.08 0 .08.08 0 .05-.04.1-.25.37-1 1.31l-.06 1.29q-.04 1-.29 1.41-.23.41-.85.41-.27 0-.51-.16-.23-.16-.23-.57 0-.4.3-.81.31-.43 1.12-1.3l.05-.86q-.27.6-.53.9-.27.3-.58.3-.32 0-.4-.16-.1-.15-.1-.57zm1.54.76q-.9.98-.9 1.57 0 .27.09.44.1.18.26.18.25 0 .35-.28.1-.28.16-1.13zM-83.32 31.68v.25q0 .22-.12.22-.19 0-.36-.04-.18-.06-.18-.15l.04-.62q.05-.54.05-.81v-.47q0-.38.08-.46.08-.08.28-.23.2-.15.29-.15.1 0 .12.03.02.03.02.12 0 .42-.16.79-.04.45-.04.63.42-.79.6-1.03.28-.46.52-.46.15 0 .28.11.14.12.14.3l-.01.33-.01.24v.11q.02-.06.26-.36l.32-.38.18-.17q.18-.18.33-.18.15 0 .28.1.13.12.13.28 0 .35-.08 1.04-.07.67-.07.85 0 .18.05.18.13-.01.37-.34t.47-.84q.24-.52.28-.52.06 0 .06.06 0 .23-.23.7-.63 1.34-1.06 1.34-.27 0-.42-.12-.06-.06-.06-.29 0-.24.04-.76.05-.53.05-.8 0-.26-.09-.26-.1 0-.45.35-.34.35-.37.5-.05.26-.05 1.16 0 .22-.11.22-.19 0-.35-.04-.16-.06-.16-.15l.04-.78q.05-.7.05-.97 0-.29-.1-.29-.08 0-.43.55-.35.54-.39.75-.03.22-.03.46z"/>
    <path d="M-78.7 32.15q-.45 0-.71-.33-.27-.34-.27-.77 0-.87.37-1.31.36-.44.94-.44.27 0 .45.15.17.14.17.4 0 .47-.4.8-.4.31-.98.33.03.3.2.54.19.22.43.22t.43-.11q.19-.11.35-.32.33-.44.57-1l.1-.2q.03-.06.07-.06.05 0 .05.06 0 .4-.48 1.2-.53.84-1.3.84zm-.43-1.36q.47-.08.68-.3.23-.23.23-.58 0-.36-.23-.36-.28 0-.47.39-.2.38-.2.85zM-73.54 32.15q-.31 0-.47-.12-.05-.06-.05-.28l.01-.61q-.2.51-.41.77-.2.24-.52.24t-.55-.3q-.24-.3-.24-.93 0-.64.36-1.13.36-.5.95-.5.25 0 .57.34.06-.09.22-.2.17-.13.28-.13.12 0 .12.3 0 .08-.05.3-.04.24-.1.34-.07.18-.07 1.3 0 .2.05.2.14 0 .38-.33.23-.33.46-.84.24-.52.29-.52.05 0 .05.06 0 .23-.23.7-.62 1.34-1.05 1.34zm-.97-2.54q-.22 0-.48.34-.24.32-.24.77 0 .44.13.73.13.28.34.28.27 0 .77-1.3l.02-.22.02-.24q-.07-.13-.25-.24-.17-.12-.3-.12zM-69.73 30.18l.06-.4q0-.09-.05-.16-.06-.07-.15-.07-.29 0-.5.44-.22.44-.22.85 0 .4.17.65t.4.25q.25 0 .44-.11t.35-.32q.33-.44.57-1l.1-.2q.04-.06.08-.06t.04.06q0 .26-.18.63-.18.36-.3.56-.13.2-.32.4-.4.45-1 .45-.44 0-.68-.31-.23-.33-.23-.7 0-.9.39-1.37.4-.47 1-.47.25 0 .4.13.14.13.14.3 0 .3-.1.45-.12.16-.28.16-.13 0-.13-.16z"/>
    <path d="M-66.4 30.4q.32-.11.44-.18l.19-.12.1-.06.06-.02q.06 0 .06.07t-.24.25q-.25.18-.62.32-.05.67-.42 1.08-.36.41-1.04.41-.49 0-.75-.39-.26-.4-.26-.92 0-.53.3-1 .33-.47.82-.47.22-.15.52-.15.31 0 .57.32.26.33.27.85zm-.51.4l-.29.01q-.36 0-.62-.21-.25-.23-.25-.49t.09-.45q-.35.27-.35 1.06 0 .39.16.73.16.35.5.35.34 0 .53-.29.2-.3.23-.71zm-.5-1.32q-.12 0-.2.12-.07.1-.07.24 0 .3.2.48.21.18.48.18h.1q-.02-.39-.14-.7-.11-.32-.37-.32z"/>
    <path d="M-64.14 30.18l.05-.3q-.32-.06-.32-.35 0-.3.43-.3.4-2.04 1-2.04.12 0 .21.2t.09.58q0 .38-.18.91-.17.53-.42.84l.03.05q.23.1.46.1.25 0 .39-.02l.15-.03q.1 0 .1.1 0 .09-.17.14-.16.04-.37.04t-.5-.09q.24.67.24 1.74 0 1.06-.24 1.7-.24.63-.63.63-.22 0-.4-.15-.17-.15-.17-.5 0-1.26.2-2.93-.22.12-.45.2.12.55.12 1.03l-.01.79-.07.7q-.06.4-.15.71-.08.3-.25.5-.17.22-.42.22-.25 0-.41-.16-.16-.17-.16-.67 0-1.41.16-3.07-.46-.18-.46-.65 0-.29.15-.48t.37-.19h.1q.1-.7.2-1.15.1-.45.33-.77.24-.32.47-.32.25 0 .25.57 0 .87-.65 1.99.2.21.36.66.27-.07.57-.23zm-1.18.63q-.08 1.09-.08 1.98 0 .89.03 1.22.02.33.1.33.25 0 .4-.7.15-.69.15-1.49t-.17-1.4q-.19.06-.43.06zm1.5 1.5q0 1.46.14 1.46.19 0 .33-.56.15-.57.15-1.28 0-1.5-.3-1.94l-.14.15q-.18 1.33-.18 2.17zm.45-2.78q.12-.1.3-.6.2-.52.2-.79 0-.51-.1-.51-.3 0-.56 1.71.08.07.16.2zm-1.23-1.69q0-.31-.07-.31-.12 0-.27.57-.15.57-.27 1.52.61-1.06.61-1.78zm-1.22 1.84q-.22 0-.22.23 0 .24.25.42l.08-.64-.1-.01zm.53.8l.3-.02q-.1-.3-.25-.45l-.01.03q-.04.29-.04.44z"/>
    <path d="M-61.66 32.15q-.44 0-.7-.33-.27-.34-.27-.77 0-.87.37-1.31.36-.44.94-.44.27 0 .45.15.17.14.17.4 0 .47-.4.8-.4.31-.98.33.03.3.2.54.19.22.43.22t.43-.11q.19-.11.35-.32.33-.44.57-1l.1-.2q.03-.06.07-.06.05 0 .05.06 0 .4-.48 1.2-.53.84-1.3.84zm-.42-1.36q.47-.08.68-.3.23-.23.23-.58 0-.36-.23-.36-.28 0-.47.39-.2.38-.2.85z"/>
    <path d="M-59.33 32.15q-.45 0-.7-.33-.27-.34-.27-.77 0-.87.36-1.31.37-.44.95-.44.27 0 .44.15.18.14.18.4 0 .47-.4.8-.4.31-.98.33.03.3.2.54.19.22.42.22.24 0 .43-.11.2-.11.35-.32.33-.44.57-1l.1-.2q.04-.06.08-.06.05 0 .05.06 0 .4-.49 1.2-.52.84-1.3.84zm-.42-1.36q.46-.08.68-.3.22-.23.22-.58 0-.36-.23-.36-.28 0-.47.39-.19.38-.2.85z"/>
  </g>
</svg>`
};

export default { randomNumber, randomAngle, randomColor, icons, hexToHSL, HSLAToHexA, colorPalettes, strings, pageDetails };
