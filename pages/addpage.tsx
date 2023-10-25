import "../app/globals.css";
import Header from "@/components/header";

export default function AddPage(){
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="w-40 mx-auto">
                <h1>Add Contact</h1>
            </div>
        </main>
    );
}