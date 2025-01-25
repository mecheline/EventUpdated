import Link from "next/link";

const Header = () => {
  const links = [
    {
      title: "Find Event",
      href: "/",
    },
    {
      title: "Create Event",
      href: "/create-event",
    },
  ];
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="font-Syne font-bold text-4xl">Events</div>
        <div className="flex gap-x-6">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="font-medium text-base text-[#979193] hover:text-[#E40D7D]"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div>
          <Link
            href={"/onboarding"}
            className="font-semibold text-base text-[#E40D7D] bg-[#FDE2F0] py-2 px-4 rounded-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
