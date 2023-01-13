const TelegramApi = require('node-telegram-bot-api')

const{gameOptions, againOptions} = require('./options')

const token = '5733660678:AAHqO1fYEWGK2HTA871QrBKfuN8VqGdm308'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `I will guess a number from 0 to 9, try to guess it`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Try to guess', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}
    ])

    bot.on('message',  async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')
            return bot.sendMessage(chatId, `Welcome`);
        }

        if (text === '/again') {
            return startGame(chatId);
        }

        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name}`);
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `I don't understand you, try again`)

    })

    bot.on('callback_query', async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId)
        }

        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Congratulations! You are right, number is ${chats[chatId]}`, againOptions )
        } else {
            return bot.sendMessage(chatId, `Unfortunately, you didnt guess, number was ${chats[chatId]}`, againOptions)
        }

    })
}

start()



















/** const countryOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Грузия', callback_data: 'Инфо, которая передается на сервер, когда юзер нажимает на кнопку'}],
        ]
    })
}

const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make(['Button 1', 'Button 2']).inline()




const start = () => {
    bot.setMyCommands([
            {command: '/start', description: 'Начальное приветствие'},
            {command: '/info', description: 'О боте'}
        ]
    )

    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! `)
        }
        if (text === '/info') {
            await bot.sendMessage(chatId, `Hello`, keyboard);
            //return  bot.sendMessage(chatId, `С помощью данного бота ты можешь узнать налоги для нерезидента той или иной страны. Список стран находится в процессе разработки и пополняется каждую неделю :)`, countryOptions);
        }
        return bot.sendMessage(chatId, 'Неизвестная команда. Выберите команду из списка :)');
    })
}

start()
 */