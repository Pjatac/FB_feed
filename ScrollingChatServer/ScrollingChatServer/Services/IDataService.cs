using Posts.DAL;
using ScrollingChatServer.Models;
using System.Collections.Generic;

namespace ScrollingChatServer.Services
{
    public interface IDataService
    {
        IEnumerable<PostDto> GetPosts(int skip, int count);
    }
}
