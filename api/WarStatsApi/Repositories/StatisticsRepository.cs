using CallOfDuty;
using CallOfDuty.Domain;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using WarStatsApi.Services;

namespace WarStatsApi.Repositories
{
    public class StatisticsRepository : MongoRepository
    {
        private const string CodWzBrMatches = "codwzbrmatches";
        private const string CodWzBrStats = "codwzbrstats";

        public StatisticsRepository(MongoDatabaseSettings settings) : base(settings)
        {
        }

        internal void Insert(CallOfDutyWarzoneStatistics stats)
        {
            var username = stats.data.matches.FirstOrDefault()?.player.username;
            if (string.IsNullOrEmpty(username))
                throw new Exception("no username found");

            var allMatchesOfPlayer = FindMany(CodWzBrMatches, username);
            var newMatchedOfPlayer = stats.data.matches.Where(x => allMatchesOfPlayer.All(y => y.matchID != x.matchID));

            if (newMatchedOfPlayer.Count() == 0)
                return;

            //TODO: InsertOne(CodWzBrStats, stats.data.ToBsonDocument());
            InsertMany(CodWzBrMatches, newMatchedOfPlayer.Select(x => x.ToBsonDocument()));
        }
        protected IEnumerable<Match> FindMany(string collectionName, string username)
        {
            var db = client.GetDatabase(settings.DatabaseName);
            var collection = db.GetCollection<Match>(collectionName);
            var filter = Builders<Match>.Filter.Where(x => x.player.username == username);
            return collection.Find(filter).ToList();
        }
    }
}
