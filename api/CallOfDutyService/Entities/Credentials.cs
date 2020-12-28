using Newtonsoft.Json;

namespace CallOfDuty
{
    public class Credentials
    {
        [JsonProperty("email")]
        public string Email;

        [JsonProperty("password")]
        public string Password;
    }
}
