
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// const navlinks = [
//     { name: "home", href: "/dashboard" },
//     { name: "drawer", href: "/slip/drawer" },
//     { name: "add", href: "/slip/add" },
//     // { name: "laundries", href: "/laundries" },
//   ];

export default function MobileMenu() {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Link href="/slip/drawer" className="flex items-center gap-2" prefetch={false}>
              <DrawerIcon className="h-4 w-4" />
              <span>Drawer</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/slip/add" className="flex items-center gap-2" prefetch={false}>
              <PlusIcon className="h-4 w-4" />
              <span>Add</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DrawerIcon(props : any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18"
    height="18"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-bottom-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h18"/><path d="m15 8-3 3-3-3"/></svg>
  )
}


function HomeIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MenuIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PlusIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}