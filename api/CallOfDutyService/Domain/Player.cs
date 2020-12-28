using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Player
    {
        public string team { get; set; }
        public double rank { get; set; }
        public Awards awards { get; set; }
        public string username { get; set; }
        public string uno { get; set; }
        public BrMissionStats brMissionStats { get; set; }
        public IList<Loadout> loadout { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
