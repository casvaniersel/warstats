using CallOfDuty.Domain;
using System.Threading.Tasks;

namespace CallOfDuty
{
    public interface ICallOfDutyApi
    {
        Task<CallOfDutyWarzoneStatistics> GetWzStats(string platform, string gamertag, int start = 0, int end = 0);
    }
}
