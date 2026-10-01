import { useEffect, useState } from "react";
import { fetchCurrentUser, onAuthChange } from "@/lib/auth";
import type { User } from "@/lib/types";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    function load() {
      fetchCurrentUser().then((u) => {
        if (active) {
          setUser(u);
          setLoading(false);
        }
      });
    }

    load();
    const stopListening = onAuthChange(load);

    return () => {
      active = false;
      stopListening();
    };
  }, []);

  return { user, loading };
}
