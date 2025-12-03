import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProductFormData, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "SEO optimized product title" },
    bullets: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5 bullet points highlighting features and benefits",
    },
    long_description: { type: Type.STRING, description: "A detailed, persuasive product description" },
    platform_copy: {
      type: Type.OBJECT,
      properties: {
        amazon: { type: Type.STRING, description: "Amazon formatted listing content (HTML allowed if needed)" },
        meesho: { type: Type.STRING, description: "Short, punchy listing for Meesho" },
        shopify: { type: Type.STRING, description: " engaging product page copy for Shopify" },
        instagram_caption: { type: Type.STRING, description: "Instagram caption with emojis and hashtags" },
        whatsapp_message: { type: Type.STRING, description: "Direct sales pitch for WhatsApp broadcast" },
      },
      required: ["amazon", "meesho", "shopify", "instagram_caption", "whatsapp_message"],
    },
    seo_keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of high-ranking SEO keywords",
    },
  },
  required: ["title", "bullets", "long_description", "platform_copy", "seo_keywords"],
};

export const generateProductDescription = async (
  data: ProductFormData
): Promise<GeneratedContent> => {
  const model = "gemini-2.5-flash"; // Using fast model for quick text generation

  const promptText = `
    Act as an expert e-commerce copywriter. 
    Generate a high-converting product listing based on the following details:
    
    Product Name: ${data.productName}
    Category: ${data.category}
    Brand: ${data.brand || "Generic"}
    Target Audience: ${data.audience || "General"}
    Tone: ${data.tone}
    Key Features/Notes: ${data.features}

    The output MUST be valid JSON adhering strictly to the schema provided.
    Ensure the content is optimized for SEO and conversion.
  `;

  const parts: any[] = [{ text: promptText }];

  // If an image is provided, add it to the prompt parts
  if (data.image) {
    // data.image is expected to be "data:image/png;base64,..."
    // extract the base64 part and mime type
    const matches = data.image.match(/^data:(.+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      parts.push({
        inlineData: {
          mimeType: matches[1],
          data: matches[2],
        },
      });
      parts[0].text += "\n\nAlso consider the visual details from the attached product image to enhance the description.";
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are ECOWRITER, an elite AI copywriter for e-commerce. You write persuasive, SEO-friendly, and platform-specific content.",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(responseText) as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
