"use client";

import { Button } from "@nextui-org/react";
import { FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { IoIosLogOut } from "react-icons/io";
import { ImBooks } from "react-icons/im";
import Footer from "@/components/footer/page";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardMenu({ userData, menuData, onLogout }) {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const logout = async () => {
    localStorage.removeItem("user");

    const res = await onLogout();

    if (res) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="fixed border-x-1 gap-4 rounded-e-medium border-x-gray-700 hidden sm:flex flex-col top-0 left-0 w-64 h-screen overflow-x-hidden overflow-y-auto bg-inherit text-white">
        <div className="flex flex-wrap gap-4 back-color-standard items-center justify-center p-4 dashboard-sidebar rounded-e-medium">
          <FaCircleUser size={32} />
          <h1 className="text-1xl">{userData.nickname}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex gap-2 p-4 text-white hover:bg-gray-700 transition-all rounded"
          >
            <FaHome size={24} />
            <span>Início</span>
          </Link>
          {menuData.map((item, index) => (
            <Link
              key={index}
              href={"/dashboard" + item.link}
              className="flex gap-2 p-4 text-white hover:bg-gray-700 transition-all rounded"
            >
              <ImBooks size={24} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4 p-4 relative bottom-2"></div>
        <div className="absolute bottom-0 flex flex-col gap-2 back-color-standard rounded-medium p-1">
          <Button
            onPress={logout}
            startContent={<IoIosLogOut size={24} />}
            className="max-w-xs"
            color="danger"
          >
            Sair
          </Button>
          <Footer />
        </div>
      </div>
      <div className="sm:hidden">
        <Navbar onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <p className="font-bold text-inherit">System RHC</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link aria-current="page" href="#">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                startContent={<IoIosLogOut size={24} />}
                color="danger"
                href="#"
                variant="solid"
              >
                Sair
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
            <Footer />
          </NavbarMenu>
        </Navbar>
      </div>
    </>
  );
}
