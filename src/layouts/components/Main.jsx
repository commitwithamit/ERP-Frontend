
export default function Main({ children, openMenu }) {
  return (
    <main className={openMenu ? "active" : ""}>
      {children}
    </main>
  )
}
