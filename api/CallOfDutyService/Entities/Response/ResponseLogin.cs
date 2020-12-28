using Newtonsoft.Json;

namespace CallOfDuty
{
    public class ResponseLogin
    {
        [JsonProperty("rtkn")]
        public string RtknToken;

        [JsonProperty("ACT_SSO_COOKIE")]
        public string ActSsoToken;

        [JsonProperty("ACT_SSO_COOKIE_EXPIRY")]
        public string ACT_SSO_COOKIE_EXPIRY;

        [JsonProperty("gameAccountLinked")]
        public string gameAccountLinked;

        [JsonProperty("success")]
        public string success;

        [JsonProperty("ACT_AUTH_TOKEN")]
        public string ACT_AUTH_TOKEN;

        [JsonProperty("s_ACT_SSO_COOKIE")]
        public string s_ACT_SSO_COOKIE;

        [JsonProperty("atkn")]
        public string AtknToken;
    }
}
