class TextModerationService {
    private badWords = [
        "shit",
        "bitch",
        "dick",
        "prick",
        "asshole",
        "pussy",
        "ass",
        "fuck",
        "cock",
        "titties",
        "boner",
        "muff",
        "cunt",
        "сука",
        "блять",
        "єбать",
        "їбать",
        "дідько",
        "хуй",
        "пизда",
        "дєрмо",
        "гамно",
    ];
    public check(text: string): boolean {
        const normalized = text.toLowerCase();

        return this.badWords.some((word) => {
            const regex = new RegExp(
                `(?<![\\p{L}\\p{N}_])${word}(?![\\p{L}\\p{N}_])`,
                "iu",
            );
            return regex.test(normalized);
        });
    }
}
export const textModerationService = new TextModerationService();
