import express from 'express';
import Topgg from '@top-gg/sdk';
const app = express();

const webhook = new Topgg.Webhook(config.topgg.oauth);
const api = new Topgg.Api(config.topgg.token);

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.post(
	'/dblwebhook',
	webhook.listener(vote => {
		console.log(vote);
	})
);

export default client => {
	app.listen(process.env.PORT || 8080, () => console.log(`On port ${process.env.PORT || 8080}`));
	setInterval(() => {
		api.postStats({
			serverCount: client.guilds.cache.size,
		});
	}, 1800000);
};
