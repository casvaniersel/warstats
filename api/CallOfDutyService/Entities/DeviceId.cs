using Newtonsoft.Json;

namespace CallOfDuty
{
    public class DeviceId
    {
        public DeviceId(string deviceId)
        {
            this.deviceId = deviceId;
        }

        [JsonProperty("deviceId")]
        public string deviceId;
    }
}
