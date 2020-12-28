using System;
using System.Collections.Generic;
using WarStatsApi.Entities;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WarStatsApi
{
    public class Tournament
    {
        public Tournament()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }

        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public IList<Team> Teams { get; set; }
        public Rules Rules { get; set; }
    }
}
