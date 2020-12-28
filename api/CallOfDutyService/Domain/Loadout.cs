using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class Loadout
    {
        public PrimaryWeapon primaryWeapon { get; set; }
        public SecondaryWeapon secondaryWeapon { get; set; }
        public IList<Perk> perks { get; set; }
        public IList<ExtraPerk> extraPerks { get; set; }
        public IList<Killstreak> killstreaks { get; set; }
        public Tactical tactical { get; set; }
        public Lethal lethal { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
