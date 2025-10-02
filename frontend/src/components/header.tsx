interface HeaderProps {
    subtitle?: string
}
export default function Header(props: HeaderProps){
    return (
        <div className="w-full flex-col justify-center text-center text-white rounded border-[1px] border-slate-500 border-solid" style={{
            backgroundColor: "rgba(203, 213, 225, 0.1)",
            backdropFilter: "blur(25px)"
        }}>
            <h3 className="font-bold text-xl">Mr. and Ms. DLL</h3>
            <h3 className="text-md">{props.subtitle}</h3>
        </div>
    )
}