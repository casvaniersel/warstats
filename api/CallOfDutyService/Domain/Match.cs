using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Match
    {
        public int utcStartSeconds { get; set; }
        public int utcEndSeconds { get; set; }
        public string map { get; set; }
        public string mode { get; set; }
        public string matchID { get; set; }
        public int duration { get; set; }
        public object playlistName { get; set; }
        public int version { get; set; }
        public string gameType { get; set; }
        public int playerCount { get; set; }
        public PlayerStats playerStats { get; set; }
        public Player player { get; set; }
        public int teamCount { get; set; }
        public object rankedTeams { get; set; }
        public bool draw { get; set; }
        public bool privateMatch { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
