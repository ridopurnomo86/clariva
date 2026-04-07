import NavItem from "./NavItem";

const Navigation = ({
  collapsed,
  items,
  title,
  navClassname,
}: {
  collapsed: boolean;
  title: string;
  navClassname?: string;
  items: (collapsed: boolean) => Array<any>;
}) => (
  <div className="mt-5">
    {!collapsed && (
      <p
        className={`mb-2 px-1 text-xs font-semibold tracking-[0.11em] text-slate-400 uppercase`}
      >
        {title}
      </p>
    )}
    <nav className={navClassname}>
      {items(collapsed).map((nav) => (
        <NavItem
          key={nav.label}
          icon={nav.icon}
          label={nav.label}
          collapsed={nav.collapsed}
        />
      ))}
    </nav>
  </div>
);

export default Navigation;
