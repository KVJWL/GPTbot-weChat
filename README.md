# ✨GPTbot-weChat
This is a ChatGPT intelligent WeChat robot project, you can deploy it with simple settings.

## 🌟Feature
 ☑️Use ChatGPT On Wechat via wechaty  

 ☑️Support OpenAI Accounts Pool  

 ☑️Support use proxy to login 

 ☑️Add conversation Support  

 ☑️Add Dockerfile  

 ☑️Publish to Docker.hub  

 ☑️Add Railway deploy  

 ☑️Auto Reload OpenAI Accounts Pool  

 ☑️Add sendmessage retry for 429/  

## Install
npm install
NodeJS Version >= 18.0.0
## Config
### Copy config
You need copy config file for setting up your project.

cp config.yaml.example config.yaml
### Get and config Openai account
If you don't have this OpenAI account and you live in China, you can get it here.

### Use account and password
You need get OpenAI account and password. Your config.yaml should be like this:

chatGPTAccountPool:
  - email: <your email>
    password: <your password>
if you hope only some keywords can trigger chatgpt on private chat, you can set it like this:
chatPrivateTiggerKeyword: ""
⚠️ Trigger keywords must appear in the first position of the received message. ⚠️ Pls make sure your network can log in to OpenAI, and if you fail to login in try setting up a proxy or using SessionToken.

### Setup proxy:

You can configure in config.yaml:

openAIProxy: <Your Proxy>

## Start Project
npm run dev

