
import { GoogleGenAI, Type } from "@google/genai";
import { EsportsEvent, GameType, EventType } from "../types";
import { demoEvents } from "../data/events";

const CACHE_KEY = "battleclock_events_cache_v2";
const BRIEFING_CACHE_KEY = "battleclock_briefing_cache";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes cache for better consistency

export const fetchRealEvents = async (
    forceRefresh = false
): Promise<EsportsEvent[]> => {
    if (!forceRefresh) {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                return data;
            }
        }
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const today = new Date().toISOString().split("T")[0];
    const currentYear = new Date().getFullYear();

    const prompt = `
    CURRENT DATE: ${today}
    YEAR: ${currentYear}
    
    TASK: Find ONLY the single most relevant LATEST or UPCOMING entry for each category below. 
    Do NOT return past events that finished more than 24 hours ago.
    
    REQUIRED CATEGORIES (Search for these specifically):
    1. BGMI: The very next Version Update.
    2. BGMI: The current active or next upcoming Royal Pass season.
    3. BGMI: The next major official tournament sanctioned by Krafton.
    4. PUBG Mobile: The very next Global Version Update.
    5. PUBG Mobile: The current active or next upcoming Global Royal Pass.
    6. PUBG Mobile: The next major Global Tournament.

    STRICT GUIDELINES:
    - If an event is currently "Live", include it.
    - If an event is in the past (start date before ${today}), ONLY include it if it's a "Live" season or tournament that is still ongoing.
    - Use official release calendars.

    RETURN JSON ARRAY ONLY.
  `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                thinkingConfig: { thinkingBudget: 0 },
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            game: { type: Type.STRING, enum: ["BGMI", "PUBG"] },
                            eventName: { type: Type.STRING },
                            eventType: {
                                type: Type.STRING,
                                enum: [
                                    "New Update",
                                    "Royal Pass",
                                    "New Season",
                                    "Special Event",
                                ],
                            },
                            startDateTime: { type: Type.STRING },
                            version: { type: Type.STRING },
                            description: { type: Type.STRING },
                            highlights: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                            },
                        },
                        required: [
                            "id",
                            "game",
                            "eventName",
                            "eventType",
                            "startDateTime",
                            "description",
                        ],
                    },
                },
            },
        });

        const text = response.text;
        if (!text) return [];

        const now = new Date();
        const rawEvents: any[] = JSON.parse(text);

        const events: EsportsEvent[] = rawEvents.filter((e) => {
            const eventDate = new Date(e.startDateTime);
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            if (eventDate >= oneDayAgo) return true;
            if (
                e.eventType === EventType.ROYAL_PASS ||
                e.eventType === EventType.SEASON
            ) {
                const thirtyDaysAgo = new Date(
                    now.getTime() - 30 * 24 * 60 * 60 * 1000
                );
                return eventDate >= thirtyDaysAgo;
            }
            return false;
        });

        const chunks =
            response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources: { title: string; uri: string }[] = chunks
            .filter((chunk: any) => chunk.web)
            .map((chunk: any) => ({
                title: chunk.web.title,
                uri: chunk.web.uri,
            }));

        const finalData = events.map((event) => ({
            ...event,
            sources: sources.length > 0 ? sources : undefined,
        }));

        const uniqueEvents = finalData.filter(
            (v, i, a) =>
                a.findIndex(
                    (t) => t.eventName === v.eventName && t.game === v.game
                ) === i
        );

        sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                data: uniqueEvents,
                timestamp: Date.now(),
            })
        );

        return uniqueEvents;
    } catch (error) {
        console.error("Fetch failure:", error);
        console.warn(
            "Using demo fallback data due to API error (likely quota exceeded)"
        );
        return demoEvents;
    }
};

/**
 * Fetches a dynamic tactical briefing about the current gaming meta/landscape.
 */
export const fetchTacticalBriefing = async (
    forceRefresh = false
): Promise<string> => {
    if (!forceRefresh) {
        const cached = sessionStorage.getItem(BRIEFING_CACHE_KEY);
        if (cached) {
            const { text, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) return text;
        }
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt =
        "Provide a concise, 3-sentence 'Situational Report' on the current state of BGMI and PUBG Mobile competitive play and version updates. Use military/tactical terminology.";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text =
            response.text ||
            "Operational data currently classified. Establish secure uplink for briefing.";
        sessionStorage.setItem(
            BRIEFING_CACHE_KEY,
            JSON.stringify({ text, timestamp: Date.now() })
        );
        return text;
    } catch {
        return "Link failure detected. Situational awareness compromised.";
    }
};
