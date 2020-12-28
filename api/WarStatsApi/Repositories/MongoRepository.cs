using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WarStatsApi.Services
{
    public abstract class MongoRepository
    {
        protected readonly MongoClient client;
        protected readonly MongoDatabaseSettings settings;
        protected Dictionary<string, List<string>> _databasesAndCollections;

        public MongoRepository(MongoDatabaseSettings settings)
        {
            this.client = new MongoClient(settings.ConnectionString);
            this.settings = settings;
        }

        protected async Task<Dictionary<string, List<string>>> GetDatabasesAndCollections()
        {
            if (_databasesAndCollections != null) return _databasesAndCollections;

            _databasesAndCollections = new Dictionary<string, List<string>>();
            var databasesResult = client.ListDatabaseNames();

            await databasesResult.ForEachAsync(async databaseName =>
            {
                var collectionNames = new List<string>();
                var database = client.GetDatabase(settings.DatabaseName);
                var collectionNamesResult = database.ListCollectionNames();
                await collectionNamesResult.ForEachAsync(
                    collectionName => { collectionNames.Add(collectionName); });
                _databasesAndCollections.Add(settings.DatabaseName, collectionNames);
            });

            return _databasesAndCollections;
        }

        protected async Task<BsonDocument> GetDocument(string collectionName, int index)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            BsonDocument document = null;
            await collection.Find(doc => true)
              .Skip(index)
              .Limit(1)
              .ForEachAsync(doc => document = doc);
            return document;
        }

        protected IList<BsonDocument> GetDocuments(string collectionName)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            return collection.Find(new BsonDocument()).ToList();
        }

        protected async Task<long> GetCollectionCount(string collectionName)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            return await collection.EstimatedDocumentCountAsync();
        }

        protected IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            var db = client.GetDatabase(settings.DatabaseName);
            return db.GetCollection<T>(collectionName);
        }

        protected async Task<UpdateResult> CreateOrUpdateField(string collectionName, string id, string fieldName, string value)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            var update = Builders<BsonDocument>.Update.Set(fieldName, new BsonString(value));
            return await collection.UpdateOneAsync(CreateIdFilter(id), update);
        }

        protected async Task<DeleteResult> DeleteDocument(string collectionName, string id)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            return await collection.DeleteOneAsync(CreateIdFilter(id));
        }

        protected static BsonDocument CreateIdFilter(string id)
        {
            return new BsonDocument("_id", new BsonObjectId(new ObjectId(id)));
        }

        protected async Task CreateDocument(string collectionName)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            await collection.InsertOneAsync(new BsonDocument());
        }

        protected void InsertMany(string collectionName, IEnumerable<BsonDocument> documents)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            collection.InsertMany(documents);
        }

        protected void InsertOne(string collectionName, BsonDocument document)
        {
            var collection = GetCollection<BsonDocument>(collectionName);
            collection.InsertOne(document);
        }
    }
}
