export const LLMS = {
    // GROQLLAMA38B: 'llama-3.1-405b-reasoning',
    GPT4OMINI: 'gpt-4o-mini',
    GPT4O: 'gpt-4o',
    CLAUDESONNET35: 'claude-3-5-sonnet-20240620',
} as const;

export type LLMType = typeof LLMS[keyof typeof LLMS];

// Cost rates per million tokens (in USD)
const costRates: Record<LLMType, { input: number; output: number }> = {
    // [LLMS.GROQLLAMA38B]: { input: 0, output: 0 },
    [LLMS.GPT4OMINI]: { input: 0.15, output: 0.6 },
    [LLMS.GPT4O]: { input: 5, output: 15 },
    [LLMS.CLAUDESONNET35]: { input: 3, output: 15 },
};

// Function to estimate cost based on input and output tokens
export function estimateLLMCost(
    model: LLMType,
    inputCharacters: number,
    outputCharacters: number
): number {
    const rates = costRates[model];
    if (!rates) {
        throw new Error(`Unknown model: ${model}`);
    }

    const inputTokens = Math.ceil(inputCharacters / 4);
    const outputTokens = Math.ceil(outputCharacters / 4);

    const inputCost = (inputTokens / 1_000_000) * rates.input;
    const outputCost = (outputTokens / 1_000_000) * rates.output;

    const totalCost = inputCost + outputCost;
    const priceWithMargin = totalCost * 1;

    return Number(priceWithMargin.toFixed(6));
}