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
        return this.badWords.some((word) => normalized.includes(word));
    }
}
export const textModerationService = new TextModerationService();
