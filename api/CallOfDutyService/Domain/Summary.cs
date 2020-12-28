using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Summary
    {
        public All all { get; set; }
        public Solo br_brsolo { get; set; }
        public Duos br_brduos { get; set; }
        public Trios br_brtrios { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
