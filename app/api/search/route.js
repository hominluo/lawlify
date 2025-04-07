import fs from 'fs';
import path from 'path';

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const processFile = async (file, query) => {
  const text = fs.readFileSync(file, 'utf8');
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0,
    messages: [
      { role: 'user', content: `You are a legal analysis AI assistant. Your task is to evaluate the relevance of a given case to a user's legal situation and determine the case outcome. Follow these steps carefully:

1. First, review the user's legal situation:
<user_situation>
${query}
</user_situation>

2. Next, examine the details of the case that may or may not be relevant:
<case_details>
${text}
</case_details>

3. Carefully analyze both the user's situation and the case details. Look for similarities in the legal issues, circumstances, and applicable laws.

4. In your analysis, consider the following:
   - The core legal issues in both situations
   - Similarities and differences in the facts
   - Applicable laws or regulations
   - Jurisdiction and court level (if mentioned)
   - Time frame of the case versus the user's situation
   - If the case is not even a story, but talks about a relevant topic, it must not be considered relevant
   - If the case is in another top level category (e.g. traffic, employment, etc.), it must not be considered relevant

5. Based on your analysis, prepare a justification for the relevance of the case to the user's situation. This should be a detailed explanation of why the case is or isn't relevant, citing specific aspects from both the user's situation and the case details.

6. Assign a relevance score on a scale of 0 to 100, where 0 is completely irrelevant and 100 is highly relevant.

7. Determine whether the party in the same situation as the user (plaintiff or defendant) won the case.

8. If the case is relevant, provide direct quotes from the user's situation and the case details that are relevant to each other.

Remember, your analysis should be objective and based solely on the information provided in the user's situation and the case details. Do not make assumptions or introduce information not present in the given texts.` }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'legal_analysis',
        strict: true,
        schema: {
          type: 'object',
          required: ['relevance_justification', 'relevance_quotes', 'relevance_score', 'case_outcome'],
          additionalProperties: false,
          properties: {
            relevance_justification: {
              type: 'string',
              description: 'Detailed justification for the relevance of the case'
            },
            relevance_quotes: {
              type: 'array',
              items: {
                type: 'object',
                required: ['user_situation_quote', 'case_details_quote'],
                additionalProperties: false,
                description: "Quotes from the user's situation and the case details that are relevant to each other. Must be direct quote verbatim from the text.",
                properties: {
                  user_situation_quote: {
                    type: 'string',
                    description: "Quote from the user's situation that is relevant to the case"
                  },
                  case_details_quote: {
                    type: 'string',
                    description: "Quote from the case details that is relevant to the user's situation"
                  }
                }
              }
            },
            relevance_score: {
              type: 'integer',
              description: 'Relevance score from 0 to 100'
            },
            case_outcome: {
              type: 'object',
              required: ['won', 'explanation'],
              additionalProperties: false,
              properties: {
                won: {
                  type: 'boolean',
                  description: 'Whether the party in the same situation as the user won the case'
                },
                explanation: {
                  type: 'string',
                  description: 'Brief explanation of the case outcome'
                }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.choices[0].message.content);
};

const processFiles = async (query) => {
  const rawDataDir = path.resolve(process.cwd(), 'app/api/search/data/parsed');
  const mdFiles = fs.readdirSync(rawDataDir)
  .filter(file => file.toLowerCase().endsWith('.md'));

  const promises = mdFiles.map((file) => {
    return new Promise(async (resolve) => {
      const results = await processFile(path.join(rawDataDir, file), query);
      resolve({
        case_name: file.replace('.md', ''),
        ...results
      });
    });
  });
  return (await Promise.all(promises)).sort((a, b) => b.relevance_score - a.relevance_score);
};

export async function POST (req) {
  const { query } = await req.json()
  const results = await processFiles(query);
  console.log(JSON.stringify(results, null, 2));
  return Response.json(results)
}