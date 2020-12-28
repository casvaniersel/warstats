using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Tactical
    {
        public string name { get; set; }
        public object label { get; set; }
        public object image { get; set; }
        public object imageLarge { get; set; }
        public object progressionImage { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
