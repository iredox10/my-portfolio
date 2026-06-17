import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const GithubStats = () => {
  const [stats, setStats] = useState({ repos: 0, followers: 0, stars: 0, loading: true, error: false });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const username = 'iredox10';
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('API error');
        const [userData, reposData] = await Promise.all([userRes.json(), reposRes.json()]);
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        setStats({ repos: userData.public_repos, followers: userData.followers, stars: totalStars, loading: false, error: false });
      } catch {
        setStats(prev => ({ ...prev, loading: false, error: true }));
      }
    };
    fetchStats();
  }, []);

  if (stats.loading || stats.error) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center border-t border-white/20 pt-16 mt-16 px-6">
      
      <div className="flex items-center justify-center gap-4 mb-12 mix-blend-difference pointer-events-none">
        <Github size={48} className="text-white" />
        <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Live Stats</h3>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-8 md:gap-4 border border-white/20 p-8 md:p-12 hover:border-white transition-colors duration-500">
        
        <div className="flex flex-col">
          <span className="text-[12vw] md:text-[6vw] font-black text-white leading-none tracking-tighter">{stats.repos}</span>
          <span className="text-white/50 font-mono text-sm uppercase tracking-widest mt-2">Repositories</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[12vw] md:text-[6vw] font-black text-white leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>{stats.stars}</span>
          <span className="text-white/50 font-mono text-sm uppercase tracking-widest mt-2">Total Stars</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[12vw] md:text-[6vw] font-black text-[#a855f7] leading-none tracking-tighter">{stats.followers}</span>
          <span className="text-white/50 font-mono text-sm uppercase tracking-widest mt-2">Followers</span>
        </div>

      </div>

    </div>
  );
};

export default GithubStats;