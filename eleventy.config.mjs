import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { transform } from "lightningcss";

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
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
};