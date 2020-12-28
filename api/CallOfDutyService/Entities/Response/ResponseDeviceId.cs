using Newtonsoft.Json;

namespace CallOfDuty
{
    public class ResponseDeviceId
    {
        [JsonProperty("status")]
        public string status;

        [JsonProperty("data")]
        public ResponseDeviceIdData data;
    }

}
