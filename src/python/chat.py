import os
import openai

contextMessages = [
    # GPT角色设定
    {"role": "system", "content": "你是一个资深的心理咨询师"},
    # 模拟用户输入信息
    {"role": "user", "content": "我觉得GPT很酷！"}
]
message2 = {"role": "user", "content": "你说的很好，能把你刚才说的总结成一句话吗？20个字以内。"}
message3 = {"role": "user", "content": "把刚才你说的内容翻译成英文。"}

openai.api_key = os.getenv("OPENAI_API_KEY")
print(openai.api_key)

def run(addMessage = False):

    if(addMessage):
        contextMessages.append(addMessage)
    
    chat_completion = openai.ChatCompletion.create(
        # 选择的GPT模型
        model="gpt-3.5-turbo-16k-0613",
        # 上下文
        messages=contextMessages,
        # 1.2使得GPT答复更具随机性
        temperature=1.2,
        # 不采用流式输出
        stream=False,
        # 期望GPT每次答复两条（这里只是为了演示，正常情况取值为1）
        n=1,
    )

    # 第一个答复
    print(chat_completion.choices[0].message.content)
    # 第二个答复，上边的n>=2时，才会有该条回复
    # print(chat_completion.choices[1].message.content)
    print("end----")

    # 将答复存储到上下文中，否则下次再进行对话时，GPT会遗忘之前的答复
    contextMessages.append(chat_completion.choices[0].message)



run()
run(message2)
run(message3)