# Jonnathan-bot

this might turn out to be a shitty bot idc

Here is a link to invite the bot: [click me](https://discord.com/oauth2/authorize?client_id=718998971799961701&scope=bot&permissions=3394566)

I have coded the bot but it's is really bad and making it open source will make me change that :)

## installation

I would recommand installing [git](https://git-scm.com/) and [Node LTS](https://nodejs.org/en/) first.

Then open terminal/cmd in your desired location (do not open cmd as admin in windows) and paste in `git clone https://github.com/E-boi/Jonnathan-bot`. You should see a folder named `Jonnathan-bot`. Paste `cd ./Jonnathan-bot` to enter the folder in your terminal. Paste in `npm i` to install dependencies. Edit the [config](https://github.com/E-boi/Jonnathan-bot#config-example) (see below) first. To run the bot do `npm start`.

## Config example

Before we start, sorry for my bad instructions.

Make a file in the root folder named `config.json`. And add your bot token and prefix. Follow this [video](https://youtu.be/358kUe0CKiE?t=16) stop at 2:45. Once you have your connection string replace \<username> with the database username you made and \<password> with the password. Then paste in the connection string in mongo uri. In db you can name it anything. guildConfigs is where the prefix will be stored and logs is where all the logs will be stored (kicks, bans, warns) and recommand leaving the client options unless you know what where doing. the config should look something like the below

```json
{
	"prefix": "your default prefix",
	"token": "your bot token",
	"mongo": {
		"uri": "mongodb uri",
		"db": "bot",
		"collections": {
			"guildConfigs": "config",
			"logs": "logs"
		},
	"clientOptions": {
		"messageSweepInterval": 3600,
		"ws": {
			"intents": ["GUILD_PRESENCES", "GUILD_MEMBERS", "GUILDS", "GUILD_EMOJIS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_BANS"]
		}
	}
}
```
