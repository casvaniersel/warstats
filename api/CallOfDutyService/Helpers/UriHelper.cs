using System;

namespace CallOfDuty.Helpers
{
    internal static class UriHelper
    {
        private static readonly string baseProfileUri = "https://profile.callofduty.com/cod/mapp/";
        private static readonly string baseApiUri = "https://my.callofduty.com/api/papi-client/";

        public static Uri GetRegisterDeviceUri
        {
            get
            {
                return new Uri($"{baseProfileUri}registerDevice");
            }
        }

        public static Uri GetLoginUri
        {
            get
            {
                return new Uri($"{baseProfileUri}login");
            }
        }

        public static Uri CreateWzUri(string platform, string gamertag, int start = 0, int end = 0)
        {
            return new Uri($"{baseApiUri}crm/cod/v2/title/mw/platform/{platform}/gamer/{gamertag}/matches/wz/start/{start}/end/{end}/details");
        }
    }
}
