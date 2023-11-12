import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import Container from "./ui/Container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import ModeToggle from "./ModeToggle";

const routes = [
  { href: "", label: "Events" },
  { href: "bdp", label: "Search BDP Barangay " },
  { href: "rpsb", label: "Search R-PSB Deployment" },
  { href: "latlong", label: "Search Latlong" },
];

const Header = () => {
  return (
    <header>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-6">
                  {routes.map((route, i) => (
                    <NavLink
                      key={i}
                      to={route.href}
                      className={({ isActive }) =>
                        isActive
                          ? "text-sm font-bold transition-colors"
                          : "text-sm font-medium transition-colors"
                      }
                    >
                      {route.label}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Intel MIS</h1>
            </a>
          </div>
          <nav className="mx-6 space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <NavLink
                key={i}
                to={route.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-bold transition-colors"
                    : "text-sm font-medium transition-colors"
                }
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
          <div>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
