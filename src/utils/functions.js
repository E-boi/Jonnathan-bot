export function isBotOwner(member) {
	return member.id === config.ownerId;
}
