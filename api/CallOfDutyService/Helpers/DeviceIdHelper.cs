using Microsoft.Extensions.Configuration;
using System.IO;

namespace CallOfDuty.Helpers
{
    internal static class DeviceIdHelper
    {

        private static string GetIdFromConfig()
        {
            var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("config.json", optional: true, reloadOnChange: true)
            .Build();

            return config["deviceid"];
        }

        public static DeviceId GetDeviceId()
        {
            return new DeviceId(GetIdFromConfig());
        }

        public static string GetDeviceIdString()
        {
            return GetIdFromConfig();
        }
    }
}
