using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace CallOfDuty
{
    [BsonIgnoreExtraElements]
    public class SecondaryWeapon
    {
        public string name { get; set; }
        public object label { get; set; }
        public object imageLoot { get; set; }
        public object imageIcon { get; set; }
        public string variant { get; set; }
        public IList<Attachment> attachments { get; set; }

        [JsonExtensionData]
        [BsonIgnore]
        public IDictionary<string, JToken> unmapped { get; set; }
    }
}
