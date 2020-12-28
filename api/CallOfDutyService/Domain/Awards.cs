using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Awards
    {
        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
