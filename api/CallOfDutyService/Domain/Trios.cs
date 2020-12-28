using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Trios
    {
        public double kills { get; set; }
        public double objectiveTeamWiped { get; set; }
        public double objectiveLastStandKill { get; set; }
        public double wallBangs { get; set; }
        public double avgLifeTime { get; set; }
        public double score { get; set; }
        public double headshots { get; set; }
        public double assists { get; set; }
        public double killsPerGame { get; set; }
        public double scorePerMinute { get; set; }
        public double distanceTraveled { get; set; }
        public double deaths { get; set; }
        public double objectiveBrDownEnemyCircle3 { get; set; }
        public double objectiveBrDownEnemyCircle2 { get; set; }
        public double kdRatio { get; set; }
        public double objectiveBrDownEnemyCircle1 { get; set; }
        public double objectiveBrMissionPickupTablet { get; set; }
        public double objectiveReviver { get; set; }
        public double scorePerGame { get; set; }
        public double objectiveBrKioskBuy { get; set; }
        public double objectiveBrDownEnemyCircle6 { get; set; }
        public double gulagDeaths { get; set; }
        public double objectiveBrDownEnemyCircle5 { get; set; }
        public double timePlayed { get; set; }
        public double headshotPercentage { get; set; }
        public double executions { get; set; }
        public double matchesPlayed { get; set; }
        public double gulagKills { get; set; }
        public double nearmisses { get; set; }
        public double objectiveBrCacheOpen { get; set; }
        public double damageDone { get; set; }
        public double damageTaken { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
