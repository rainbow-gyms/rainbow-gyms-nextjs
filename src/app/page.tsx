// src/app/page.tsx

import { auth } from "@/lib/auth";
import Home from "@/components/Home";
import BrowseMenu from "@/components/Browse/BrowseMenu";
import { getAvailableSessions } from "@/lib/dbActions";

export default async function Page() {
  const session = await auth();
  const sessions = await getAvailableSessions();

  if (!session) {
    return <Home />;
  }

  return <BrowseMenu sessions={sessions} />;
}
