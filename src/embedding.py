import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
print(openai.api_key)

def run():
    
    embedding = openai.Embedding.create(
        model="text-embedding-ada-002",
        input="返回个向量化的数据",
    )

    print(embedding['data'][0]['embedding'])

run()