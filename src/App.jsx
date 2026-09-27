import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, Plus, Flag, Calendar, Users, Sparkles, Image as ImageIcon, Flame } from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [postContent, setPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [dmInput, setDmInput] = useState('');

  const {
    currentUser,
    stories,
    posts,
    events,
    dms,
    suggestedFriends,
    toggleLike,
    addComment,
    sharePost,
    createPost,
    reportPost,
    toggleEventRsvp,
    sendDmMessage
  } = useStore();

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    createPost(postContent);
    setPostContent('');
  };

  const handleSendComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleSendDm = (e) => {
    e.preventDefault();
    if (!dmInput.trim()) return;
    sendDmMessage(dmInput);
    setDmInput('');
  };

  return (
    <div className="min-h-screen bg-[#0f0728] text-white flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#1a0b36]/90 backdrop-blur-md border-b border-purple-900/40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-black text-white shadow-lg shadow-pink-500/30">
              P
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              PULSE
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#0f0728] p-1 rounded-full border border-purple-900/50 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-1.5 rounded-full transition ${activeTab === 'feed' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold' : 'text-purple-300 hover:text-white'}`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-1.5 rounded-full transition ${activeTab === 'events' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold' : 'text-purple-300 hover:text-white'}`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-1.5 rounded-full transition ${activeTab === 'messages' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold' : 'text-purple-300 hover:text-white'}`}
            >
              Direct Chat
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img src={currentUser.avatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-pink-500" />
            <span className="hidden sm:inline text-xs font-bold text-purple-200">{currentUser.name}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed Left 2 Cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* 24h Expiring Stories Row */}
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                {stories.map((story) => (
                  <div key={story.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 group-hover:scale-105 transition-transform">
                      <img src={story.avatar} alt={story.author} className="w-full h-full rounded-full object-cover border-2 border-[#0f0728]" />
                    </div>
                    <span className="text-[11px] text-purple-200 font-medium mt-1 line-clamp-1">{story.author}</span>
                    <span className="text-[9px] text-pink-400 font-semibold">{story.expiresIn}</span>
                  </div>
                ))}
              </div>

              {/* Create Post Card */}
              <div className="bg-[#1a0b36] border border-purple-900/40 rounded-3xl p-5 shadow-xl">
                <form onSubmit={handleCreatePost} className="space-y-3">
                  <div className="flex gap-3">
                    <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                    <textarea
                      rows={2}
                      placeholder="What is resonating in your universe today?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="w-full bg-[#0f0728] border border-purple-900/50 rounded-2xl p-3 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[11px] text-purple-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      Algorithmic Audio-Visual Feed
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20"
                    >
                      Post Pulse
                    </button>
                  </div>
                </form>
              </div>

              {/* Feed Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-[#1a0b36] border border-purple-900/40 rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-pink-500/40" />
                        <div>
                          <h4 className="font-bold text-sm text-white">{post.author.name}</h4>
                          <span className="text-xs text-purple-400">{post.author.handle} • {post.timeAgo}</span>
                        </div>
                      </div>
                      <button onClick={() => reportPost(post.id)} className="text-purple-500 hover:text-pink-400 p-1">
                        <Flag className={`w-4 h-4 ${post.reported ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </button>
                    </div>

                    <p className="px-5 pb-3 text-xs text-purple-100 leading-relaxed">{post.content}</p>

                    {post.media && (
                      <div className="w-full aspect-video bg-[#0f0728] overflow-hidden">
                        <img src={post.media} alt="Media" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="p-4 flex items-center justify-between border-t border-purple-900/30 text-xs font-semibold text-purple-300">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 transition ${post.liked ? 'text-pink-400 font-bold' : 'hover:text-white'}`}
                        >
                          <Heart className={`w-4 h-4 ${post.liked ? 'fill-pink-500 text-pink-500' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4 text-purple-400" />
                          <span>{post.comments.length}</span>
                        </div>
                        <button onClick={() => sharePost(post.id)} className="flex items-center gap-1.5 hover:text-white">
                          <Share2 className="w-4 h-4 text-purple-400" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      {post.reported && (
                        <span className="text-[10px] text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-800">
                          Flagged for Moderation
                        </span>
                      )}
                    </div>

                    {/* Comments List */}
                    {post.comments.length > 0 && (
                      <div className="bg-[#0f0728]/60 p-4 border-t border-purple-900/30 space-y-2 text-xs">
                        {post.comments.map((c) => (
                          <div key={c.id} className="flex gap-2">
                            <span className="font-bold text-pink-400">{c.user}:</span>
                            <span className="text-purple-200">{c.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input */}
                    <div className="p-3 bg-[#0f0728]/80 border-t border-purple-900/30 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        className="flex-1 bg-[#1a0b36] border border-purple-900/50 rounded-full px-4 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Suggestions */}
            <div className="space-y-6">
              <div className="bg-[#1a0b36] border border-purple-900/40 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Follow Suggestions</h3>
                <div className="space-y-3">
                  {suggestedFriends.map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <h5 className="text-xs font-bold text-white">{f.name}</h5>
                          <span className="text-[10px] text-purple-400">{f.mutuals}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-[11px] font-bold">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Upcoming Community Gatherings & RSVPs
            </h2>
            <div className="space-y-4">
              {events.map((evt) => (
                <div key={evt.id} className="bg-[#1a0b36] border border-purple-900/40 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-xs text-pink-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {evt.date}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{evt.title}</h3>
                    <p className="text-xs text-purple-300 mt-0.5">{evt.location} • {evt.rsvps} attending</p>
                  </div>
                  <button
                    onClick={() => toggleEventRsvp(evt.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${evt.attending ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'}`}
                  >
                    {evt.attending ? '✓ RSVP Confirmed' : 'RSVP Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="max-w-2xl mx-auto bg-[#1a0b36] border border-purple-900/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-purple-900/40">
              <img src={dms[0].avatar} alt={dms[0].user} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="text-sm font-bold text-white">{dms[0].user}</h3>
                <span className="text-[10px] text-emerald-400">● Active Live</span>
              </div>
            </div>
            <div className="h-64 overflow-y-auto space-y-3 p-2 text-xs">
              {dms[0].messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-xs ${m.from === 'me' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-none' : 'bg-[#0f0728] border border-purple-900/50 text-purple-100 rounded-bl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendDm} className="flex gap-2 pt-2 border-t border-purple-900/40">
              <input
                type="text"
                placeholder="Send a private transmission..."
                value={dmInput}
                onChange={(e) => setDmInput(e.target.value)}
                className="flex-1 bg-[#0f0728] border border-purple-900/50 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              />
              <button type="submit" className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-xs uppercase">
                Send
              </button>
            </form>
          </div>
        )}
      </main>

      <footer className="border-t border-purple-900/30 bg-[#1a0b36]/60 py-6 text-center text-xs text-purple-400">
        © 2026 PULSE SOCIAL SPHERE. FIREBASE FIRESTORE REAL-TIME SIMULATION.
      </footer>
    </div>
  );
}
