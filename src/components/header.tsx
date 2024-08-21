import { LinkIcon, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const user = true;

const Header = () => {
  return (
    <header className="sticky top-0 flex items-center px-4 py-3 lg:px-6">
      <Link
        className="flex items-center justify-center gap-2 text-xl font-bold"
        href="/">
        <LinkIcon className="h-6 w-6 text-primary" />
        ShrinkIt
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {user && (
          <Link
            href="/dashboard"
            className="text-sm font-medium underline-offset-4 hover:underline">
            Dashboard
          </Link>
        )}
        {!user ? (
          <Link href="/auth">
            <Button variant="outline" size="sm" className="h-8">
              Sign In
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="flex items-center justify-center rounded-full border bg-secondary">
                <AvatarImage src="" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Username</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Links</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;

// const Header = () => {
//   return (
//     <header className="sticky top-0 z-40 w-full border-b-2 bg-background/40 shadow-sm backdrop-blur-3xl">
//       <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
//         <Link href="/" className="flex items-center gap-2 font-bold">
//           <LinkIcon className="h-6 w-6" />
//           <span>URL Shortener</span>
//         </Link>
//         <nav className="flex items-center gap-4">
//           {user && (
//             <Link
//               href="/dashboard"
//               className="text-sm font-medium hover:text-foreground">
//               Dashboard
//             </Link>
//           )}
//           <ModeToggle />
//           {!user ? (
//             <Link href="/auth">
//               <Button variant="outline" size="sm" className="h-8">
//                 Sign In
//               </Button>
//             </Link>
//           ) : (
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 <Avatar className="flex items-center justify-center rounded-full border bg-secondary">
//                   <AvatarImage src="" />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>Username</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>My Links</DropdownMenuItem>
//                 <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground">
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
