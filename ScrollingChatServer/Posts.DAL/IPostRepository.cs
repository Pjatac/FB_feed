using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Posts.DAL
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetPosts(int skip, int count);
    }
}
