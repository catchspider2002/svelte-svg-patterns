// // Ordinarily, you'd generate this data from markdown files in your
// // repo, or fetch them from a database of some kind. But in order to
// // avoid unnecessary dependencies in the starter template, and in the
// // service of obviousness, we're just going to leave it here.

// // This file is called `_posts.js` rather than `posts.js`, because
// // we don't want to create an `/blog/posts` route — the leading
// // underscore tells Sapper not to do that.

// const posts = [
// 	{
// 		title: 'What is Sapper?',
// 		slug: 'what-is-sapper',
// 		html: `
// 			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

// 			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

// 			<ul>
// 				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
// 				<li>Server-side rendering (SSR) with client-side hydration</li>
// 				<li>Service worker for offline support, and all the PWA bells and whistles</li>
// 				<li>The nicest development experience you've ever had, or your money back</li>
// 			</ul>

// 			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
// 		`
// 	},

// 	{
// 		title: 'How to use Sapper',
// 		slug: 'how-to-use-sapper',
// 		html: `
// 			<h2>Step one</h2>
// 			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

// 			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
// 			cd my-app
// 			npm install # or yarn!
// 			npm run dev
// 			</code></pre>

// 			<h2>Step two</h2>
// 			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

// 			<h2>Step three</h2>
// 			<p>...</p>

// 			<h2>Step four</h2>
// 			<p>Resist overdone joke formats.</p>
// 		`
// 	},

// 	{
// 		title: 'Why the name?',
// 		slug: 'why-the-name',
// 		html: `
// 			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

// 			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
// 		`
// 	},

// 	{
// 		title: 'How is Sapper different from Next.js?',
// 		slug: 'how-is-sapper-different-from-next',
// 		html: `
// 			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://vercel.com/'>Vercel</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

// 			<ul>
// 				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
// 				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
// 				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
// 				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
// 			</ul>
// 		`
// 	},

// 	{
// 		title: 'How can I get involved?',
// 		slug: 'how-can-i-get-involved',
// 		html: `
// 			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
// 		`
// 	}
// ];

// posts.forEach(post => {
// 	post.html = post.html.replace(/^\t{3}/gm, '');
// });

const pattern1 = {
  title: "Inverted triangles",
  slug: "inverted-triangles",
  colors: 2,
  maxStroke: 7,
  maxScale: 16,
  width: 40,
  height: 40,
  viewBoxWidth: 40,
  viewBoxHeight: 40,
  path:
    "<path d='M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0 13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5 46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40 6.495zM47.5 26.495h-15l7.5-12.99z'/>"
};

const pattern2 = {
  title: "Chevron",
  slug: "chevron",
  colors: 2,
  maxStroke: 7,
  maxScale: 16,
  width: 40,
  height: 40,
  viewBoxWidth: 10.583,
  viewBoxHeight: 10.583,
  path:
    "<path d='M0 13.276l5.292-5.292 5.291 5.292'/><path d='M-2.646 10.63l7.938-7.937 7.937 7.937'/><path d='M-2.646 5.338l7.938-7.937 7.937 7.937'/>"
};

const pattern3 = {
  title: "Honeycomb",
  slug: "honeycomb",
  colors: 2,
  maxStroke: 7,
  maxScale: 16,
  width: 56,
  height: 100,
  viewBoxWidth: 56,
  viewBoxHeight: 100,
  path: "<path d='M28 26L0 10v-34l28-16 28 16v34L28 26v34M28 126L0 110V76l28-16 28 16v34l-28 16v34'/>"
};

const pattern4 = {
  title: "Vertical Chevron",
  slug: "vertical-chevron",
  colors: 2,
  maxStroke: 7,
  maxScale: 16,
  width: 40,
  height: 40,
  viewBoxWidth: 10.583,
  viewBoxHeight: 10.583,
  path:
    "<path d='M-2.693 0L2.6 5.292l-5.292 5.291'/><path d='M-.047-2.646l7.938 7.938-7.938 7.937'/><path d='M5.245-2.646l7.937 7.938-7.937 7.937'/>"
};

const pattern5 = {
  title: "Horizontal Lines",
  slug: "horizontal-lines",
  colors: 2,
  maxStroke: 7,
  maxScale: 16,
  width: 40,
  height: 40,
  viewBoxWidth: 10.583,
  viewBoxHeight: 10.583,
  path:
    "<path d='M-1.323 2.117h13.23M-1.323 4.763h13.23M-1.323 7.408h13.23M-1.323 10.054h13.23M-1.323-.53h13.23'/>"
};

const pattern6 = {
  title: "Vertical Lines",
  slug: "vertical-lines",
  colors: 2,
  maxStroke: 7,
  maxScale: 16,
  width: 40,
  height: 40,
  viewBoxWidth: 10.583,
  viewBoxHeight: 10.583,
  path:
    "<path d='M6.88-1.852v13.23M4.233-1.852v13.23M1.587-1.852v13.23M-1.058-1.852v13.23M9.525-1.852v13.23'/>"
};

const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6];

export default patterns;
