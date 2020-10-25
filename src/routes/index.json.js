import index from "./_index.js";

const contents = JSON.stringify(
  index
    // .filter(pattern => {
    //   return pattern.mode !== "fill";
    // })
    .map(pattern => {
      return {
        title: pattern.title,
        slug: pattern.slug,
        width: pattern.width,
        height: pattern.height,
        path: pattern.path,
        mode: pattern.mode
      };
    })
);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(contents);
}
