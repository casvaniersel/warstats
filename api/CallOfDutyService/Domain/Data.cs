using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Data
    {
        public Summary summary { get; set; }
        public IList<Match> matches { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
