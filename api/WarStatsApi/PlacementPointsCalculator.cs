using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarStatsApi
{
    public static class PlacementPointsCalculator
    {
        internal static int Calculate(Rules rules, int placement)
        {
            var pointsForPlacement = (rules.PointsPerPlacement.ContainsKey(placement) ? rules.PointsPerPlacement[placement] : 0);
            return pointsForPlacement;
        }
    }
}
