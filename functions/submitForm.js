const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
    const data = JSON.parse(event.body);

    // Підключення до MongoDB
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('quakeout_site_database');
        const collection = database.collection('orders');

        // Створення документа
        const doc = {
            name: data.name,
            company: data.company,
            email: data.email,
            phone: data.phone,
            orderDescription: data.order_description,
            createdAt: new Date()
        };

        const result = await collection.insertOne(doc);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Замовлення успішно відправлено!' })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Виникла помилка при відправці замовлення' })
        };
    } finally {
        await client.close();
    }
};

//const { MongoClient } = require('mongodb');

//exports.handler = async function (event, context) {
//    if (event.httpMethod !== 'POST') {
//        return {
//            statusCode: 405,
//            body: 'Метод не поддерживается',
//        };
//    }

//    const { name, company, email, phone, order_description } = JSON.parse(event.body);

//    if (!name || !email || !phone || !order_description) {
//        return {
//            statusCode: 400,
//            body: 'Все обязательные поля должны быть заполнены',
//        };
//    }

//    const uri = process.env.MONGO_URI;
//    const client = new MongoClient(uri);

//    try {
//        await client.connect();
//        const database = client.db('quakeout_site_database');
//        const collection = database.collection('orders');

//        const result = await collection.insertOne({
//            name,
//            company,
//            email,
//            phone,
//            order_description,
//            createdAt: new Date()
//        });

//        return {
//            statusCode: 200,
//            body: JSON.stringify({ message: 'Данные успешно сохранены', id: result.insertedId }),
//        };
//    } catch (error) {
//        console.error(error);
//        return {
//            statusCode: 500,
//            body: 'Ошибка при сохранении данных',
//        };
//    } finally {
//        await client.close();
//    }
//};