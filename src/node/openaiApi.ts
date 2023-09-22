// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config()
const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export enum OPEN_AI_ROLE {
    user = "user",
    system = "system"
}
export interface IOpenAIRole {
    role: OPEN_AI_ROLE;
    content: string;
}
export interface IOpenAIParams {
    model: "gpt-3.5-turbo" | "text-davinci-003" | "gpt-3.5-turbo-16k-0613"
    messages: IOpenAIRole[];
    temperature?: number;
    max_tokens?: number;
    prompt?: string;
    suffix?: string;
    stream?: boolean;
    n?: number;
}


async function chat(params:IOpenAIParams) {
    const response = await openai.chat.completions.create(params);
    //  console.log("skk", response)
    return response;
}

async function chatOnce(params:any) {
    const response = await openai.completions.create(params);
     console.log("completions:", response)
    return response;
}
async function test() {
    return await chat({
        model: "gpt-3.5-turbo",
        messages: [{"role": OPEN_AI_ROLE.user, "content": "Say this is a test!"}],
        temperature: 0,
        max_tokens: 256,
      })
}

async function testChatOnce() {
    return await chatOnce({
        model: "text-davinci-003",
        max_tokens: 4000,
        prompt:"请介绍下自己",
        suffix:"破局俱乐部的sucre",
        temperature:0.2,
        stream: false,
        n:1,
    })
}

async function testChatOnce2() {
    return await chatOnce({
        model: "text-davinci-003",
        max_tokens: 4000,
        prompt:`The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

        Human: Hello, who are you?
        AI: I am an AI created by OpenAI. How can I help you today?
        Human: I'd like to cancel my subscription.
        AI:`,
        stop:[" Human:", " AI:"],
        temperature:0.2,
        stream: false,
        n:1,
    })
}

class ChatRobot {
    private contextMessages: IOpenAIRole[] = [];
    constructor() {

    }
    setRole(role: OPEN_AI_ROLE, content: string) {
        this.contextMessages.push({role, content})
    }
    async say(content: string) {
        this.contextMessages.push({role: OPEN_AI_ROLE.user, content})
        const response: any = await chat({
            model:"gpt-3.5-turbo-16k-0613",
            messages: this.contextMessages,
            temperature:1.2,
            n:1,
        })
        this.contextMessages.push(response.choices[0].message)
        // console.log('say', response.choices[0].message.content);
        return response.choices[0].message.content;
    }
}
export {
    chat,
    test,
    testChatOnce,
    testChatOnce2,
    chatOnce,
    ChatRobot,
}