const { MongoClient } = require('mongodb');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Метод не поддерживается',
        };
    }

    const { name, company, email, phone, order_description } = JSON.parse(event.body);

    if (!name || !email || !phone || !order_description) {
        return {
            statusCode: 400,
            body: 'Все обязательные поля должны быть заполнены',
        };
    }

    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('quakeout_site_database');
        const collection = database.collection('orders');

        const result = await collection.insertOne({
            name,
            company,
            email,
            phone,
            order_description,
            createdAt: new Date()
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Данные успешно сохранены', id: result.insertedId }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Ошибка при сохранении данных',
        };
    } finally {
        await client.close();
    }
};