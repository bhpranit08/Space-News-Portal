import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Rocket } from "lucide-react"

import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="flex w-full items-center justify-between mt-4">
            <div className="flex items-center justify-center gap-2">
                <Rocket />
                <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight text-balance">
                    Space News Portal
                </h1>
            </div>

            <div className="flex items-center justify-center gap-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/">
                                    Home
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/about">
                                    About
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/apod">
                                    Picture of the Day
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/launch">
                                    Rocket Launch
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

        </div>
    )
}

export default NavBar