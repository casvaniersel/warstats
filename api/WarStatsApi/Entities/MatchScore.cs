using System.Collections.Generic;
using System.Linq;

namespace WarStatsApi.Entities
{
    public class MatchScore
    {

        public MatchScore()
        {
            PlayerScores = new List<PlayerScore>();
        }

        public string Id { get; set; }
        public List<PlayerScore> PlayerScores { get; set; }
        public int TotalKills { 
            get
            {
                return PlayerScores.Sum(x => x.Kills);
            } 
        }

        public int Placement { get; set; }
        public int Points { get; set; }
    }
}
