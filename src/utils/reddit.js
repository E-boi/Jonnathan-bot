import fetch from 'node-fetch';

export default async url => {
	if (Array.isArray(url)) url = url[Math.floor(Math.random() * url.length)];
	const res = await fetch(url);
	const json = await res.json();
	const index = json.data.children[Math.floor(Math.random() * json.data.dist)].data;
	const post = {
		title: index.title,
		description: index.selftext,
		image: index.url || index.url_overridden_by_dest || index.preview.images[0].source.url.replace('&amp;', '&'),
		link: `https://www.reddit.com${index.permalink}`,
		comments: index.num_comments,
		upvotes: index.ups,
	};

	if (index.thumbnail === 'NSFW' || index.over_18) post.nsfw = true;
	if (post.image?.includes('gallery') || index.image?.includes('https://youtube.com')) {
		post.description = post.image;
		post.image = null;
	}
	if (post.title?.length > 250) post.title = post.title.slice(0, 248);
	if (post.description?.length > 2048) post.description = post.description.slice(0, 2046);

	return post;
};
