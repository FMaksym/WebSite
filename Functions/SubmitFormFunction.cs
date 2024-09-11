using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

public class SubmitFormFunction
{
    private static readonly string connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");

    public async Task Handler(HttpListenerRequest request, HttpListenerResponse response)
    {
        if (request.HttpMethod != "POST")
        {
            CreateResponse(response, HttpStatusCode.MethodNotAllowed, "Method not allowed");
            return;
        }

        string requestBody;
        using (var reader = new StreamReader(request.InputStream))
        {
            requestBody = await reader.ReadToEndAsync();
        }

        var data = JsonConvert.DeserializeObject<FormData>(requestBody);

        var client = new MongoClient(connectionString);
        var database = client.GetDatabase("quakeout_site_database");
        var collection = database.GetCollection<BsonDocument>("orders");

        var doc = new BsonDocument
        {
            { "name", data.Name },
            { "company", string.IsNullOrEmpty(data.Company) ? BsonNull.Value : data.Company },
            { "email", data.Email },
            { "phone", data.Phone },
            { "orderDescription", data.OrderDescription },
            { "createdAt", DateTime.UtcNow }
        };

        try
        {
            await collection.InsertOneAsync(doc);
            CreateResponse(response, HttpStatusCode.OK, "Замовлення успішно відправлено!");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            CreateResponse(response, HttpStatusCode.InternalServerError, "Виникла помилка при відправці замовлення");
        }
    }

    private void CreateResponse(HttpListenerResponse response, HttpStatusCode statusCode, string message)
    {
        response.StatusCode = (int)statusCode;
        response.ContentType = "application/json";

        using (var writer = new StreamWriter(response.OutputStream))
        {
            writer.Write(JsonConvert.SerializeObject(new { message }));
        }
    }
}

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