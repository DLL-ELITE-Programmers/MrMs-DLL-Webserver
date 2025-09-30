interface HeaderProps {
    subtitle?: string
}
export default function Header(props: HeaderProps){
    return (
        <div className="w-full flex-col justify-center text-center rounded" style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(25px)"
        }}>
            <h3 className="font-bold text-xl">Mr. and Ms. DLL</h3>
            <h3 className="text-md">{props.subtitle}</h3>
        </div>
    )
}