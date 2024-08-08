import { useSelector } from "react-redux";

export default function Header() {
  const userData = useSelector((state)=> state.user.userData);

  const userName = userData?.email ? userData.email.split("@")[0] : "";

  return (
    <header className='rounded-lg bg-orange-400 h-[70px] text-gray-900 flex items-center p-8'>
      <span className="ml-auto capitalize">
        {/* welcome {userData?.name || userData.email} */}
        Welcome {userData?.email ? userName : userData?.name}
      </span>
    </header>
  )
}
