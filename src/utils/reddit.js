import fetch from 'node-fetch';

export default async (url, description = false, image = true, link = true, title = true, commentsNum = true, upvotes = true) => {
	const post = { url };
	if (Array.isArray(url)) post.url = url[Math.floor(Math.random() * url.length)];
	const res = await fetch(post.url);
	const json = await res.json();
	const index = json.data.children[Math.floor(Math.random() * json.data.dist)].data;
	if (image) post.image = index.url || index.url_overridden_by_dest || index.preview.images[0].source.url.replace('&amp;', '&');
	if (link) post.link = `https://www.reddit.com${index.permalink}`;
	if (title) post.title = index.title;
	if (description) post.description = index.selftext;
	if (commentsNum) post.comments = index.num_comments;
	if (upvotes) post.upvotes = index.ups;
	if (index.thumbnail === 'NSFW' || index.over_18) post.nsfw = true;
	delete post.url;

	if (post.image?.includes('gallery')) {
		post.description = post.image;
		post.image = null;
	}
	return post;
};
