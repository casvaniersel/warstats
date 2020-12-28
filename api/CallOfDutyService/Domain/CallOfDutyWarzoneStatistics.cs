using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty.Domain
{
    [BsonIgnoreExtraElements]
    public class CallOfDutyWarzoneStatistics
    {
        public string status { get; set; }
        public Data data { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
