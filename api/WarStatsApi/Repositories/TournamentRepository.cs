using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using WarStatsApi.Entities;
using WarStatsApi.Services;

namespace WarStatsApi.Repositories
{
    public class TournamentRepository : MongoRepository
    {
        public TournamentRepository(MongoDatabaseSettings settings) : base (settings)
        {
        }

        public void Save(Tournament tournament)
        {
            var collection = GetCollection<Tournament>("tournaments");
            var filter = Builders<Tournament>.Filter.Where(x => x.Id == tournament.Id);
            var update = Builders<Tournament>.Update.Set("Teams", tournament.Teams);

            var found = collection.Find(filter).FirstOrDefault();
            if(found == null)
            {
                collection.InsertOne(tournament);
                return;
            }

            collection.FindOneAndUpdate(filter, update);
        }

        public IEnumerable<Tournament> All()
        {
            var collection = GetCollection<Tournament>("tournaments");
            return collection.Find(new BsonDocument()).ToEnumerable();
        }

        internal Tournament Get(string tournamentId)
        {
            var collection = GetCollection<Tournament>("tournaments");
            var filter = Builders<Tournament>.Filter.Where(x => x.Id == tournamentId);
            return collection.Find(filter).FirstOrDefault();
        }

        public IEnumerable<Tournament> NowActive()
        {
            var collection = GetCollection<Tournament>("tournaments");
            var filter = Builders<Tournament>.Filter.Where(x => x.Start <= DateTime.Now && x.End >= DateTime.Now);
            return collection.Find(filter).ToList();
        }

        internal void Delete(string name)
        {
            var collection = GetCollection<Tournament>("tournaments");
            var filter = Builders<Tournament>.Filter.Where(x => x.Name == name);
            collection.DeleteOne(filter);
        }

        public Tournament GetTestTournament()
        {
            return new Tournament()
            {
                Id = new ObjectId().ToString(),
                Name = "Test Tournooi Nu",
                Start = DateTime.Now.AddHours(-2),
                End = DateTime.Now.AddHours(2),
                Teams = new List<Team>() {
                    new Team()
                    {
                        Players = new List<Player>()
                        {
                            new Player()
                            {
                                GamerTag = "JKROOTS",
                                Platform = Platform.XBL
                            },
                            new Player()
                            {
                                GamerTag = "C4zler",
                                Platform = Platform.XBL
                            }
                        },
                        Score = new TeamScore()
                        {
                            Matches = new List<MatchScore>() {
                                new MatchScore()
                                {
                                    Id = "123",
                                    Placement = 4,
                                    PlayerScores = new List<PlayerScore>()
                                    {
                                        new PlayerScore()
                                        {
                                            Kills = 0,
                                            KD = 0
                                        }
                                    }
                                }
                            },
                            Points = 0,
                            Rank = 1
                        }
                    },
                    new Team()
                    {
                        Players = new List<Player>()
                        {
                            new Player()
                            {
                                GamerTag = "Kuubsnl",
                                Platform = Platform.XBL
                            },
                            new Player()
                            {
                                GamerTag = "Bertonenl",
                                Platform = Platform.XBL
                            }
                        },
                        Score = new TeamScore()
                        {
                           Matches = new List<MatchScore>() {
                                new MatchScore()
                                {
                                    Id = "123",
                                    Placement = 4,
                                    PlayerScores = new List<PlayerScore>()
                                    {
                                        new PlayerScore()
                                        {
                                            Kills = 0,
                                            KD = 0
                                        }
                                    }
                                }
                            },
                            Points = 0,
                            Rank = 2,
                        }
                    },
                    new Team()
                    {
                        Players = new List<Player>()
                        {
                            new Player()
                            {
                                GamerTag = "stefankrul",
                                Platform = Platform.XBL
                            },
                            new Player()
                            {
                                GamerTag = "mikethespeciali",
                                Platform = Platform.XBL
                            }
                        },
                        Score = new TeamScore()
                        {
                            Matches = new List<MatchScore>() {
                                new MatchScore()
                                {
                                    Id = "123",
                                    Placement = 4,
                                    PlayerScores = new List<PlayerScore>()
                                    {
                                        new PlayerScore()
                                        {
                                            Kills = 0,
                                            KD = 0
                                        }
                                    }
                                }
                            },
                            Points = 0,
                            Rank = 3,
                        }
                    },
                },
                Rules = new Rules()
                {
                    Description = "Mooie regels",
                    PointsPerKill = 1,
                    PointsPerPlacement = new Dictionary<int, int>()
                    {
                        { 1, 10 }, { 2, 8 }, { 3, 6 }, { 4, 4 }, { 5, 2 }, { 6, 1 }, { 7, 1 }, { 8, 1 }, { 9, 1 }, { 10, 1 }
                    },
                    Type = RuleType.KillsAndPlacement,
                    NumberOfBestGames = 3
                }
            };
        }
    }
}
