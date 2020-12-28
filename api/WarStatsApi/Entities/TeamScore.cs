using System.Collections.Generic;
using System.Linq;
using WarStatsApi.Entities;

namespace WarStatsApi
{
    public class TeamScore
    {
        public int Rank { get; set; } = 0;
        public int Points { get; set; } = 0;
        public double TotalKills { get; set; }
        public IEnumerable<MatchScore> Matches {get; set;}
    }
}