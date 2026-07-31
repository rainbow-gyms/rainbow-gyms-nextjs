// src/app/page.tsx

import { auth } from "@/lib/auth";
import Home from "@/components/Home";
import BrowseMenu from "@/components/Browse/BrowseMenu";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <Home />;
  }

  return <BrowseMenu />;
}
