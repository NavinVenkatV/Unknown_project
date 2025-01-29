'use client'

import Appbar from "./component/appBar";
import { useSession } from "next-auth/react";
import DashBoard from "./dashboard/page";

export default function Home() {
  const {data : session} = useSession();
  return (
   <div className="w-full h-full">
    <Appbar/>
    {session ? <DashBoard/> : null}
   </div>
  );
}
