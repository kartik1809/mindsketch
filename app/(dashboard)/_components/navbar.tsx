"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { useOrganization } from "@clerk/nextjs";

export const Navbar = () => {
    const { organization } = useOrganization();

    return (
        <div className="flex items-center  gap-x-4  p-5 bg-white shadow-sm">
            <div className="hidden lg:flex-1 lg:flex">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
            <OrganizationSwitcher hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            // justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            backgroundColor: "white",
                            justifyContent: "space-between",
                        }
                    }
                }}
            />
            </div>
            {organization && <InviteButton/>}
            <UserButton/>
        </div>
    )
}