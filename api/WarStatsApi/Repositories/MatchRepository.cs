using CallOfDuty;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using WarStatsApi.Entities;
using WarStatsApi.Services;

namespace WarStatsApi.Repositories
{
    public class MatchRepository : MongoRepository
    {

        public MatchRepository(MongoDatabaseSettings settings):base(settings)
        {
        }

        public IEnumerable<Match> Get(string gamertag, int start, int end)
        {
            var collection = GetCollection<Match>("codwzbrmatches");
            var filter = Builders<Match>.Filter.Where(x => x.player.username == gamertag && x.utcStartSeconds >= start && x.utcEndSeconds <= end);
            var matchesOfPlayer = collection.Find(filter).ToList();
            return matchesOfPlayer;
        }

        public void InsertMany(IEnumerable<PlayerScore> matches)
        {
            
        }


    }
}
