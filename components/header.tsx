import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-end gap-4 p-10 w-full text-gray-700">
      <Link href="/">
        <p className="text-lg font-light">Home</p>
      </Link>
      <Link href = "/addpage">
          <p className = "text-lg font-light">Add Contact</p>
      </Link>
      <Link href="/signin">
        <p className="text-lg font-light">Signin</p>
      </Link>
    </header>
  )
}