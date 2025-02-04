import Container from "@/layouts/Container";
import Logo from "@/utils/Logo";
import Categories from "@/components/CategoryBox/Categories";
import Search from "@/utils/Search";
import UserMenu from "./UserMenu";

export const Navbar = () => {
    return <div>
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">

                <Container>

                    <div className="flex flex-row justify-between gap-3 md:gap-0">

                        <Logo />
                        <Search />
                        <UserMenu />

                    </div>

                </Container>
            </div>
            {/* Categories */}
            <Categories />
        </div>
    </div>
};
