export function randomEmoji(): string {
    const emojis = ['😀', '😂', '😎', '😍', '🤔', '🙃', '😴', '🤖', '👾', '🎉'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}
// Add more utility functions here as needed