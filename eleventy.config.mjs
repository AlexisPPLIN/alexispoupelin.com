import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { transform } from "lightningcss";
import { feedPlugin } from "@11ty/eleventy-plugin-rss"
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "post", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "fr",
			title: "Le blog de AlexisPPLIN",
			subtitle: "",
			base: "https://alexispoupelin.com/",
			author: {
				name: "Alexis POUPELIN",
				email: "contact@alexispoupelin.com", // Optional
			}
		}
	});

    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addPassthroughCopy("bundle.js");
    eleventyConfig.addPassthroughCopy({ "_includes/img/favicon": "/" });
	eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addFilter("cssmin", function (inputCode) {
		if (process.env.ELEVENTY_RUN_MODE === "build") {
			let { code } = transform({
				// filename: undefined,
				code: Buffer.from(inputCode),
				minify: true,
				sourceMap: false
			});
			return code;
		}

		return `/* [buildawesome] cssmin skipped during --watch and --serve */\n${inputCode}`;
	});

	eleventyConfig.addFilter("isSitemapEligible", (url) => {
		const excluded = [".css", ".js", ".json", ".txt"];
		return !excluded.some(ext => url.endsWith(ext));
	});

	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

	function extractExcerpt(post) {
		if(!post.templateContent) return '';
		return post.templateContent.substr(0, 250) + ' ...';
	}

	eleventyConfig.addCollection("categories", function(collectionApi) {
		let categories = new Set();
		let posts = collectionApi.getFilteredByTag('post');
		posts.forEach(p => {
			let cats = p.data.categories;
			cats.forEach(c => categories.add(c));
		});
		return Array.from(categories);
	});

	eleventyConfig.addFilter("filterByCategory", function(posts, cat) {
		/*
		case matters, so let's lowercase the desired category, cat
		and we will lowercase our posts categories
		*/
		cat = cat.toLowerCase();
		let result = posts.filter(p => {
			let cats = p.data.categories.map(s => s.toLowerCase());
			return cats.includes(cat);
		});
		return result;
	});

	const french = new Intl.DateTimeFormat("fr");
	eleventyConfig.addFilter("niceDate", function(d) {
		return french.format(d);
	});
};