using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarStatsApi.Entities
{
    public class PlayerScore
    {
        public Player Player { get; set; }
        public int Kills { get; set; }
        public double KD { get; set; }

    }
}
