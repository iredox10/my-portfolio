// src/components/GithubStats.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen } from 'lucide-react';

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const SkeletonBox = () => (
  <div className="flex flex-col items-center p-4 bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/10 animate-pulse">
    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-7 w-12 rounded bg-slate-200 dark:bg-slate-700 mb-1" />
    <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
  </div>
);

const StatBox = ({ icon, label, value }) => (
  <motion.div
    className="flex flex-col items-center p-4 bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/10 hover:bg-white/10 transition-colors"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-purple-600 dark:text-purple-400 mb-2">{icon}</div>
    <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
    <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">{label}</div>
  </motion.div>
);

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

  return (
    <motion.div
      className="mt-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <Github className="w-6 h-6 text-slate-900 dark:text-white" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Live GitHub Stats</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.loading ? (
          // Skeleton state
          <><SkeletonBox /><SkeletonBox /><SkeletonBox /></>
        ) : stats.error ? (
          // Error state — show placeholder instead of empty
          <>
            <StatBox icon={<BookOpen size={24} />} label="Public Repos" value="—" />
            <StatBox icon={<Star size={24} />} label="Total Stars" value="—" />
            <StatBox icon={<GitFork size={24} />} label="Followers" value="—" />
          </>
        ) : (
          <>
            <StatBox icon={<BookOpen size={24} />} label="Public Repos" value={stats.repos} />
            <StatBox icon={<Star size={24} />} label="Total Stars" value={stats.stars} />
            <StatBox icon={<GitFork size={24} />} label="Followers" value={stats.followers} />
          </>
        )}
      </div>

      {stats.error && (
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-3 font-mono">
          Stats unavailable (GitHub API rate limit). View profile directly →{' '}
          <a href="https://github.com/iredox10" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
            github.com/iredox10
          </a>
        </p>
      )}
    </motion.div>
  );
};

export default GithubStats;