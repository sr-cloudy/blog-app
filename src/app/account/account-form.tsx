'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-4 text-foreground">
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-md">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="rounded-md px-4 py-2 bg-inherit border mb-4 text-gray-500 cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fullName" className="text-md">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-md">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="website" className="text-md">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
        />
      </div>

      <button
        className="bg-blue-500 rounded-md px-4 py-2 text-white mb-2 disabled:opacity-50"
        onClick={() =>
          updateProfile({ fullname, username, website, avatar_url })
        }
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Update'}
      </button>

      {/* <form action="/auth/signout" method="post">
        <button
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 w-full"
          type="submit"
        >
          Sign out
        </button>
      </form> */}

      <form action="../dashboard" method="post">
        <button
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 w-full"
          type="submit"
        >
          Profile
        </button>
      </form>
    </div>
  );
}
