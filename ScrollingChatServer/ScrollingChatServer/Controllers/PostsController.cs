using Microsoft.AspNetCore.Mvc;
using Posts.DAL;
using ScrollingChatServer.Models;
using ScrollingChatServer.Services;
using System.Collections.Generic;
using System.Linq;

namespace ScrollingChatServer.Controllers
{
    [ApiController]
    [Route("posts")]
    public class PostsController : ControllerBase
    {
        private readonly IDataService _dataService;

        public PostsController(IDataService dataService)
        {
            _dataService = dataService;
        }

        /// <summary>
        /// Reads the posts from the news feed
        /// </summary>
        /// <param name="skip">The number of posts to be skipped (0 - start reading from the most recent one)</param>
        /// <param name="count">The number of posts to be read from the feed</param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<PostDto> GetPosts([FromQuery] int skip = 0, [FromQuery] int count = 10)
        {
            return _dataService.GetPosts(skip, count);
        }
    }
}
