using System;

namespace ScrollingChatServer.Models
{
    /// <summary>
    /// A news feed post
    /// </summary>
    /// <param name="PostIndex">Post index (0 - the most recent post)</param>
    /// <param name="PostMessage">Post message</param>
    /// <param name="PostDateUtc">Post UTC time</param>
    public record PostDto(int PostIndex, string PostMessage, DateTime PostDateUtc);
}
