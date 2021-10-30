using Posts.DAL;
using System;
using System.Linq;
using Xunit;

namespace Posts.Dal.Tests
{
    public class InMemoryPostsRepoTests
    {
        private IPostRepository _repository = new InMemoryPostRepository();

        [Fact]
        public void GetFeed_SkipAndCountParameterIsRespected()
        {
            var posts = _repository.GetPosts(skip: 10, count: 20);
            var postIndexes = posts.Select(post => post.PostIndex);
            Assert.Equal(Enumerable.Range(10, 20), postIndexes);
        }

        [Fact]
        public void GetFeed_PostAreReturnedInDescendingTimeOrder()
        {
            var posts = _repository.GetPosts(skip: 10, count: 10);
            var postDates = posts.Select(post => post.PostDateUtc).ToArray();

            for (int i = 1; i < postDates.Length; i++)
            {
                Assert.True(DateTime.Compare(postDates[i - 1], postDates[i]) > 0);
            }
        }
    }
}
