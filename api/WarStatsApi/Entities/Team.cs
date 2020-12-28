using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace WarStatsApi.Entities
{
    public class Team
    {
        public Team()
        {
            Id = ObjectId.GenerateNewId().ToString();
            Players = new List<Player>();
            Score = new TeamScore();
        }

        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Player> Players { get; set; }
        public TeamScore Score { get; set; }
    }
}
