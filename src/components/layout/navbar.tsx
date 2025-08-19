import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import TechBlogLogo from '../svg/logo';


export default function Navbar() {
  return (
    <nav className='sticky z-40 top-0 h-16 border-b border-slate-800 bg-background'>
        <div className="relative flex justify-between items-center h-full container mx-auto px-4">
            <div className="w-auto">
                <TechBlogLogo />
            </div>
            <div className="hidden absolute left-1/2 -translate-x-1/2 w-1/3 md:block">
                <Input name='search-post' type="text" className='pl-10 w-full border-slate-800' placeholder='Search for posts..'/>
                <Search width={16} height={16} className="absolute top-1/2 left-3 -translate-y-1/2" />
            </div>
            <div className="flex gap-4">
                <Button className='bg-gray-800 text-white'>Sign In</Button>
                <Button variant={"secondary"}>Sign Up</Button>
            </div>
        </div>
    </nav>
  )
}
