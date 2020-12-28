using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WarStatsApi.Services;

namespace WarStatsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateController : ControllerBase
    {
        private readonly UpdateStatisticsService updateStatisticsService;

        public UpdateController(UpdateStatisticsService updateStatisticsService)
        {
            this.updateStatisticsService = updateStatisticsService;
        }

        [HttpGet]
        public async Task Get()
        {
            await updateStatisticsService.Update();
        }
    }
}
