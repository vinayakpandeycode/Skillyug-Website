import { NextResponse } from 'next/server';

const GROQ_CHAT_URL = process.env.GROQ_CHAT_URL || 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are Whobee, the official AI assistant for SkillYug Technologies.

Company Information & Knowledge Base:
- Company Name: SkillYug Technologies
- What is SkillYug Technologies: SkillYug Technologies is an AI-first software engineering and digital innovation company building AI solutions, autonomous AI agents, enterprise software platforms, SaaS products, intelligent business automation systems, custom web/mobile applications, and scalable cloud infrastructure.
- Creator / Founder: Vinayak Pandey (Founder & Chief AI Architect)
- Lead Developer: Vatsal Varshney (Lead Software & AI Engineer)
- Team: Aditi Mall (Co-founder & Chief Marketing Officer), Shifa Parveen (Chief Technology Officer), Vatsal Varshney (Chief Developer Officer), Tanya Ojha (Social Media Manager), and Raushan Singh (Chief Operations Officer).
- Key Products:
  1. THINK++ - Advanced cognitive AI engine for predictive analytics & deep reasoning (https://anuji.vercel.app/).
  2. AI Evaluate - Enterprise AI answer sheet evaluation & grading platform (https://ai-evaluaite-1.onrender.com/).
  3. PostPilot AI - Autonomous social content generation & multi-channel marketing engine.
  4. HashBoost AI - AI search engine optimization & hashtag intelligence platform (https://viral-tag-ai.lovable.app/).
  5. B.O.I. Mark-1 - AI-powered desktop automation framework with 300+ intelligent features.
- Key Non-Profit Project: HaarWala.org NGO Website (https://haarwala.org).
- Main Service Pillars: AI Automation, Autonomous AI Agents, Custom Software Engineering, SaaS Development, Web & Mobile Applications, Cloud Solutions (AWS/Azure/GCP), DevOps, UI/UX Design.
- Contact Details: Email: consultantskillyug@gmail.com | Start a Project: https://docs.google.com/forms/d/e/1FAIpQLSfEQ2YLNjB5N9exUh16Izbw3D8PrzXMps1JiA8-OTgodks3uA/viewform?pli=1

Response Guidelines:
- Be concise, friendly, practical, and highly helpful.
- Answer only from the company information above. Do not invent clients, prices, locations, features, results, or contact details.
- If the information is not in the knowledge base, say that you do not have verified information and direct the user to consultantskillyug@gmail.com.
- Answer the user's exact question first; do not replace a specific answer with a generic company description.
- When asked about SkillYug, state what it is clearly. When asked who created or founded SkillYug, credit Vinayak Pandey (Founder & Chief AI Architect). When asked who developed or engineered Whobee / SkillYug, credit Vatsal Varshney (Lead Software & AI Engineer).
- Direct users to https://docs.google.com/forms/d/e/1FAIpQLSfEQ2YLNjB5N9exUh16Izbw3D8PrzXMps1JiA8-OTgodks3uA/viewform?pli=1 or consultantskillyug@gmail.com for consultations, quotes, and project discussions.`;

function localReply(message: string) {
  const question = message.toLowerCase().replace(/[^a-z0-9@+.:/ -]/g, ' ');
  if (!question.trim()) {
    return 'Please ask me a question about SkillYug Technologies, our services, products, or consultations.';
  }
  if (question.includes('who founded') || question.includes('who created') || question.includes('founder')) {
    return 'SkillYug Technologies was founded by Vinayak Pandey, Founder & Chief AI Architect.';
  }
  if (question.includes('what is skillyug') || question.includes('about skillyug') || question.includes('what does skillyug do')) {
    return 'SkillYug Technologies is an AI-first software engineering and digital innovation company building AI solutions, autonomous agents, enterprise software, SaaS products, intelligent automation, web and mobile applications, and cloud infrastructure.';
  }
  if (question.includes('who developed') || question.includes('who engineered') || question.includes('lead developer') || question.includes('whobee')) {
    return 'Whobee and SkillYug engineering are led by Vatsal Varshney, Lead Software & AI Engineer.';
  }
  const teamMembers = [
    ['vinayak pandey', 'Vinayak Pandey is the Founder & Chief AI Architect at SkillYug Technologies.'],
    ['aditi mall', 'Aditi Mall is the Co-founder & Chief Marketing Officer at SkillYug Technologies.'],
    ['shifa parveen', 'Shifa Parveen is the Chief Technology Officer at SkillYug Technologies.'],
    ['vatsal varshney', 'Vatsal Varshney is the Chief Developer Officer and Lead Software & AI Engineer at SkillYug Technologies.'],
    ['tanya ojha', 'Tanya Ojha is the Social Media Manager at SkillYug Technologies.'],
    ['raushan singh', 'Raushan Singh is the Chief Operations Officer at SkillYug Technologies.'],
  ];
  const teamMember = teamMembers.find(([name]) => question.includes(name));
  if (teamMember) return teamMember[1];
  if (question.includes('team') || question.includes('employees') || question.includes('members')) {
    return 'The SkillYug team includes Vinayak Pandey (Founder & Chief AI Architect), Aditi Mall (Co-founder & Chief Marketing Officer), Shifa Parveen (Chief Technology Officer), Vatsal Varshney (Chief Developer Officer), Tanya Ojha (Social Media Manager), and Raushan Singh (Chief Operations Officer).';
  }
  if (question.includes('product') || question.includes('think++') || question.includes('ai evaluate') || question.includes('postpilot') || question.includes('hashboost') || question.includes('b.o.i') || question.includes('boi')) {
    if (question.includes('think++')) return 'THINK++ is an advanced cognitive AI engine for predictive analytics and deep reasoning. Visit https://anuji.vercel.app/ for the product link.';
    if (question.includes('ai evaluate')) return 'AI Evaluate is an enterprise AI answer sheet evaluation and grading platform. Visit https://ai-evaluaite-1.onrender.com/ for the product link.';
    if (question.includes('postpilot')) return 'PostPilot AI is an autonomous social content generation and multi-channel marketing engine.';
    if (question.includes('hashboost')) return 'HashBoost AI is an AI search engine optimization and hashtag intelligence platform. Visit https://viral-tag-ai.lovable.app/ for the product link.';
    if (question.includes('b.o.i') || question.includes('boi')) return 'B.O.I. Mark-1 is an AI-powered desktop automation framework with 300+ intelligent features.';
    return 'SkillYug products include THINK++, AI Evaluate, PostPilot AI, HashBoost AI, and B.O.I. Mark-1. Ask about a specific product for its verified details.';
  }
  if (question.includes('hour') || question.includes('open') || question.includes('close') || question.includes('when can')) {
    return 'Office hours are 9:00 AM to 8:00 PM.';
  }
  if (question.includes('contact') || question.includes('email') || question.includes('phone')) {
    return 'You can reach SkillYug at consultantskillyug@gmail.com or 9450935939. Office hours are 9:00 AM to 8:00 PM.';
  }
  if (question.includes('consult') || question.includes('project') || question.includes('start')) {
    return 'You can book a consultation here: https://docs.google.com/forms/d/e/1FAIpQLSfEQ2YLNjB5N9exUh16Izbw3D8PrzXMps1JiA8-OTgodks3uA/viewform?pli=1';
  }
  if (question.includes('service') || question.includes('offer')) {
    return 'SkillYug builds AI automation, autonomous agents, custom software, SaaS products, web and mobile apps, cloud solutions, DevOps, and UI/UX systems.';
  }
  if (question.includes('haarwala') || question.includes('non profit') || question.includes('ngo')) {
    return 'HaarWala.org is a non-profit NGO website project built by SkillYug Technologies. Visit https://haarwala.org.';
  }
  if (question.includes('where') && (question.includes('skill') || question.includes('company'))) {
    return 'SkillYug Technologies is an AI-first software engineering and digital innovation company. Contact consultantskillyug@gmail.com for verified location information.';
  }
  return 'I do not have verified information for that question. Please contact consultantskillyug@gmail.com for an accurate answer.';
}

export async function POST(request: Request) {
  let body: any;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: 'Invalid JSON payload.' }, { status: 400 });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ detail: 'messages must be a non-empty array.' }, { status: 400 });
  }

  const normalizedMessages = messages
    .map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: typeof m.content === 'string' ? m.content.trim() : '',
    }))
    .filter((m: any) => m.content);

  const payload = {
    model: DEFAULT_MODEL,
    temperature: 0.4,
    max_tokens: 350,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...normalizedMessages],
  };

  const latestMessage = normalizedMessages.filter((message: any) => message.role === 'user').at(-1)?.content || '';

  const verifiedReply = localReply(latestMessage);
  const needsProvider = verifiedReply.startsWith('I do not have verified information');
  if (!needsProvider) {
    return NextResponse.json({ reply: verifiedReply }, { status: 200 });
  }

  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return NextResponse.json({ reply: localReply(latestMessage) }, { status: 200 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const groqResponse = await fetch(GROQ_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await groqResponse.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      // Ignore non-JSON
    }

    if (!groqResponse.ok) {
      return NextResponse.json({ reply: localReply(latestMessage) }, { status: 200 });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ detail: 'The chat provider returned an empty reply.' }, { status: 502 });
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ reply: localReply(latestMessage) }, { status: 200 });
  }
}
