using CallOfDuty;
using CallOfDuty.Domain;
using System.Threading.Tasks;

namespace WarStatsApi
{
    public class CallOfDutyApiAdapter
    {
        private readonly ICallOfDutyApi callOfDutyApi;

        public CallOfDutyApiAdapter(ICallOfDutyApi callOfDutyApi)
        {
            this.callOfDutyApi = callOfDutyApi;
        }

        public async Task<CallOfDutyWarzoneStatistics> GetStatisticsOfPlayer(Player player)
        {
            return await callOfDutyApi.GetWzStats(player.Platform, player.GamerTag);
        }
    }
}
