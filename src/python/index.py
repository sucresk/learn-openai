import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
print('hello,', openai.api_key)
list = openai.Model.list()
print('skk',list)