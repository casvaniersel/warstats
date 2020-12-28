using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class BrMissionStats
    {
        public int missionsComplete { get; set; }
        public double totalMissionXpEarned { get; set; }
        public double totalMissionWeaponXpEarned { get; set; }
        public MissionStatsByType missionStatsByType { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
