
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CallOfDuty.Helpers
{
    public static class CredentialsHelper
    {
        public static Credentials CreateCredentials()
        {
            var config = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("config.json", optional: true, reloadOnChange: true)
              .Build();

            return new Credentials()
            {
                Email = config["email"],
                Password = config["password"]
            };
        }
    }
}
