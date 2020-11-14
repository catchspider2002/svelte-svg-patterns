import index from "./_index.js";

const contents = JSON.stringify(
  index
    // .sort(function (x, y) {
    //   let a = x.title.toUpperCase(),
    //     b = y.title.toUpperCase();
    //   return a == b ? 0 : a > b ? 1 : -1;
    // })
    .map((pattern) => {
      return {
        title: pattern.title,
        slug: pattern.slug,
        width: pattern.width,
        height: pattern.height,
        colors: pattern.colors,
        path: pattern.path,
        mode: pattern.mode,
        tags: pattern.tags,
        creationDate: pattern.creationDate,
      };
    })
);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
