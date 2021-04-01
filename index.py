import json
import re
print("""
    ███████╗██████╗ ██╗   ██╗███╗   ██╗███████╗████████╗██████╗ ██╗  ██╗
    ██╔════╝██╔══██╗██║   ██║████╗  ██║██╔════╝╚══██╔══╝██╔══██╗██║  ██║
    █████╗  ██║  ██║██║   ██║██╔██╗ ██║█████╗     ██║   ██████╔╝███████║
    ██╔══╝  ██║  ██║██║   ██║██║╚██╗██║██╔══╝     ██║   ██╔══██╗██╔══██║
    ███████╗██████╔╝╚██████╔╝██║ ╚████║███████╗   ██║██╗██████╔╝██║  ██║
    ╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝
""")

# f = open("answ.json", encoding='UTF-8')
f2 = open("answ2.json", encoding='UTF-8')
response = json.loads(f2.read())
# url = "https://www.edunet.bh/Quiz/GetQuizQuestions"
# Question : {}


def multiChoice(data):
  qes = re.sub('<[^<]+?>', '', data['Question_Text'])
  for x in data['ChoicesList']:
    if x['Correct_Choice'] == True:
      multiawnser = x['ChoiceText']
  print(f"MultiChoiceQuestion\nQuestion : {qes}\nAnswer : {multiawnser}\n===================\n")
  print(f'''
MultiChoiceQuestion
Question : {qes}
Answer : {multiawnser}
===================

  ''',file=open("answers.txt","a" ,encoding='UTF-8'))
  print(f"")



def eassay(data):
  qes = re.sub('<[^<]+?>', '', data['Question_Text'])
  awn = re.sub('<[^<]+?>', '', data['EssayAnswer'])
  print(f'''
EssayQuestion 
Question : {qes}
EssayAnswer : {awn}
==================
  ''',file=open("answers.txt","a" ,encoding='UTF-8'))


for Q in response:
  if Q['QuestionTypeID'] == 3:
    multiChoice(Q)
  elif Q['QuestionTypeID'] == 1:
    eassay(Q)