using System;

namespace Posts.DAL
{
    public record Post(int PostIndex, string PostMessage, DateTime PostDateUtc);
}
