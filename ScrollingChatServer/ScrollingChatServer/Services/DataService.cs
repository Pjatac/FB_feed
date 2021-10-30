using Posts.DAL;
using ScrollingChatServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScrollingChatServer.Services
{
    public class DataService : IDataService
    {
        private readonly IPostRepository _postsRepository;

        public DataService(IPostRepository postsRepository)
        {
            _postsRepository = postsRepository;
        }
        public IEnumerable<PostDto> GetPosts(int skip, int count)
        {
            return _postsRepository.GetPosts(skip, count).Select(ConvertToDto);
        }

        public PostDto ConvertToDto(Post post)
        {
            return new PostDto(post.PostIndex, post.PostMessage, post.PostDateUtc);
        }
    }
}
