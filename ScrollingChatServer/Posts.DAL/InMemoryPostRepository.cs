using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Posts.DAL
{
    public class InMemoryPostRepository : IPostRepository
    {
        private static readonly DateTime _firstPostDateUtc = new(2021, 12, 31);
        private static readonly TimeSpan _intervalBetweenTwoPosts = TimeSpan.FromMinutes(1);

        public IEnumerable<Post> GetPosts(int skip, int count)
        {
            for (int postIndex = skip; postIndex < skip + count; postIndex++)
            {
                var postTime = _firstPostDateUtc.Subtract(_intervalBetweenTwoPosts * postIndex);
                var postMessage = $"The text of a post with index {postIndex}";
                yield return new Post(postIndex, postMessage, postTime);
            }
        }
    }
}
