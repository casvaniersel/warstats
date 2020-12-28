using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace Functions
{
    public static class UpdateActiveTournaments
    {
        private static HttpClient Client = new HttpClient();

        [FunctionName("UpdateActiveTournaments")]
        public static async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            await Client.GetAsync("https://warstatsapi20201222173257.azurewebsites.net/api/update/");
        }
    }
}
