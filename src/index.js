const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../config.json');

global.config = config;

const prefix = config.prefix;

Client.on('ready', () => {
	console.log(`Logging in as "${Client.user.username}"`);
});

Client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd === 'hi' || cmd === 'hello')
		return message.reply(
			"Hello, Hi, Hola, हैलो, hallo, Olá, Përshëndetje, Nyob zoo, ਸਤ ਸ੍ਰੀ ਅਕਾਲ, እው ሰላም ነው, Szia, Buna, مرحبا, Halló, Привет, Բարեւ Ձեզ, Nnọọ, Talofa, Salam, Halo, Halò, হ্যালো, Dia dhuit, Здраво, Kaixo, Ciao, Mhoro, добры дзень, こんにちは (Kon'nichiwa), هيلو, Zdravo, Halo, හෙලෝ (Helō), Здравейте, ಹಲೋ (Halō), Ahoj, ဟယ်လို (haallo), Сәлеметсіз бе, Zdravo, Hola, សួស្តី, Salaan, Kumusta, Mwaramutse, Lumela, 你好 (Nǐ hǎo), 여보세요, slav, Bonghjornu, Салам, zdravo, ສະບາຍດີ, Hallå, Ahoj, Salve, Салом, Hej, Sveiki, வணக்கம், Hallo, Sveiki, Сәлам, saluton, Здраво, สวัสดี, Tere, Salama, Merhaba, Kamusta, salam, Hei, ഹലോ, Здравствуйте, Bonjour, Bongu, ہیلو, Ola, ياخشىمۇسىز, გამარჯობა, नमस्कार, Salom, Сайн уу, xin chào, Χαίρετε, नमस्कार, નમસ્તે, Hoi, alo, Moni, Mholo, sannu, ନମସ୍କାର, העלא, aloha, سلام, Pẹlẹ o, שלום , سلام, Sawubona, dzień dobry"
		);
});

Client.login(config.token);
